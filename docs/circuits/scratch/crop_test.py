import fitz
from PIL import Image

doc = fitz.open("課本.pdf")
page = doc[107]
rect = fitz.Rect(150, 240, 530, 448)
mat = fitz.Matrix(3, 3)
pix = page.get_pixmap(matrix=mat, clip=rect)

img_path = "assets/images/fig_3_30_mesh_practice.png"
pix.save(img_path)

pil_img = Image.open(img_path)
if pil_img.mode in ('RGBA', 'LA') or (pil_img.mode == 'P' and 'transparency' in pil_img.info):
    alpha = pil_img.convert('RGBA')
    bg = Image.new('RGB', alpha.size, (255, 255, 255))
    bg.paste(alpha, mask=alpha.split()[3])
    bg.save(img_path)
else:
    pil_img.convert('RGB').save(img_path)

