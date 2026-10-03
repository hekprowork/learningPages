import os
import re

repos = [
    "/Users/hekote/Documents/學習筆記",
    "/Users/hekote/Documents/固態電子導論"
]

rule_content = """
### Rule: 禁止使用非黑白 ICON (Monochrome Icon Only)
- 嚴禁使用彩色 Emoji 或非黑白圖標。全站一律採用純黑白/單色 (Black & White / Monochrome) 圖標或純文字標籤，確保排版簡約專業一致。

### Rule: PDF 檔案為最高優先資料來源 (PDF-First as Primary Source)
- 撰寫、補充與推導所有課程講義、筆記、例題與速查表時，必須以本地課本/教材之原始 PDF 檔案為最優先、最高權威的第一手資料來源（Primary Source of Truth）。
"""

agents_files = []
for repo in repos:
    for root, dirs, files in os.walk(repo):
        if "AGENTS.md" in files:
            agents_files.append(os.path.join(root, "AGENTS.md"))

print(f"Found AGENTS.md files: {agents_files}")

for filepath in agents_files:
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Check if rules already added
    if "禁止使用非黑白 ICON" not in content:
        # Append before the last section or at the end of Core Project Rules
        if "## 🚨 核心專案規範" in content or "## 核心專案規範" in content:
            # Insert under core project rules
            content = content.replace("## 🚨 核心專案規範", "## 核心專案規範" + rule_content)
            content = content.replace("## 核心專案規範 (Core Project Rules)", "## 核心專案規範 (Core Project Rules)" + rule_content)
        else:
            content += "\n\n## 核心專案規範\n" + rule_content
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated {filepath}")
    else:
        print(f"Already updated {filepath}")

# Now check config.mts and index.md for emojis
emoji_pattern = re.compile(r'[\U00010000-\U0010ffff]|[\u2600-\u27bf]|[\U0001f300-\U0001faff]')

for repo in repos:
    vitepress_config = os.path.join(repo, "docs", ".vitepress", "config.mts")
    index_md = os.path.join(repo, "docs", "index.md")
    
    for filepath in [vitepress_config, index_md]:
        if os.path.exists(filepath):
            with open(filepath, "r", encoding="utf-8") as f:
                text = f.read()
            
            # Replace common emojis with monochrome text / symbols
            # ⚛️ -> [Solid-State] or similar
            # Let's do general replacements or custom mapping
            replacements = {
                '⚛️': '[Solid-State]',
                '⚡': '[Electronics]',
                '🔌': '[Circuits]',
                '📐': '[Math]',
                '📚': '[Library]',
                '🟢': '[●]',
                '🎯': '[Target]',
                '📌': '[Pin]',
                '🚀': '[Launch]',
                '💡': '[Idea]',
                '📖': '[Book]',
                '✨': '[*]',
                '🛠️': '[Tools]',
                '🔍': '[Search]',
                '📊': '[Chart]'
            }
            
            modified = text
            for emo, rep in replacements.items():
                modified = modified.replace(emo, rep)
            
            # Also catch any other emojis if needed
            if modified != text:
                with open(filepath, "w", encoding="utf-8") as f:
                    f.write(modified)
                print(f"Cleaned emojis in {filepath}")
