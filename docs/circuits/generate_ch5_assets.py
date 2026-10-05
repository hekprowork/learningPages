import os
import fitz
from PIL import Image

pdf_path = '/Users/hekote/Documents/學習筆記/docs/circuits/1151-電路學(一)CIRCUIT THEORY(1)(電子二甲)[1542]_CH005.pdf'
output_dir = '/Users/hekote/Documents/學習筆記/docs/circuits/assets/images/'
os.makedirs(output_dir, exist_ok=True)

doc = fitz.open(pdf_path)

crops = [
    (20, (10, 210, 715, 460), 'ex_5_1_circuit.png'),
    (25, (15, 50, 705, 290), 'prac_5_1_circuit.png'),
    (30, (120, 120, 530, 450), 'ex_5_2_circuit.png'),
    (32, (10, 50, 710, 350), 'prac_5_2_circuit.png'),
    (35, (160, 200, 600, 480), 'ex_5_3_circuit.png'),
    (39, (20, 70, 700, 280), 'prac_5_3_circuit.png'),
    (37, (90, 130, 570, 480), 'ex_5_4_circuit.png'),
    (46, (90, 150, 590, 480), 'ex_5_5_circuit.png'),
    (50, (15, 55, 710, 310), 'prac_5_5_circuit.png'),
    (54, (90, 160, 600, 470), 'ex_5_6_circuit.png'),
    (56, (8, 50, 712, 370), 'prac_5_6_circuit.png'),
    (64, (70, 240, 530, 520), 'ex_5_7_circuit.png'),
    (66, (330, 110, 720, 440), 'ex_5_8_circuit.png'),
    (70, (10, 140, 715, 500), 'prac_5_8_circuit.png'),
    (72, (140, 150, 580, 450), 'ex_5_9_circuit.png'),
    (76, (5, 25, 680, 265), 'prac_5_9_circuit.png'),
    (74, (90, 130, 630, 480), 'ex_5_10_circuit.png'),
    (76, (130, 240, 720, 520), 'prac_5_10_circuit.png'),
    (77, (20, 200, 710, 500), 'ex_5_11_circuit.png'),
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

print('All 19 Chapter 5 assets generated successfully!')
