import fitz

pdf_path = '/Users/hekote/Documents/電路學/1151-電路學(一)CIRCUIT THEORY(1)(電子二甲)[1542]_CH003.pdf'
doc = fitz.open(pdf_path)

for i, page in enumerate(doc):
    text = page.get_text("text")
    if "Example 3.3" in text or "Example 3.4" in text or "Example 3.5" in text or "Example 3.6" in text or "Example 3.7" in text or "Example 3.8" in text or "Example 3.1" in text or "Example 3.2" in text:
        for line in text.split('\n'):
            if "Example 3." in line:
                print(f"Page {i+1}: {line.strip()}")
