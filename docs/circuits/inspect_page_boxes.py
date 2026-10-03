import fitz

pdf_path = '/Users/hekote/Documents/電路學/1151-電路學(一)CIRCUIT THEORY(1)(電子二甲)[1542]_CH003.pdf'
doc = fitz.open(pdf_path)

target_pages = [8, 14, 21, 22, 25, 28, 29, 31, 44, 49, 58, 59, 62, 69]

for pno in target_pages:
    page = doc[pno - 1]
    print(f"--- Page {pno} ---")
    rects = []
    # get drawing bboxes
    for d in page.get_drawings():
        rects.append(d['rect'])
    # get image bboxes
    for img in page.get_images(full=True):
        xref = img[0]
        rects.extend(page.get_image_rects(xref))
    
    if rects:
        min_x = min(r.x0 for r in rects)
        min_y = min(r.y0 for r in rects)
        max_x = max(r.x1 for r in rects)
        max_y = max(r.y1 for r in rects)
        print(f"  Combined drawings/images bbox: ({min_x:.1f}, {min_y:.1f}, {max_x:.1f}, {max_y:.1f})")
    else:
        print("  No drawings or images found.")
