import os
import fitz
from PIL import Image

pdf_path = '/Users/hekote/Documents/電路學/1151-電路學(一)CIRCUIT THEORY(1)(電子二甲)[1542]_CH003.pdf'
output_dir = '/Users/hekote/Documents/電路學/assets/images/'
os.makedirs(output_dir, exist_ok=True)

doc = fitz.open(pdf_path)

def save_crop(page_num, bbox, out_name):
    page = doc[page_num - 1]
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
    print(f"Saved {out_name}: size={final_img.size}, mode={final_img.mode}")
    return final_img.size

# 1. Example 3.1 (Page 8, Fig 3.3)
save_crop(8, (30, 150, 690, 510), 'ex_3_1_circuit.png')

# 2. Example 3.2 (Page 14, Fig 3.5)
save_crop(14, (30, 155, 690, 505), 'ex_3_2_circuit.png')

# 3. Example 3.3 (Page 25, Fig 3.9)
save_crop(25, (80, 155, 640, 515), 'ex_3_3_circuit.png')

# 4. Example 3.4 (Page 28, Fig 3.12)
save_crop(28, (60, 120, 660, 515), 'ex_3_4_circuit.png')

# 4b. Example 3.4 Supernode (Page 29, Fig 3.13a)
save_crop(29, (30, 155, 690, 490), 'ex_3_4_supernode.png')

# 5. Example 3.5 (Page 44, Fig 3.18)
save_crop(44, (100, 180, 620, 515), 'ex_3_5_circuit.png')

# 6. Example 3.6 (Page 49, Fig 3.20)
save_crop(49, (100, 160, 620, 510), 'ex_3_6_circuit.png')

# 7. Example 3.7 (Page 62, Fig 3.24)
save_crop(62, (80, 160, 650, 515), 'ex_3_7_circuit.png')
# 7b. Example 3.7 Supermesh (Page 59, Fig 3.23)
save_crop(59, (30, 155, 690, 515), 'ex_3_7_supermesh.png')

# 8. Example 3.8 (Page 69, Fig 3.27)
save_crop(69, (60, 192, 660, 516), 'ex_3_8_circuit.png')

print("All Chapter 3 assets generated successfully!")
