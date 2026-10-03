import os
import fitz
from PIL import Image

pdf_path = '/Users/hekote/Documents/電路學/1151-電路學(一)CIRCUIT THEORY(1)(電子二甲)[1542]_CH001.pdf'
output_dir = '/Users/hekote/Documents/電路學/assets/images/'
os.makedirs(output_dir, exist_ok=True)

doc = fitz.open(pdf_path)

def save_page_crop_or_full(page_num, bbox, out_name):
    page = doc[page_num - 1]
    # Matrix 3x for high resolution
    mat = fitz.Matrix(3, 3)
    if bbox:
        pad = 20
        rect = fitz.Rect(
            max(0, bbox[0] - pad),
            max(0, bbox[1] - pad),
            min(page.rect.width, bbox[2] + pad),
            min(page.rect.height, bbox[3] + pad)
        )
        pix = page.get_pixmap(matrix=mat, clip=rect)
    else:
        pix = page.get_pixmap(matrix=mat)
    
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

# Target extractions
save_page_crop_or_full(3, (28, 60, 690, 480), 'ch1_fig_1_1.png')
save_page_crop_or_full(4, (70, 160, 660, 460), 'ch1_fig_1_2.png')
save_page_crop_or_full(13, (80, 120, 690, 490), 'ch1_fig_1_3.png')
save_page_crop_or_full(16, (20, 80, 700, 530), 'ch1_fig_1_4.png')
save_page_crop_or_full(16, (20, 80, 700, 530), 'ch1_fig_1_5.png')
save_page_crop_or_full(22, (30, 110, 700, 490), 'ch1_fig_1_6.png')
save_page_crop_or_full(23, (330, 210, 700, 520), 'ch1_fig_1_7.png')
save_page_crop_or_full(25, (400, 210, 710, 530), 'ch1_passive_sign.png')
save_page_crop_or_full(25, (400, 210, 710, 530), 'ch1_fig_1_8.png')
save_page_crop_or_full(26, (20, 60, 710, 460), 'ch1_fig_1_9.png')
save_page_crop_or_full(27, (390, 220, 700, 520), 'ch1_fig_1_10.png')
save_page_crop_or_full(37, (160, 160, 570, 460), 'ch1_fig_1_11.png')
save_page_crop_or_full(38, (260, 170, 460, 420), 'ch1_fig_1_12.png')
save_page_crop_or_full(39, (20, 40, 715, 400), 'ch1_fig_1_13.png')
save_page_crop_or_full(40, (100, 170, 650, 470), 'ch1_controlled_sources.png')
save_page_crop_or_full(40, (100, 170, 650, 470), 'ch1_fig_1_14.png')
save_page_crop_or_full(42, (140, 180, 620, 450), 'ch1_fig_1_15.png')

import shutil
for alias in ['ch1_fig_1_18.png', 'ch1_fig_1_20.png', 'ch1_fig_1_31.png']:
    src = os.path.join(output_dir, 'ch1_fig_1_15.png')
    dst = os.path.join(output_dir, alias)
    if os.path.exists(src):
        shutil.copy(src, dst)
        print(f"Created alias {alias}")

print("Extraction completed successfully.")
