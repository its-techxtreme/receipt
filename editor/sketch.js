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
    const top = 86;
    const bot = h - 162;
    const size = Math.min(w, bot - top);
    const x = (w - size) / 2;
    const y = top + (bot - top - size) / 2;
    p.drawingContext.drawImage(pic, x, y, size, size);
  }

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