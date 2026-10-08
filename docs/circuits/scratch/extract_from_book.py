import fitz

pdf_path = "課本.pdf"
doc = fitz.open(pdf_path)
page = doc[107]

print(f"Page size: {page.rect}")
for block in page.get_text("blocks"):
    if "Figure 3.30" in block[4]:
        print(f"Figure 3.30 text block: {block[:4]}")
    if "50" in block[4] or "30 V" in block[4] or "60" in block[4]:
        print(f"Block: {block[:4]} -> {block[4].strip()}")
