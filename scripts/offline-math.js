import { createMarkdownRenderer } from 'vitepress'

export async function createOfflineMathRenderer(root) {
  const markdown = await createMarkdownRenderer(root, { math: true })
  const { renderer, options } = markdown

  return (statement) => {
    for (const formula of statement.querySelectorAll('.katex')) {
      const tex = formula.querySelector('annotation[encoding="application/x-tex"]')?.textContent
      if (!tex?.trim()) throw new Error('Offline KaTeX formula is missing its original LaTeX')

      const display = formula.parentElement?.matches('.katex-display') ? formula.parentElement : null
      const rule = display ? 'math_block' : 'math_inline'
      const target = display ?? formula
      target.outerHTML = renderer.rules[rule]([{ content: tex }], 0, options, {}, renderer)
    }
  }
}
