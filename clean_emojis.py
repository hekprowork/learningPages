import os

repos = [
    "/Users/hekote/Documents/學習筆記",
    "/Users/hekote/Documents/固態電子導論"
]

replacements = {
    '⚛️': 'Solid-State',
    '⚡': 'Electronics',
    '🔌': 'Circuits',
    '📐': 'Math',
    '📚': 'Library',
    '🟢': 'Status',
    '🎯': 'Target',
    '📌': 'Pin',
    '🚀': 'Launch',
    '💡': 'Idea',
    '📖': 'Book',
    '✨': 'Note',
    '🛠️': 'Tools',
    '🔍': 'Search',
    '📊': 'Chart'
}

for repo in repos:
    for rel_path in ["docs/index.md", "docs/.vitepress/config.mts"]:
        filepath = os.path.join(repo, rel_path)
        if os.path.exists(filepath):
            with open(filepath, "r", encoding="utf-8") as f:
                text = f.read()
            for emo, rep in replacements.items():
                text = text.replace(emo, rep)
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(text)
            print(f"Cleaned emojis safely in {filepath}")
