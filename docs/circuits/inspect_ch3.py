import fitz

pdf_path = '/Users/hekote/Documents/電路學/1151-電路學(一)CIRCUIT THEORY(1)(電子二甲)[1542]_CH003.pdf'
doc = fitz.open(pdf_path)

print(f"Total pages in CH003: {len(doc)}")
for i, page in enumerate(doc):
    text = page.get_text("text")
    if "Example 3." in text or "Fig 3." in text or "Figure 3." in text:
        # Print lines matching Example 3 or Fig 3
        lines = [line.strip() for line in text.split('\n') if 'Example 3.' in line or 'Fig 3.' in line or 'Figure 3.' in line or 'EX 3.' in line or 'Ex. 3' in line]
        print(f"Page {i+1}: {lines}")
