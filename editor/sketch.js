// RECEIPT!
// This is the file to edit. p5.js reference: https://p5js.org/reference/
import JsBarcode from "jsbarcode";

export const receipt = {
  height: 1080, // 240–2000 px. Width is fixed by the printer.
  seed: 67,
};

let pic = null;
let picBad = false;

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

  if (!pic) {
    pic = new Image();
    pic.onload = () => p.redraw();
    pic.onerror = () => {
      picBad = true;
      p.redraw();
    };
    pic.src = new URL("./assets/pic.png", import.meta.url).href;
  }
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