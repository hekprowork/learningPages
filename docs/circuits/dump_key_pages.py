import fitz

pdf_path = '/Users/hekote/Documents/電路學/1151-電路學(一)CIRCUIT THEORY(1)(電子二甲)[1542]_CH003.pdf'
doc = fitz.open(pdf_path)

pages = [8, 14, 25, 28, 29, 31, 44, 49, 59, 62, 69]
for pno in pages:
    page = doc[pno - 1]
    print(f"=== Page {pno} ===")
    print(page.get_text("text"))
