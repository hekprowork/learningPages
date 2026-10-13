"""Re-crop the Chapter 4 workbook figures from the local textbook PDF.

The workbook uses the figures from ``課本.pdf`` as its source of truth.  The
coordinates below are PDF-point rectangles around the complete figure body and
its caption, with nearby prose intentionally excluded.  Keeping the manifest
in source control makes future re-crops reproducible instead of relying on
hand-edited PNGs.
"""

from pathlib import Path

import fitz
from PIL import Image


ROOT = Path(__file__).resolve().parent
PDF_PATH = ROOT / "課本.pdf"
OUTPUT_DIR = ROOT / "assets" / "images"
SCALE = 3


# (PDF page number, (x0, y0, x1, y1)) in PDF points.  Each rectangle includes
# the complete diagram and its Figure caption, plus a small white margin.
FIGURES = {
    # Example statement diagrams (Examples 4.1–4.13).  The original files were
    # inconsistent screenshots; several included neighbouring prose or clipped
    # captions.  These entries keep only the diagram and its own figure label.
    "ex_4_1_circuit.png": (133, (360, 500, 530, 640)),
    "ex_4_2_circuit.png": (134, (235, 305, 525, 430)),
    "ex_4_3_circuit.png": (136, (40, 82, 195, 170)),
    "ex_4_4_circuit.png": (136, (40, 540, 195, 700)),
    "ex_4_5_circuit.png": (138, (40, 240, 205, 375)),
    "ex_4_6_circuit.png": (141, (365, 82, 530, 180)),
    "ex_4_7_circuit.png": (142, (40, 80, 195, 215)),
    "ex_4_8_circuit.png": (144, (40, 600, 205, 708)),
    "ex_4_9_circuit.png": (146, (40, 212, 210, 350)),
    "ex_4_10_circuit.png": (148, (40, 45, 205, 142)),
    "ex_4_11_circuit.png": (150, (40, 500, 208, 630)),
    "ex_4_12_circuit.png": (152, (40, 82, 215, 210)),
    "ex_4_13_circuit.png": (155, (115, 380, 320, 490)),
    "ch4-pr1_figure_4.3.png": (134, (44, 180, 205, 268)),
    "ch4-pr1_figure_4.5.png": (134, (44, 607, 200, 705)),
    "ch4-pr2_figure_4.3.png": (134, (44, 180, 205, 268)),
    "ch4-pr2_figure_4.4.png": (134, (235, 300, 512, 432)),
    "ch4-pr2_figure_4.5.png": (134, (44, 607, 200, 705)),
    "ch4-pr3_figure_4.6.png": (136, (44, 84, 203, 177)),
    "ch4-pr3_figure_4.7.png": (136, (44, 180, 190, 393)),
    "ch4-pr3_figure_4.8.png": (136, (44, 419, 205, 514)),
    "ch4-pr3_figure_4.9.png": (136, (44, 545, 191, 702)),
    "ch4-pr3_figure_4.10.png": (137, (95, 70, 485, 255)),
    "ch4-pr4_figure_4.11.png": (138, (44, 82, 204, 193)),
    "ch4-pr4_figure_4.12.png": (138, (44, 245, 200, 382)),
    "ch4-pr4_figure_4.13.png": (139, (78, 45, 525, 348)),
    "ch4-pr5_figure_4.14.png": (139, (63, 385, 330, 493)),
    "ch4-pr5_figure_4.13.png": (139, (78, 45, 525, 348)),
    "ch4-pr6_figure_4.17.png": (141, (369, 75, 522, 178)),
    "ch4-pr6_figure_4.18.png": (141, (134, 205, 522, 384)),
    "ch4-pr6_figure_4.19.png": (141, (85, 570, 360, 669)),
    "ch4-pr7_figure_4.20.png": (142, (44, 82, 188, 218)),
    "ch4-pr7_figure_4.21.png": (142, (62, 240, 525, 378)),
    "ch4-pr7_figure_4.22.png": (142, (44, 608, 216, 705)),
    "ch4-pr8_figure_4.30.png": (146, (44, 84, 208, 186)),
    "ch4-pr8_figure_4.31.png": (146, (44, 213, 185, 353)),
    "ch4-pr8_figure_4.32.png": (146, (49, 354, 527, 542)),
    "ch4-pr9_figure_4.32.png": (146, (49, 354, 527, 542)),
    "ch4-pr9_figure_4.33.png": (147, (369, 243, 531, 343)),
    "ch4-pr9_figure_4.34.png": (147, (369, 403, 523, 495)),
    "ch4-pr9_figure_4.35.png": (148, (44, 43, 197, 485)),
    "ch4-pr10_figure_4.35.png": (148, (44, 43, 197, 485)),
    "ch4-pr10_figure_4.36.png": (149, (369, 356, 527, 455)),
    "ch4-pr10_figure_4.37.png": (149, (369, 511, 533, 704)),
    "ch4-pr11_figure_4.39.png": (150, (44, 508, 215, 630)),
    "ch4-pr11_figure_4.40.png": (151, (40, 45, 535, 325)),
    "ch4-pr11_figure_4.41.png": (151, (369, 473, 534, 565)),
    "ch4-pr11_figure_4.42.png": (151, (369, 613, 523, 703)),
    "ch4-pr12_figure_4.45.png": (152, (44, 600, 198, 704)),
    "ch4-pr13_figure_4.52.png": (156, (44, 317, 215, 435)),
    "ch4-pr13_figure_4.51.png": (155, (108, 565, 525, 701)),
    "ch4-ex14_figure_4.48.png": (154, (45, 290, 198, 432)),
    "ch4-ex14_figure_4.49.png": (154, (45, 445, 198, 580)),
    "ch4-ex14_figure_4.53.png": (157, (45, 374, 529, 551)),
    "ch4-ex14_figure_4.54.png": (158, (45, 42, 530, 233)),
    "ch4-ex15_figure_4.54.png": (158, (45, 42, 530, 233)),
    "ch4-ex15_figure_4.55.png": (158, (44, 398, 204, 493)),
    "ch4-ex15_figure_4.56.png": (158, (44, 500, 204, 644)),
    "ch4-pr15_figure_4.57.png": (159, (369, 46, 531, 270)),
    "ch4-pr15_figure_4.55.png": (158, (44, 398, 204, 493)),
    "ch4-ex16_figure_4.62.png": (161, (369, 349, 530, 595)),
    "ch4-pr14_figure_4.5.png": (134, (44, 607, 200, 705)),
    "ch4-pr14_figure_4.55.png": (158, (44, 398, 204, 493)),
    "ch4-pr14_figure_4.56.png": (158, (44, 500, 204, 644)),
    "ch4-pr16_figure_4.61.png": (161, (88, 48, 330, 166)),
    "ch4-pr16_figure_4.62.png": (161, (369, 349, 530, 595)),
    "ch4-ex18_figure_4.63.png": (162, (44, 255, 210, 392)),
    "ch4-ex17_figure_4.63.png": (162, (44, 255, 210, 392)),
    "ch4-pr17_figure_4.63.png": (162, (44, 255, 210, 392)),
    "ch4-pr17_figure_4.64.png": (163, (114, 240, 261, 358)),
    "ch4-pr17_figure_4.65.png": (164, (84, 42, 476, 311)),
    "ch4-pr18_figure_4.66.png": (164, (44, 355, 205, 550)),
}


def crop_figure(page: fitz.Page, rect: tuple[float, float, float, float]) -> Image.Image:
    pixmap = page.get_pixmap(
        matrix=fitz.Matrix(SCALE, SCALE),
        clip=fitz.Rect(rect),
        alpha=False,
    )
    return Image.frombytes("RGB", (pixmap.width, pixmap.height), pixmap.samples)


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    document = fitz.open(PDF_PATH)
    for filename, (page_number, rect) in FIGURES.items():
        image = crop_figure(document[page_number - 1], rect)
        image.save(OUTPUT_DIR / filename, format="PNG", optimize=True)
        print(f"{filename}: page {page_number}, {image.width}x{image.height}")
    print(f"Re-cropped {len(FIGURES)} Chapter 4 workbook figures from {PDF_PATH.name}.")


if __name__ == "__main__":
    main()
