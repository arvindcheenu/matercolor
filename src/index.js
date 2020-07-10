import { keys, defaultOptions } from "./global.constants";
import { S, Ed, Y } from "./goldenPalettes.utils";
import { Kd, KdA, Ld, Md } from "./goldenPalettes";
import {
  rgbToHex,
  normalizeRGB,
  hexToRgba,
  RGBToCYMK,
  RGBToHSL,
  getContrastText
} from "./color.utils";

function Yd(a, b, accent) {
  var refPalletes = accent ? KdA : Kd;
  b = void 0 === b ? refPalletes : b;
  if (!b.length || !b[0].length) throw Error("Invalid golden palettes");
  for (var c = Infinity, d = b[0], e = -1, l = 0; l < b.length; l++)
    for (var h = 0; h < b[l].length && 0 < c; h++) {
      var g = b[l][h],
        f = (g.g + a.g) / 2,
        m = Math.sqrt(Math.pow(g.A, 2) + Math.pow(g.B, 2)),
        n = Math.sqrt(Math.pow(a.A, 2) + Math.pow(a.B, 2)),
        u = (m + n) / 2;
      u =
        0.5 *
        (1 - Math.sqrt(Math.pow(u, 7) / (Math.pow(u, 7) + Math.pow(25, 7))));
      var q = g.A * (1 + u),
        p = a.A * (1 + u),
        r = Math.sqrt(Math.pow(q, 2) + Math.pow(g.B, 2)),
        t = Math.sqrt(Math.pow(p, 2) + Math.pow(a.B, 2));
      u = t - r;
      var v = (r + t) / 2;
      q = Jd(g.B, q);
      p = Jd(a.B, p);
      r =
        2 *
        Math.sqrt(r * t) *
        Math.sin(
          (((1e-4 > Math.abs(m) || 1e-4 > Math.abs(n)
            ? 0
            : 180 >= Math.abs(p - q)
            ? p - q
            : p <= q
            ? p - q + 360
            : p - q - 360) /
            2) *
            Math.PI) /
            180
        );
      m =
        1e-4 > Math.abs(m) || 1e-4 > Math.abs(n)
          ? 0
          : 180 >= Math.abs(p - q)
          ? (q + p) / 2
          : 360 > q + p
          ? (q + p + 360) / 2
          : (q + p - 360) / 2;
      n = 1 + 0.045 * v;
      t =
        1 +
        0.015 *
          v *
          (1 -
            0.17 * Math.cos(((m - 30) * Math.PI) / 180) +
            0.24 * Math.cos((2 * m * Math.PI) / 180) +
            0.32 * Math.cos(((3 * m + 6) * Math.PI) / 180) -
            0.2 * Math.cos(((4 * m - 63) * Math.PI) / 180));
      g = Math.sqrt(
        Math.pow(
          (a.g - g.g) /
            (1 +
              (0.015 * Math.pow(f - 50, 2)) /
                Math.sqrt(20 + Math.pow(f - 50, 2))),
          2
        ) +
          Math.pow(u / (1 * n), 2) +
          Math.pow(r / (1 * t), 2) +
          (u / (1 * n)) *
            Math.sqrt(Math.pow(v, 7) / (Math.pow(v, 7) + Math.pow(25, 7))) *
            Math.sin(
              (60 * Math.exp(-Math.pow((m - 275) / 25, 2)) * Math.PI) / 180
            ) *
            -2 *
            (r / (1 * t))
      );
      // eslint-disable-next-line no-unused-expressions
      g < c && ((c = g), (d = b[l]), (e = h));
    }
  return {
    fd: d,
    ed: e
  };
}
var Jd = function(a, b) {
  if (1e-4 > Math.abs(a) && 1e-4 > Math.abs(b)) return 0;
  a = (180 * Math.atan2(a, b)) / Math.PI;
  return 0 <= a ? a : a + 360;
};
function createPallete(a, accent) {
  var b,
    refPalletes = accent ? KdA : Kd;
  var refColor = accent ? 2 : 5;
  b = void 0 === b ? refPalletes : b;
  var c = Ed(a),
    d = Yd(c, b, accent);
  b = d.fd;
  d = d.ed;
  var e = b[d],
    l = Gd(e),
    h = Gd(c),
    g = 30 > Gd(b[refColor]).T,
    f = l.g - h.g,
    m = l.T - h.T,
    n = l.hue - h.hue,
    u = Ld[d],
    q = Md[d],
    p = 100;
  return b.map(function(r, t) {
    if (r === e) return [(p = Math.max(h.g - 1.7, 0)), a];
    r = Gd(r);
    var v = r.g - (Ld[t] / u) * f;
    v = Math.min(v, p);
    t = new Fd(
      L(v, 0, 100),
      Math.max(0, g ? r.T - m : r.T - m * Math.min(Md[t] / q, 1.25)),
      (r.hue - n + 360) % 360
    );
    p = Math.max(t.g - 1.7, 0);
    r = (t.hue * Math.PI) / 180;
    t = new Y(t.g, t.T * Math.cos(r), t.T * Math.sin(r), t.alpha);
    var z = (t.g + 16) / 116;
    r = 0.95047 * Id(z + t.A / 500);
    v = 1 * Id(z);
    z = 1.08883 * Id(z - t.B / 200);
    return new U(
      L(Hd(3.2404542 * r + -1.5371385 * v + -0.4985314 * z), 0, 1),
      L(Hd(-0.969266 * r + 1.8760108 * v + 0.041556 * z), 0, 1),
      L(Hd(0.0556434 * r + -0.2040259 * v + 1.0572252 * z), 0, 1),
      t.alpha
    );
  });
}
var Gd = function(a) {
  return new Fd(
    a.g,
    Math.sqrt(Math.pow(a.A, 2) + Math.pow(a.B, 2)),
    ((180 * Math.atan2(a.B, a.A)) / Math.PI + 360) % 360,
    a.alpha
  );
};
class Fd {
  constructor(a, b, c, d) {
    d = void 0 === d ? 1 : d;
    this.g = a;
    this.T = b;
    this.hue = c;
    this.alpha = d;
    S(a, Number.MAX_VALUE, "lightness");
    S(b, Number.MAX_VALUE, "chroma");
    S(c, 360, "hue");
    S(d, 1, "alpha");
  }
}
function Hd(a) {
  return 0.0031308 >= a ? 12.92 * a : 1.055 * Math.pow(a, 1 / 2.4) - 0.055;
}
var L = function(a, b, c) {
  return Math.min(Math.max(a, b), c);
};

