import fitz

pdf_path = '/Users/hekote/Documents/電路學/1151-電路學(一)CIRCUIT THEORY(1)(電子二甲)[1542]_CH003.pdf'
doc = fitz.open(pdf_path)

pages_to_check = [8, 14, 21, 22, 25, 28, 29, 31, 44, 49, 58, 59, 62, 69]

for pno in pages_to_check:
    page = doc[pno - 1]
    print(f"=== Page {pno} ===")
    blocks = page.get_text("blocks")
    for b in blocks:
        # print text block bbox and text snippet
        text = b[4].strip().replace('\n', ' ')
        if len(text) > 0:
            print(f"  Bbox ({b[0]:.1f}, {b[1]:.1f}, {b[2]:.1f}, {b[3]:.1f}): {text[:80]}...")
