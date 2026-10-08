import fitz
doc = fitz.open("1151-電路學(一)CIRCUIT THEORY(1)(電子二甲)[1542]_CH003.pdf")
for i in range(65, len(doc)):
    pix = doc[i].get_pixmap(dpi=100)
    pix.save(f"scratch/page_{i+1}.png")
