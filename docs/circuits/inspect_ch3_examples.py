import fitz

pdf_path = '/Users/hekote/Documents/電路學/1151-電路學(一)CIRCUIT THEORY(1)(電子二甲)[1542]_CH003.pdf'
doc = fitz.open(pdf_path)

for i, page in enumerate(doc):
    text = page.get_text("text")
    for line in text.split('\n'):
        if 'Example 3.' in line or 'EX 3.' in line or 'Ex 3.' in line or 'EXAMPLE 3.' in line:
            print(f"Page {i+1}: {line.strip()}")
