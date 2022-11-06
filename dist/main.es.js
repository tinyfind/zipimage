async function y(t, e = 1) {
  const n = g(t), o = await d(n, e, s(t.type));
  w(n);
  const c = u(o), a = m(c), r = b(a);
  return t.size > r.size ? new File([r], t.name, { type: t.type }) : t;
}
function s(t) {
  return t == "image/png" ? "image/webp" : "image/jpeg";
}
function u(t) {
  const [e, n] = t.split(",");
  return window.atob(n);
}
function m(t) {
  return new Uint8Array(Array.from(t).map((e) => e.charCodeAt(0)));
}
function b(t) {
  return new Blob([t]);
}
function w(t) {
  window.URL.revokeObjectURL(t);
}
function g(t) {
  return window.URL.createObjectURL(t);
}
async function d(t, e = 1, n) {
  const o = document.createElement("canvas"), c = o.getContext("2d"), a = await p(t), { width: r, height: i } = a;
  o.width = r, o.height = i, c.drawImage(a, 0, 0, r, i);
  try {
    return o.toDataURL(n, e);
  } finally {
    o.remove();
  }
}
function p(t) {
  return new Promise((e) => {
    const n = document.createElement("img");
    n.src = t, n.onload = () => {
      e(n), n.remove();
    };
  });
}
export {
  y as default
};