class U {
  constructor(a, b, c, d) {
    d = void 0 === d ? 1 : d;
    this.red = a;
    this.green = b;
    this.blue = c;
    this.alpha = d;
    S(a, 1, "red");
    S(b, 1, "green");
    S(c, 1, "blue");
    S(d, 1, "alpha");
  }
}

function Id(a) {
  var b = 6 / 29,
    c = 3 * Math.pow(b, 2);
  return a > b ? Math.pow(a, 3) : c * (a - 4 / 29);
}

export default class Matercolor {
  constructor(color, options) {
    this.color = color;
    this.options = options
      ? Object.assign(defaultOptions, options)
      : defaultOptions;
    let paletteObject = {};
    this.palette = function() {
      return paletteObject;
    };
    this.getPalette();
  }
  shades(paletteType) {
    return {
      light: this.palette()[paletteType][this.options.light],
      main: this.palette()[paletteType][this.options.main],
      dark: this.palette()[paletteType][this.options.dark]
    };
  }
  accents(paletteType) {
    return {
      A100: this.palette()[paletteType].A100,
      A200: this.palette()[paletteType].A200,
      A400: this.palette()[paletteType].A400,
      A700: this.palette()[paletteType].A700
    };
  }
  getPalette() {
    this.palette()["primary"] = {};
    let palette = createPallete(normalizeRGB(hexToRgba(this.color))).map(u => {
      return rgbToHex(
        Math.round(u.red * 255),
        Math.round(u.green * 255),
        Math.round(u.blue * 255)
      );
    });
    let accents = createPallete(normalizeRGB(hexToRgba(this.color)), true).map(
      u => {
        return rgbToHex(
          Math.round(u.red * 255),
          Math.round(u.green * 255),
          Math.round(u.blue * 255)
        );
      }
    );
    palette.push(...accents);
    for (let i = 0; i < keys.length; i++) {
      let colorObject = {};
      colorObject["hex"] = palette[i];
      colorObject["rgb"] = hexToRgba(palette[i]);
      colorObject["rgb"]["string"] = `rgb(${colorObject["rgb"].r},${
        colorObject["rgb"].g
      },${colorObject["rgb"].b})`;
      colorObject["hsl"] = RGBToHSL(colorObject["rgb"]);
      colorObject["cymk"] = RGBToCYMK(colorObject["rgb"]);
      colorObject["contrastText"] = getContrastText(
        colorObject["rgb"],
        this.options.threshold
      );
      this.palette()["primary"][keys[i]] = colorObject;
    }
  }
}