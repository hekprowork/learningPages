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
    
    h1 = soup.find('h1')
    title = h1.get_text().strip() if h1 else "Untitled"
    subtitle_p = soup.find('p', class_='subtitle')
    subtitle = subtitle_p.get_text().strip() if subtitle_p else ""
    
    container = soup.find('div', class_='container') or soup.body
    for tag in container.find_all(['header', 'script', 'style', 'meta', 'link']):
        tag.decompose()
        
    text = container.get_text(separator='\n', strip=True)
    
    md_content = f"# {title}\n\n"
    if subtitle:
        md_content += f"> {subtitle}\n\n"
    md_content += text
    return md_content, title

# 1. Update space and site
print("1. Updating space and site...")
req_data = json.dumps({'title': '固態電子導論 (Solid-State Electronics)', 'emoji': '⚛️'}).encode('utf-8')
req = urllib.request.Request(f'https://api.gitbook.com/v1/spaces/{space_id}', data=req_data, headers=headers, method='PATCH')
with urllib.request.urlopen(req) as resp:
    print('Space update:', resp.status)

req_data = json.dumps({'title': '固態電子導論'}).encode('utf-8')
req = urllib.request.Request(f'https://api.gitbook.com/v1/orgs/{org_id}/sites/{site_id}', data=req_data, headers=headers, method='PATCH')
with urllib.request.urlopen(req) as resp:
    print('Site update:', resp.status)

# 2. Inspect existing pages
print("2. Inspecting existing pages...")
req = urllib.request.Request(f'https://api.gitbook.com/v1/spaces/{space_id}/content', headers=headers)
with urllib.request.urlopen(req) as resp:
    content = json.loads(resp.read().decode())
    pages = content.get('pages', [])
    print(f"Found {len(pages)} existing pages.")

# 3. Create Change Request
print("3. Creating Change Request...")
cr_data = json.dumps({'subject': 'Import Solid-State Electronics course content'}).encode('utf-8')
req = urllib.request.Request(f'https://api.gitbook.com/v1/spaces/{space_id}/change-requests', data=cr_data, headers=headers, method='POST')
with urllib.request.urlopen(req) as resp:
    cr = json.loads(resp.read().decode())
    cr_id = cr['id']
    print('Created CR ID:', cr_id)

# 4. Prepare pages to import
pages_to_import = []

with open('MISSION.md', 'r', encoding='utf-8') as f:
    mission = f.read()
with open('NOTES.md', 'r', encoding='utf-8') as f:
    notes = f.read()

readme_content = f"""# 固態電子導論 (Solid-State Electronics) 課程導論與架構簡介

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
pages_to_import.append(("課程導論與架構簡介", readme_content))

# Learning records
for f_name in sorted(os.listdir('learning-records')):
    if f_name.endswith('.md'):
        path = os.path.join('learning-records', f_name)
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        title = f"學習紀錄: {f_name.replace('.md', '')}"
        for line in content.splitlines():
            if line.startswith('# '):
                title = line[2:].strip()
                break
        pages_to_import.append((title, content))

# Lessons
for f_name in sorted(os.listdir('lessons')):
    if f_name.endswith('.html'):
        path = os.path.join('lessons', f_name)
        md, title = html_to_markdown(path)
        pages_to_import.append((f"核心講義: {title}", md))

# Reference
for f_name in sorted(os.listdir('reference')):
    if f_name.endswith('.html'):
        path = os.path.join('reference', f_name)
        md, title = html_to_markdown(path)
        pages_to_import.append((f"速查表: {title}", md))

print(f"Prepared {len(pages_to_import)} pages to import.")

# 5. Push changes into Change Request using 'changes' array
changes = []
for title, markdown in pages_to_import:
    changes.append({
        "operation": "insert_page",
        "title": title,
        "document": {"markdown": markdown}
    })

print(f"Pushing {len(changes)} changes to Change Request...")
push_data = json.dumps({"changes": changes}).encode('utf-8')
req = urllib.request.Request(f'https://api.gitbook.com/v1/spaces/{space_id}/change-requests/{cr_id}/content?compat=false', data=push_data, headers=headers, method='POST')
try:
    with urllib.request.urlopen(req) as resp:
        print('Push changes response:', resp.status, resp.read().decode())
except urllib.error.HTTPError as e:
    print('HTTPError pushing changes:', e.code, e.read().decode())
    exit(1)

# 6. Merge Change Request
print("6. Merging Change Request...")
req = urllib.request.Request(f'https://api.gitbook.com/v1/spaces/{space_id}/change-requests/{cr_id}/merge', data=b'{}', headers=headers, method='POST')
try:
    with urllib.request.urlopen(req) as resp:
        print('Merge CR response:', resp.status)
except urllib.error.HTTPError as e:
    print('HTTPError merging CR:', e.code, e.read().decode())
    exit(1)

# 7. Publish site
print("7. Publishing site...")
req = urllib.request.Request(f'https://api.gitbook.com/v1/orgs/{org_id}/sites/{site_id}/publish', data=b'{}', headers=headers, method='POST')
try:
    with urllib.request.urlopen(req) as resp:
        print('Publish site response:', resp.status)
except urllib.error.HTTPError as e:
    print('HTTPError publishing site:', e.code, e.read().decode())
    exit(1)

print("All import steps completed successfully!")
