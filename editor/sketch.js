// RECEIPT!
// This is the file to edit. p5.js reference: https://p5js.org/reference/
import JsBarcode from "jsbarcode";

export const receipt = {
  height: 1080, // 240–2000 px. Width is fixed by the printer.
  seed: 69,
};

const face = "data:image/jpeg;base64,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";
const pic = new Image();
try {
  pic.src = new URL("./assets/pic.png", import.meta.url).href;
} catch (err) {
  pic.src = face;
}
let picBad = false;
pic.onerror = () => {
  picBad = true;
};

export function drawReceipt(p) {
  const { width: w, height: h } = p;
  const margin = 24;

  p.background(255);

  drawHackClubFlag(p, margin, 18, 76, 40);

  p.noStroke();
  p.fill(0);
  p.textFont("monospace");
  p.textAlign(p.RIGHT, p.CENTER);
  p.textStyle(p.BOLD);
  p.textSize(18);
  p.text("ATHANNN", w - margin, 36);
  p.textStyle(p.NORMAL);
  p.textSize(11);
  p.text("My Portrait", w - margin, 56);

  p.stroke(0);
  p.strokeWeight(2);
  p.line(margin, 74, w - margin, 74);

  if (!pic.complete) pic.onload = () => p.redraw();
  if (picBad) throw new Error("pic did not load");
  if (pic.complete && pic.naturalWidth) {
    const sx = 250;
    const sy = 120;
    const sw = 800;
    const sh = 1160;
    const inset = 8;
    const dw = w - inset * 2;
    const dh = sh * (dw / sw);
    const top = 86;
    const bot = h - 162;
    const x = (w - dw) / 2;
    const y = top + (bot - top - dh) / 2;
    p.drawingContext.drawImage(pic, sx, sy, sw, sh, x, y, dw, dh);
    p.loadPixels();
    const x0 = Math.floor(x);
    const y0 = Math.floor(y);
    const s = Math.ceil(dw);
    const t = Math.ceil(dh);
    for (let yy = y0; yy < y0 + t; yy++) {
      for (let xx = x0; xx < x0 + s; xx++) {
        const i = 4 * (yy * w + xx);
        const lum = 0.299 * p.pixels[i] + 0.587 * p.pixels[i + 1] + 0.114 * p.pixels[i + 2];
        const v = lum < 200 ? 0 : 255;
        p.pixels[i] = v;
        p.pixels[i + 1] = v;
        p.pixels[i + 2] = v;
      }
    }
    p.updatePixels();
  }

  p.fill(0);
  for (let i = 0; i < 190; i++) {
    const px = p.random(margin, w - margin);
    const py = i < 120 ? p.random(88, h - 168) : p.random(168, 420);
    if (py > 88 && py < 190 && px > 48 && px < w - 48) continue;
    if (px > 16 && px < 368 && py > 236 && py < 784) continue;
    const big = p.random();
    if (big > 0.74) {
      const arm = 3 + p.random(6);
      p.stroke(0);
      p.strokeWeight(big > 0.93 ? 2 : 1);
      p.line(px - arm, py, px + arm, py);
      p.line(px, py - arm, px, py + arm);
      p.line(px - arm * 0.55, py - arm * 0.55, px + arm * 0.55, py + arm * 0.55);
      p.line(px - arm * 0.55, py + arm * 0.55, px + arm * 0.55, py - arm * 0.55);
      p.noStroke();
      p.circle(px, py, big > 0.93 ? 4 : 2.2);
    } else {
      p.noStroke();
      p.circle(px, py, big > 0.45 ? 2.8 : 1.5);
    }
  }

  p.noStroke();
  p.fill(0);
  p.textFont("monospace");
  p.textAlign(p.CENTER, p.CENTER);
  p.textStyle(p.BOLD);
  p.textSize(24);
  p.text("THE BEST", w / 2, 108);
  p.textSize(40);
  p.text("STARDANCER", w / 2, 160);

  dashedLine(p, margin, h - 150, w - margin, h - 150, 6, 5);

  drawBarcode(p, "receipt.hackclub.com", w / 2, h - 130);

  p.noStroke();
  p.fill(0);
  p.textFont("monospace");
  p.textSize(10);
  p.textStyle(p.BOLD);
  p.textAlign(p.LEFT, p.BOTTOM);
  p.text("HACK CLUB \u2022 2026", margin, h - 24);

  p.textAlign(p.RIGHT, p.BOTTOM);
  p.textStyle(p.NORMAL);
  p.text("PROFILE//ATHANNN", w - margin, h - 24);
}

function drawHackClubFlag(p, x, y, fw, fh) {
  p.push();
  p.translate(x, y);
  p.fill(0);
  p.noStroke();
  p.beginShape();
  p.vertex(0, 0);
  p.vertex(fw, 0);
  p.vertex(fw - 12, fh / 2);
  p.vertex(fw, fh);
  p.vertex(0, fh);
  p.endShape(p.CLOSE);

  p.fill(255);
  p.textFont("monospace");
  p.textStyle(p.BOLD);
  p.textAlign(p.CENTER, p.CENTER);
  p.textSize(10);
  p.text("HACK", (fw - 10) / 2, fh / 2 - 6);
  p.text("CLUB", (fw - 10) / 2, fh / 2 + 6);
  p.pop();
}

function drawBarcode(p, value, centerX, y) {
  const barcodeCanvas = document.createElement("canvas");
  JsBarcode(barcodeCanvas, value, {
    format: "CODE128",
    width: 1,
    height: 52,
    displayValue: false,
    margin: 0,
    background: "#ffffff",
    lineColor: "#000000",
  });
  // Draw directly on p5's canvas: p.image expects a p5 image wrapper, while
  // JsBarcode returns a regular browser canvas.
  p.drawingContext.drawImage(barcodeCanvas, Math.floor(centerX - barcodeCanvas.width / 2), y);
}

function dashedLine(p, x1, y1, x2, y2, dash, gap) {
  p.stroke(0);
  p.strokeWeight(2);
  for (let x = x1; x < x2; x += dash + gap) {
    p.line(x, y1, Math.min(x + dash, x2), y2);
  }
}