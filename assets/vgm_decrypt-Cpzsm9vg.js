let B;
let __tla = (async () => {
  const v = "" + new URL("vgm_decrypt_bg-BjNUMhxt.wasm", import.meta.url).href, A = async (e = {}, n) => {
    let r;
    if (n.startsWith("data:")) {
      const o = n.replace(/^data:.*?base64,/, "");
      let a;
      if (typeof Buffer == "function" && typeof Buffer.from == "function") a = Buffer.from(o, "base64");
      else if (typeof atob == "function") {
        const s = atob(o);
        a = new Uint8Array(s.length);
        for (let t = 0; t < s.length; t++) a[t] = s.charCodeAt(t);
      } else throw new Error("Cannot decode base64-encoded data URL");
      r = await WebAssembly.instantiate(a, e);
    } else {
      const o = await fetch(n), a = o.headers.get("Content-Type") || "";
      if ("instantiateStreaming" in WebAssembly && a.startsWith("application/wasm")) r = await WebAssembly.instantiateStreaming(o, e);
      else {
        const s = await o.arrayBuffer();
        r = await WebAssembly.instantiate(s, e);
      }
    }
    return r.instance.exports;
  };
  URL = globalThis.URL;
  const f = await A({}, v), y = f.memory, T = f.decrypt, w = f.__wbindgen_add_to_stack_pointer, g = f.__wbindgen_malloc, U = f.__wbindgen_realloc, W = f.__wbindgen_free;
  let _ = null;
  function l() {
    return (_ === null || _.buffer !== y.buffer) && (_ = new Uint8Array(y.buffer)), _;
  }
  let u = 0;
  function x(e, n) {
    const r = n(e.length * 1);
    return l().set(e, r / 1), u = e.length, r;
  }
  const E = typeof TextEncoder > "u" ? (0, module.require)("util").TextEncoder : TextEncoder;
  let b = new E("utf-8");
  const M = typeof b.encodeInto == "function" ? function(e, n) {
    return b.encodeInto(e, n);
  } : function(e, n) {
    const r = b.encode(e);
    return n.set(r), {
      read: e.length,
      written: r.length
    };
  };
  function C(e, n, r) {
    if (r === void 0) {
      const i = b.encode(e), c = n(i.length);
      return l().subarray(c, c + i.length).set(i), u = i.length, c;
    }
    let o = e.length, a = n(o);
    const s = l();
    let t = 0;
    for (; t < o; t++) {
      const i = e.charCodeAt(t);
      if (i > 127) break;
      s[a + t] = i;
    }
    if (t !== o) {
      t !== 0 && (e = e.slice(t)), a = r(a, o, o = t + e.length * 3);
      const i = l().subarray(a + t, a + o), c = M(e, i);
      t += c.written;
    }
    return u = t, a;
  }
  let d = null;
  function h() {
    return (d === null || d.buffer !== y.buffer) && (d = new Int32Array(y.buffer)), d;
  }
  function S(e, n) {
    return l().subarray(e / 1, e / 1 + n);
  }
  B = function(e, n, r) {
    try {
      const m = w(-16);
      var o = x(e, g), a = u, s = C(n, g, U), t = u;
      T(m, o, a, s, t, r);
      var i = h()[m / 4 + 0], c = h()[m / 4 + 1], p = S(i, c).slice();
      return W(i, c * 1), p;
    } finally {
      w(16);
    }
  };
})();
export {
  __tla,
  B as decrypt
};
