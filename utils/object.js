export const get = (p, o) =>
  p.reduce((xs, x) => ((xs && xs[x]) ? xs[x] : null), o);

export const isEmptyObj = obj =>
  Object.keys(obj).length === 0;

export const pick = (keys, obj) => (
  keys.map(k => (obj[k] != null ? { [k]: obj[k] } : {}))
    .reduce((acc, o) => ({ ...acc, ...o }), {})
);

export const reject = (keys, obj) =>
  pick(Object.keys(obj).filter(k => !keys.includes(k)), obj);
