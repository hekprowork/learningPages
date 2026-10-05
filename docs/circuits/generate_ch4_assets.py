import os
import fitz
from PIL import Image

pdf_path = '/Users/hekote/Documents/學習筆記/docs/circuits/1151-電路學(一)CIRCUIT THEORY(1)(電子二甲)[1542]_CH004.pdf'
output_dir = '/Users/hekote/Documents/學習筆記/docs/circuits/assets/images/'
os.makedirs(output_dir, exist_ok=True)

doc = fitz.open(pdf_path)

crops = [
    (7, (110, 170, 560, 460), 'ex_4_1_circuit.png'),
    (10, (40, 200, 680, 450), 'ex_4_2_circuit.png'),
    (19, (60, 125, 620, 385), 'ex_4_3_circuit.png'),
    (23, (160, 130, 560, 440), 'ex_4_4_circuit.png'),
    (30, (90, 130, 630, 490), 'ex_4_5_circuit.png'),
    (45, (60, 180, 650, 420), 'ex_4_6_circuit.png'),
    (50, (110, 150, 610, 465), 'ex_4_7_circuit.png'),
    (64, (70, 200, 610, 440), 'ex_4_8_circuit.png'),
    (71, (90, 135, 630, 490), 'ex_4_9_circuit.png'),
    (81, (40, 120, 420, 310), 'ex_4_10_circuit.png'),
    (101, (90, 180, 600, 465), 'ex_4_11_circuit.png'),
    (107, (40, 130, 410, 380), 'ex_4_12_circuit.png'),
    (117, (50, 210, 680, 455), 'ex_4_13_circuit.png'),
]

for p_num, bbox, out_name in crops:
    page = doc[p_num - 1]
    mat = fitz.Matrix(3, 3) # 3x high resolution
    rect = fitz.Rect(bbox)
    pix = page.get_pixmap(matrix=mat, clip=rect)
    
    img_path = os.path.join(output_dir, out_name)
    pix.save(img_path)
    
    pil_img = Image.open(img_path)
    if pil_img.mode in ('RGBA', 'LA') or (pil_img.mode == 'P' and 'transparency' in pil_img.info):
        alpha = pil_img.convert('RGBA')
        bg = Image.new('RGB', alpha.size, (255, 255, 255))
        bg.paste(alpha, mask=alpha.split()[3])
        bg.save(img_path)
    else:
        pil_img.convert('RGB').save(img_path)
        
    final_img = Image.open(img_path)
    print(f'Saved {out_name}: size={final_img.size}')

print('All Chapter 4 assets generated successfully!')
