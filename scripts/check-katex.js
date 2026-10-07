#!/usr/bin/env node
/**
 * scripts/check-katex.js
 * 
 * 嚴格檢驗 Markdown 檔案中的 KaTeX 數學語法（行內 $...$ 與區塊 $$...$$）
 * 若發現任何解析錯誤（如未轉義字元、語法損壞、未閉合符號），
 * 立即輸出精確錯誤檔案、行號與原因，並以非零狀態碼退出。
 */

import fs from 'fs';
import path from 'path';
import katex from 'katex';

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // 屏蔽程式碼區塊（避免程式碼中的 $ 觸發誤判）
  const noCode = content
    .replace(/```[\s\S]*?```/g, m => ' '.repeat(m.length))
    .replace(/`[^`\n]+`/g, m => ' '.repeat(m.length));

  const errors = [];

  // 1. 檢驗區塊公式 $$...$$
  const displayRegex = /\$\$([\s\S]+?)\$\$/g;
  let match;
  while ((match = displayRegex.exec(noCode)) !== null) {
    const math = match[1].trim();
    if (!math) continue;
    try {
      katex.renderToString(math, { displayMode: true, throwOnError: true, strict: 'ignore' });
    } catch (err) {
      const lineNo = content.slice(0, match.index).split('\n').length;
      errors.push({ type: 'display', line: lineNo, err: err.message, math });
    }
  }

  // 2. 檢驗行內公式 $...$（排除已檢驗之 $$ 區塊與轉義之 \$）
  const noDisplay = noCode.replace(/\$\$[\s\S]+?\$\$/g, m => ' '.repeat(m.length));
  const inlineRegex = /(^|[^\\])\$([^\$\n]+?)\$/g;
  while ((match = inlineRegex.exec(noDisplay)) !== null) {
    const math = match[2].trim();
    if (!math) continue;
    try {
      katex.renderToString(math, { displayMode: false, throwOnError: true, strict: 'ignore' });
    } catch (err) {
      const lineNo = noDisplay.slice(0, match.index).split('\n').length;
      errors.push({ type: 'inline', line: lineNo, err: err.message, math });
    }
  }

  // 3. 檢驗未被 VitePress 支援之裸 LaTeX 定界符 \(...\) 或 \[...\]
  const parenRegex = /\\\([^\n]+?\\\)|\\[[^\n]+?\\]/g;
  let rawMatch;
  while ((rawMatch = parenRegex.exec(noCode)) !== null) {
    const lineNo = content.slice(0, rawMatch.index).split('\n').length;
    errors.push({
      type: 'unsupported-delimiter',
      line: lineNo,
      err: '使用了 VitePress 預設不支援的 \\(...\\) 或 \\[...\\] 定界符，請改用 $...$ 或 $$...$$',
      math: rawMatch[0]
    });
  }

  return errors;
}

function walkDir(dir) {
  let files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith('.') || entry.name === 'node_modules' || entry.name === 'dist' || entry.name === 'scratch') {
      continue;
    }
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(walkDir(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  return files;
}

// 主流程
const targetDir = process.argv[2] || 'docs';
const mdFiles = walkDir(targetDir);

let totalErrors = 0;
for (const file of mdFiles) {
  const fileErrors = checkFile(file);
  if (fileErrors.length > 0) {
    console.error(`\x1b[31m[KaTeX 語法錯誤]\x1b[0m ${file}:`);
    for (const e of fileErrors) {
      console.error(`  - 第 ${e.line} 行 (${e.type}): ${e.err}`);
      console.error(`    公式內容: "${e.math.slice(0, 100)}"`);
    }
    totalErrors += fileErrors.length;
  }
}

if (totalErrors > 0) {
  console.error(`\n\x1b[31m❌ 檢驗失敗：共發現 ${totalErrors} 個 KaTeX 語法錯誤！請修正後再行建置。\x1b[0m`);
  process.exit(1);
} else {
  console.log(`\x1b[32m✅ KaTeX 語法檢驗全數通過：已掃描 ${mdFiles.length} 個 Markdown 檔案，無任何語法錯誤。\x1b[0m`);
  process.exit(0);
}
