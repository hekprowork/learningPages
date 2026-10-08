import fitz

pdf_path = "1151-電路學(一)CIRCUIT THEORY(1)(電子二甲)[1542]_CH003.pdf"
doc = fitz.open(pdf_path)

for page_num in range(len(doc)):
    page = doc[page_num]
    text = page.get_text()
    if "Practice Prob. 3.9" in text:
        print(f"Found 'Practice Prob. 3.9' on page {page_num+1}")
    elif "3.30" in text:
        print(f"Found '3.30' on page {page_num+1}")
