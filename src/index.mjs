import colorNames from 'color-name';
import unitConverter from 'css-unit-converter';

const hex = /^#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})?$/;
const shortHex = /^#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])?$/;
const rgb = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*(0|1|0?\.\d+|\d+%))?\s*\)$/;
const rgbfn = /^rgba?\(\s*(\d+)\s+(\d+)\s+(\d+)(?:\s*\/\s*(0|1|0?\.\d+|\d+%))?\s*\)$/;
const rgbperc = /^rgba?\(\s*(\d+%)\s*,\s*(\d+%)\s*,\s*(\d+%)(?:\s*,\s*(0|1|0?\.\d+|\d+%))?\s*\)$/;
const rgbpercfn = /^rgba?\(\s*(\d+%)\s+(\d+%)\s+(\d+%)(?:\s*\/\s*(0|1|0?\.\d+|\d+%))?\s*\)$/;
const hsl = /^hsla?\(\s*(0?\.\d+|\d+)(deg|rad|grad|turn)?\s*,\s*(\d+)%\s*,\s*(\d+)%(?:\s*,\s*(0?\.\d+|\d+%))?\s*\)$/;
const hslws = /^hsla?\(\s*(0?\.\d+|\d+)(deg|rad|grad|turn)?\s+(\d+)%\s+(\d+)%(?:\s*\/\s*(0?\.\d+|\d+%))?\s*\)$/;

function contains(haystack, needle) {
  return haystack.indexOf(needle) > -1;
}

function rgbToHsl(r, g, b) {
  const rprim = r / 255;
  const gprim = g / 255;
  const bprim = b / 255;
  const cmax = Math.max(rprim, gprim, bprim);
  const cmin = Math.min(rprim, gprim, bprim);
  const delta = cmax - cmin;
  const l = (cmax + cmin) / 2;

  if (delta === 0) {
    return [0, 0, l * 100];
  }
  const s = delta / (1 - Math.abs(2 * l - 1));
  const h = (() => {
    switch (cmax) {
      case rprim: {
        return ((gprim - bprim) / delta) % 6;
      }
      case gprim: {
        return (bprim - rprim) / delta + 2;
      }
      default: {
        return (rprim - gprim) / delta + 4;
      }
    }
  })();

  return [
    h * 60,
    s * 100,
    l * 100,
  ];
}

function hslToRgb(h, s, l) {
  const hprim = h / 60;
  const sprim = s / 100;
  const lprim = l / 100;
  const c = (1 - Math.abs(2 * lprim - 1)) * sprim;
  const x = c * (1 - Math.abs((hprim % 2) - 1));
  const m = lprim - c / 2;
  const [rprim, gprim, bprim] = (() => {
    if (hprim < 1) return [c, x, 0];
    if (hprim < 2) return [x, c, 0];
    if (hprim < 3) return [0, c, x];
    if (hprim < 4) return [0, x, c];
    if (hprim < 5) return [x, 0, c];
    return [c, 0, x];
  })();

  return [
    (rprim + m) * 255,
    (gprim + m) * 255,
    (bprim + m) * 255,
  ];
}

class Color {
  constructor([r, g, b, a]) {
    this.values = [
      Math.max(Math.min(parseInt(r, 10), 255), 0),
      Math.max(Math.min(parseInt(g, 10), 255), 0),
      Math.max(Math.min(parseInt(b, 10), 255), 0),
      a == null ? 1 : Math.max(Math.min(parseFloat(a), 255), 0),
    ];
  }

  toRgbString() {
    const [r, g, b, a] = this.values;
    if (a === 1) {
      return `rgb(${r}, ${g}, ${b})`;
    }
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  toHslString() {
    const [h, s, l, a] = this.toHslaArray();
    if (a === 1) {
      return `hsl(${h}, ${s}%, ${l}%)`;
    }
    return `hsla(${h}, ${s}%, ${l}%, ${a})`;
  }

  toHexString() {
    let [r, g, b, a] = this.values;
    r = Number(r).toString(16).padStart(2, '0');
    g = Number(g).toString(16).padStart(2, '0');
    b = Number(b).toString(16).padStart(2, '0');
    a = a < 1 ? parseInt(a * 255, 10).toString(16).padStart(2, '0') : '';
    return `#${r}${g}${b}${a}`;
  }

  toRgbaArray() {
    return this.values;
  }

  toHslaArray() {
    const [r, g, b, a] = this.values;
    const [h, s, l] = rgbToHsl(r, g, b);
    return [h, s, l, a];
  }
}

export function fromRgba([r, g, b, a]) {
  return new Color([r, g, b, a]);
}

export function fromRgb([r, g, b]) {
  return fromRgba([r, g, b, 1]);
}

export function fromHsla([h, s, l, a]) {
  const [r, g, b] = hslToRgb(h, s, l);
  return fromRgba([r, g, b, a]);
}

export function fromHsl([h, s, l]) {
  return fromHsla([h, s, l, 1]);
}

function fromHexString(str) {
  let [, r, g, b, a] = hex.exec(str) || shortHex.exec(str);
  r = parseInt(r.length < 2 ? r.repeat(2) : r, 16);
  g = parseInt(g.length < 2 ? g.repeat(2) : g, 16);
  b = parseInt(b.length < 2 ? b.repeat(2) : b, 16);
  a = (a && (parseInt(a.length < 2 ? a.repeat(2) : a, 16) / 255).toPrecision(1)) || 1;
  return fromRgba([r, g, b, a]);
}

function fromRgbString(str) {
  let [, r, g, b, a] = rgb.exec(str) || rgbperc.exec(str) || rgbfn.exec(str) || rgbpercfn.exec(str);
  r = contains(r, '%') ? (parseInt(r, 10) * 255) / 100 : parseInt(r, 10);
  g = contains(g, '%') ? (parseInt(g, 10) * 255) / 100 : parseInt(g, 10);
  b = contains(b, '%') > 0 ? (parseInt(b, 10) * 255) / 100 : parseInt(b, 10);
  a = a === undefined ? 1 : parseFloat(a) / (contains(a, '%') ? 100 : 1);
  return fromRgba([r, g, b, a]);
}

function fromHslString(reg, str) {
  let [, h, unit, s, l, a] = reg.exec(str);
  unit = unit || 'deg';
  h = unitConverter(parseFloat(h), unit, 'deg');
  s = parseFloat(s);
  l = parseFloat(l);
  a = a === undefined ? 1 : parseFloat(a) / (contains(a, '%') ? 100 : 1);
  return fromHsla([h, s, l, a]);
}

export function fromString(str) {
  if (colorNames[str]) {
    return fromRgb(colorNames[str]);
  }

  if (hex.test(str) || shortHex.test(str)) {
    return fromHexString(str);
  }

  if (rgb.test(str) || rgbperc.test(str) || rgbfn.test(str) || rgbpercfn.test(str)) {
    return fromRgbString(str);
  }

  if (hsl.test(str)) {
    return fromHslString(hsl, str);
  }

  if (hslws.test(str)) {
    return fromHslString(hslws, str);
  }

  return null;
}

export default {
  fromString,
  fromRgb,
  fromRgba,
  fromHsl,
  fromHsla,
};
