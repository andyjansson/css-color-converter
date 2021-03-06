import { deepStrictEqual, strictEqual } from 'assert';
import {
  fromString, fromRgb, fromRgba, fromHsl, fromHsla,
} from '../index.mjs';

deepStrictEqual(fromString('blue').toRgbaArray(), [0, 0, 255, 1]);
deepStrictEqual(fromString('blue').toHslaArray(), [240, 100, 50, 1]);
deepStrictEqual(fromString('blue').toHexString(), '#0000ff');
deepStrictEqual(fromString('rgb(255, 255, 255)').toRgbaArray(), [255, 255, 255, 1]);
deepStrictEqual(fromString('rgb(100%, 100%, 100%)').toRgbaArray(), [255, 255, 255, 1]);
deepStrictEqual(fromString('rgb(100%, 100%, 100%)').toHslaArray(), [0, 0, 100, 1]);
deepStrictEqual(fromString('rgba(100%, 100%, 100%, .5)').toHexString(), '#ffffff7f');
deepStrictEqual(fromString('rgba(255, 255, 255, .5)').toRgbaArray(), [255, 255, 255, 0.5]);
deepStrictEqual(fromString('rgba(255, 255, 255, .5)').toHslaArray(), [0, 0, 100, 0.5]);
deepStrictEqual(fromString('rgb(255 255 255)').toRgbaArray(), [255, 255, 255, 1]);
deepStrictEqual(fromString('rgb(100% 100% 100%)').toRgbaArray(), [255, 255, 255, 1]);
deepStrictEqual(fromString('rgb(100% 100% 100%)').toHslaArray(), [0, 0, 100, 1]);
deepStrictEqual(fromString('rgba(100% 100% 100% / .5)').toHexString(), '#ffffff7f');
deepStrictEqual(fromString('rgba(255 255 255 / .5)').toRgbaArray(), [255, 255, 255, 0.5]);
deepStrictEqual(fromString('rgba(255 255 255 / .5)').toHslaArray(), [0, 0, 100, 0.5]);
deepStrictEqual(fromString('rgba(0, 0, 0, 0)').toRgbaArray(), [0, 0, 0, 0]);
deepStrictEqual(fromString('rgba(3, 2, 1, 0)').toRgbaArray(), [3, 2, 1, 0]);
deepStrictEqual(fromString('hsl(0, 0%, 100%)').toHslaArray(), [0, 0, 100, 1]);
deepStrictEqual(fromString('hsl(0, 0%, 100%)').toRgbaArray(), [255, 255, 255, 1]);
deepStrictEqual(fromString('hsla(0, 0%, 100%, .5)').toHslaArray(), [0, 0, 100, 0.5]);
deepStrictEqual(fromString('hsla(0, 0%, 100%, .5)').toRgbaArray(), [255, 255, 255, 0.5]);
deepStrictEqual(fromString('#ffffff').toRgbaArray(), [255, 255, 255, 1]);
deepStrictEqual(fromString('#ffffff').toHslaArray(), [0, 0, 100, 1]);
deepStrictEqual(fromString('#ffffffff').toRgbaArray(), [255, 255, 255, 1]);
deepStrictEqual(fromString('#ffffffff').toHslaArray(), [0, 0, 100, 1]);
deepStrictEqual(fromString('#fff').toRgbaArray(), [255, 255, 255, 1]);
deepStrictEqual(fromString('#fff').toHslaArray(), [0, 0, 100, 1]);
deepStrictEqual(fromString('#ffff').toRgbaArray(), [255, 255, 255, 1]);
deepStrictEqual(fromString('#ffff').toHslaArray(), [0, 0, 100, 1]);
deepStrictEqual(fromString('#ffffff7f').toRgbaArray(), [255, 255, 255, 0.5]);
deepStrictEqual(fromString('#ffffff7f').toHslaArray(), [0, 0, 100, 0.5]);
deepStrictEqual(fromString('#ffffff').toHexString(), '#ffffff');
strictEqual(fromString('#ffffff').toRgbString(), 'rgb(255, 255, 255)');
strictEqual(fromString('#ffffff7f').toRgbString(), 'rgba(255, 255, 255, 0.5)');
strictEqual(fromString('#ffffff00').toRgbString(), 'rgba(255, 255, 255, 0)');
strictEqual(fromString('#fff0').toRgbString(), 'rgba(255, 255, 255, 0)');
strictEqual(fromString('#ffffff').toHslString(), 'hsl(0, 0%, 100%)');
strictEqual(fromString('#ffffff7f').toHslString(), 'hsla(0, 0%, 100%, 0.5)');
strictEqual(fromString('#ffffff').toHexString(), '#ffffff');
strictEqual(fromString('#ffffff7f').toHexString(), '#ffffff7f');
strictEqual(fromRgb([255, 255, 255]).toRgbString(), 'rgb(255, 255, 255)');
strictEqual(fromRgba([255, 255, 255, 1]).toRgbString(), 'rgb(255, 255, 255)');
strictEqual(fromRgba([255, 255, 255, 0.5]).toRgbString(), 'rgba(255, 255, 255, 0.5)');
strictEqual(fromRgba([255, 255, 255, 1]).toHslString(), 'hsl(0, 0%, 100%)');
strictEqual(fromRgba([255, 255, 255, 0.5]).toHslString(), 'hsla(0, 0%, 100%, 0.5)');
strictEqual(fromRgba([255, 255, 255, 1]).toHexString(), '#ffffff');
strictEqual(fromRgba([255, 255, 255, 0.5]).toHexString(), '#ffffff7f');
deepStrictEqual(fromRgba([0, 0, 0, 0]).toRgbaArray(), [0, 0, 0, 0]);
deepStrictEqual(fromRgba([3, 2, 1, 0]).toRgbaArray(), [3, 2, 1, 0]);
strictEqual(fromHsl([0, 0, 100]).toHslString(), 'hsl(0, 0%, 100%)');
strictEqual(fromHsla([0, 0, 100, 1]).toRgbString(), 'rgb(255, 255, 255)');
strictEqual(fromHsla([0, 0, 100, 0.5]).toRgbString(), 'rgba(255, 255, 255, 0.5)');
strictEqual(fromHsla([0, 0, 100, 1]).toHslString(), 'hsl(0, 0%, 100%)');
strictEqual(fromHsla([0, 0, 100, 0.5]).toHslString(), 'hsla(0, 0%, 100%, 0.5)');
strictEqual(fromHsla([0, 0, 100, 1]).toHexString(), '#ffffff');
strictEqual(fromHsla([0, 0, 100, 0.5]).toHexString(), '#ffffff7f');
strictEqual(fromString('nonsense'), null);
