#!/usr/bin/env node
/**
 * Verify Markdown math using MathJax 3 (the renderer used by VitePress math:true).
 * Disable noundefined/noerrors: otherwise an unknown macro may be rendered in
 * red instead of causing the syntax check to fail.
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { mathjax } = require('mathjax-full/js/mathjax.js');
const { TeX } = require('mathjax-full/js/input/tex.js');
const { SVG } = require('mathjax-full/js/output/svg.js');
const { liteAdaptor } = require('mathjax-full/js/adaptors/liteAdaptor.js');
const { RegisterHTMLHandler } = require('mathjax-full/js/handlers/html.js');
const { AllPackages } = require('mathjax-full/js/input/tex/AllPackages.js');

const adaptor = liteAdaptor();
RegisterHTMLHandler(adaptor);
const tex = new TeX({
  packages: AllPackages.filter(name => name !== 'noundefined' && name !== 'noerrors')
});
const output = new SVG({ fontCache: 'none' });
const document = mathjax.document('', { InputJax: tex, OutputJax: output });

function mathError(formula, display) {
  try {
    const html = adaptor.outerHTML(document.convert(formula, { display }));
    const errorNode = html.match(/data-mjx-error="([^"]*)"/);
    if (errorNode) return errorNode[1];
    if (/data-mml-node="merror"|<merror\b/.test(html)) return 'MathJax produced an merror node';
    return null;
  } catch (error) {
    return error.message || String(error);
  }
}

// Fail closed if MathJax fails to report an intentionally unknown command.
if (!mathError('\\definitelyNotARealMathJaxCommand', false)) {
  console.error('MathJax error detection self-test failed');
  process.exit(2);
}

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  // Blank fenced and inline code while preserving newlines and source offsets.
  const noCode = content
    .replace(/\x60{3}[\s\S]*?\x60{3}/g, s => s.replace(/[^\n]/g, ' '))
    .replace(/\x60[^\x60\n]+\x60/g, s => ' '.repeat(s.length));
  const lineAt = offset => noCode.slice(0, offset).split('\n').length;
  const lineText = line => content.split('\n')[line - 1] || '';
  const errors = [];
  let match;
  let displays = 0;
  let inlines = 0;

  const blocks = /\$\$([\s\S]+?)\$\$/g;
  while ((match = blocks.exec(noCode)) !== null) {
    displays++;
    const line = lineAt(match.index);
    const formula = match[1].trim();
    if (/^\s*\|/.test(lineText(line))) {
      errors.push({ line, formula, reason: 'Block math inside a Markdown table' });
    }
    if (formula) {
      const reason = mathError(formula, true);
      if (reason) errors.push({ line, formula, reason });
    }
  }

  const noDisplay = noCode.replace(/\$\$[\s\S]+?\$\$/g, s => s.replace(/[^\n]/g, ' '));
  const inlinePattern = /(^|[^\\])\$([^$\n]+?)\$/g;
  while ((match = inlinePattern.exec(noDisplay)) !== null) {
    inlines++;
    const line = lineAt(match.index + match[1].length);
    const formula = match[2];
    if (/^\s|\s$/.test(formula)) {
      errors.push({ line, formula, reason: 'Whitespace immediately inside an inline math delimiter' });
    }
    if (/^\s*\|/.test(lineText(line)) && /\||\\\|/.test(formula)) {
      errors.push({ line, formula, reason: 'Pipe inside table math: use \\vert instead' });
    }
    const reason = mathError(formula.trim(), false);
    if (reason) errors.push({ line, formula, reason });
  }

  // Detect delimiters skipped by the expression extractors.
  const dollarCount = [...noDisplay.matchAll(/(?<!\\)\$/g)].length;
  if (dollarCount !== inlines * 2) {
    errors.push({ line: 1, formula: '', reason: 'Unpaired or malformed inline $ math delimiter' });
  }
  const displayCount = [...noCode.matchAll(/\$\$/g)].length;
  if (displayCount !== displays * 2) {
    errors.push({ line: 1, formula: '', reason: 'Unpaired $$ display delimiter' });
  }
  for (const bad of noCode.matchAll(/\\\([^\n]+?\\\)|\\\[[^\n]+?\\\]/g)) {
    errors.push({ line: lineAt(bad.index), formula: bad[0], reason: 'Unsupported math delimiter: use $...$ or $$...$$' });
  }
  return { errors, displays, inlines };
}

function filesIn(dir) {
  const result = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || ['node_modules', 'dist', 'scratch'].includes(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) result.push(...filesIn(fullPath));
    else if (entry.isFile() && entry.name.endsWith('.md')) result.push(fullPath);
  }
  return result;
}

const directory = process.argv[2] || 'docs';
const files = filesIn(directory);
let total = 0;
let formulas = 0;
for (const file of files) {
  const { errors, displays, inlines } = checkFile(file);
  formulas += displays + inlines;
  for (const error of errors) {
    total++;
    console.error('[MathJax] ' + file + ':' + error.line + ': ' + error.reason);
    if (error.formula) console.error('  Formula: ' + error.formula.slice(0, 160).replace(/\n/g, ' '));
  }
}
if (total > 0) {
  console.error('MathJax check failed: ' + total + ' errors in ' + formulas + ' formulas (' + files.length + ' files)');
  process.exit(1);
}
console.log('MathJax check passed: ' + formulas + ' formulas in ' + files.length + ' Markdown files');
