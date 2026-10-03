import os
import json
import urllib.request
import bs4

token = 'gb_api_RBNWXsqJMhOb6rxGSiZbBeUxCsLRvmKknUw6lTwp'
headers = {
    'Authorization': f'Bearer {token}',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}
space_id = 'NlHLg36kQg9lV85JSG18'
org_id = 't16lbLvbrcGtlVK07wla'
site_id = 'site_KxR7N'

def html_to_markdown(html_path):
    with open(html_path, 'r', encoding='utf-8') as f:
        soup = bs4.BeautifulSoup(f.read(), 'html.parser')
        
    # Extract title and subtitle
    h1 = soup.find('h1')
    title = h1.get_text().strip() if h1 else "Untitled"
    subtitle_p = soup.find('p', class_='subtitle')
    subtitle = subtitle_p.get_text().strip() if subtitle_p else ""
    
    # Extract main container or body
    container = soup.find('div', class_='container') or soup.body
    
    # Remove header / lesson-tag if needed
    for tag in container.find_all(['header', 'script', 'style', 'meta', 'link']):
        tag.decompose()
        
    # Convert remaining html to clean markdown text
    # Since MathJax uses \( ... \) and \[ ... \], text is already markdown-friendly for math!
    text = container.get_text(separator='\n', strip=True)
    
    md_content = f"# {title}\n\n"
    if subtitle:
        md_content += f"> {subtitle}\n\n"
    md_content += text
    return md_content, title

def build_readme():
    with open('MISSION.md', 'r', encoding='utf-8') as f:
        mission = f.read()
    with open('NOTES.md', 'r', encoding='utf-8') as f:
        notes = f.read()
    
    readme = f"""# 固態電子導論 (Solid-State Electronics) 課程導論與架構簡介

歡迎來到 **固態電子導論** 課程文檔中心。本平台匯集了完整的課程教材、隨堂學習紀錄、核心速查表及互動學習工具。

---

## 🎯 課程宗旨與目標 (Mission)

{mission}

---

## 📌 教學筆記與導讀重點 (Notes)

{notes}

---

## 📚 課程目錄導覽

本課程主要分為三大模組：
1. **第一章：晶體幾何與密勒指數**（含 001 密勒指數、002 鑽石結構與原子密度）
2. **第二章：塊狀晶體生長與晶圓製備**（含 003 塊狀晶體生長、CZ/LEC 長晶法與偏析效應）
3. **學習紀錄與延伸筆記**（含 001 價電子與能帶結構、002 面間距幾何、003 塊狀生長總結）
"""
    return readme

print("Helper script template created successfully.")
