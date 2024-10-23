var q = Object.defineProperty;
var P = (e, c, a) => c in e ? q(e, c, { enumerable: !0, configurable: !0, writable: !0, value: a }) : e[c] = a;
var x = (e, c, a) => P(e, typeof c != "symbol" ? c + "" : c, a);
var z = /\{[^{}]+\}/g, j = ({ allowReserved: e, name: c, value: a }) => {
  if (a == null) return "";
  if (typeof a == "object") throw new Error("Deeply-nested arrays/objects aren’t supported. Provide your own `querySerializer()` to handle these.");
  return `${c}=${e ? a : encodeURIComponent(a)}`;
}, E = (e) => {
  switch (e) {
    case "label":
      return ".";
    case "matrix":
      return ";";
    case "simple":
      return ",";
    default:
      return "&";
  }
}, _ = (e) => {
  switch (e) {
    case "form":
      return ",";
    case "pipeDelimited":
      return "|";
    case "spaceDelimited":
      return "%20";
    default:
      return ",";
  }
}, k = (e) => {
  switch (e) {
    case "label":
      return ".";
    case "matrix":
      return ";";
    case "simple":
      return ",";
    default:
      return "&";
  }
}, I = ({ allowReserved: e, explode: c, name: a, style: d, value: u }) => {
  if (!c) {
    let l = (e ? u : u.map((s) => encodeURIComponent(s))).join(_(d));
    switch (d) {
      case "label":
        return `.${l}`;
      case "matrix":
        return `;${a}=${l}`;
      case "simple":
        return l;
      default:
        return `${a}=${l}`;
    }
  }
  let n = E(d), t = u.map((l) => d === "label" || d === "simple" ? e ? l : encodeURIComponent(l) : j({ allowReserved: e, name: a, value: l })).join(n);
  return d === "label" || d === "matrix" ? n + t : t;
}, O = ({ allowReserved: e, explode: c, name: a, style: d, value: u }) => {
  if (u instanceof Date) return `${a}=${u.toISOString()}`;
  if (d !== "deepObject" && !c) {
    let l = [];
    Object.entries(u).forEach(([b, m]) => {
      l = [...l, b, e ? m : encodeURIComponent(m)];
    });
    let s = l.join(",");
    switch (d) {
      case "form":
        return `${a}=${s}`;
      case "label":
        return `.${s}`;
      case "matrix":
        return `;${a}=${s}`;
      default:
        return s;
    }
  }
  let n = k(d), t = Object.entries(u).map(([l, s]) => j({ allowReserved: e, name: d === "deepObject" ? `${a}[${l}]` : l, value: s })).join(n);
  return d === "label" || d === "matrix" ? n + t : t;
}, L = ({ path: e, url: c }) => {
  let a = c, d = c.match(z);
  if (d) for (let u of d) {
    let n = !1, t = u.substring(1, u.length - 1), l = "simple";
    t.endsWith("*") && (n = !0, t = t.substring(0, t.length - 1)), t.startsWith(".") ? (t = t.substring(1), l = "label") : t.startsWith(";") && (t = t.substring(1), l = "matrix");
    let s = e[t];
    if (s == null) continue;
    if (Array.isArray(s)) {
      a = a.replace(u, I({ explode: n, name: t, style: l, value: s }));
      continue;
    }
    if (typeof s == "object") {
      a = a.replace(u, O({ explode: n, name: t, style: l, value: s }));
      continue;
    }
    if (l === "matrix") {
      a = a.replace(u, `;${j({ name: t, value: s })}`);
      continue;
    }
    let b = encodeURIComponent(l === "label" ? `.${s}` : s);
    a = a.replace(u, b);
  }
  return a;
}, T = ({ allowReserved: e, array: c, object: a } = {}) => (d) => {
  let u = [];
  if (d && typeof d == "object") for (let n in d) {
    let t = d[n];
    if (t != null) {
      if (Array.isArray(t)) {
        u = [...u, I({ allowReserved: e, explode: !0, name: n, style: "form", value: t, ...c })];
        continue;
      }
      if (typeof t == "object") {
        u = [...u, O({ allowReserved: e, explode: !0, name: n, style: "deepObject", value: t, ...a })];
        continue;
      }
      u = [...u, j({ allowReserved: e, name: n, value: t })];
    }
  }
  return u.join("&");
}, W = (e) => {
  if (e) {
    if (e.startsWith("application/json") || e.endsWith("+json")) return "json";
    if (e === "multipart/form-data") return "formData";
    if (["application/", "audio/", "image/", "video/"].some((c) => e.startsWith(c))) return "blob";
    if (e.startsWith("text/")) return "text";
  }
}, B = ({ baseUrl: e, path: c, query: a, querySerializer: d, url: u }) => {
  let n = u.startsWith("/") ? u : `/${u}`, t = e + n;
  c && (t = L({ path: c, url: t }));
  let l = a ? d(a) : "";
  return l.startsWith("?") && (l = l.substring(1)), l && (t += `?${l}`), t;
}, A = (e, c) => {
  var d;
  let a = { ...e, ...c };
  return (d = a.baseUrl) != null && d.endsWith("/") && (a.baseUrl = a.baseUrl.substring(0, a.baseUrl.length - 1)), a.headers = $(e.headers, c.headers), a;
}, $ = (...e) => {
  let c = new Headers();
  for (let a of e) {
    if (!a || typeof a != "object") continue;
    let d = a instanceof Headers ? a.entries() : Object.entries(a);
    for (let [u, n] of d) if (n === null) c.delete(u);
    else if (Array.isArray(n)) for (let t of n) c.append(u, t);
    else n !== void 0 && c.set(u, typeof n == "object" ? JSON.stringify(n) : n);
  }
  return c;
}, C = class {
  constructor() {
    x(this, "_fns");
    this._fns = [];
  }
  clear() {
    this._fns = [];
  }
  exists(e) {
    return this._fns.indexOf(e) !== -1;
  }
  eject(e) {
    let c = this._fns.indexOf(e);
    c !== -1 && (this._fns = [...this._fns.slice(0, c), ...this._fns.slice(c + 1)]);
  }
  use(e) {
    this._fns = [...this._fns, e];
  }
}, N = () => ({ error: new C(), request: new C(), response: new C() }), U = (e, c, a) => {
  typeof a == "string" || a instanceof Blob ? e.append(c, a) : e.append(c, JSON.stringify(a));
}, v = { bodySerializer: (e) => {
  let c = new FormData();
  return Object.entries(e).forEach(([a, d]) => {
    d != null && (Array.isArray(d) ? d.forEach((u) => U(c, a, u)) : U(c, a, d));
  }), c;
} }, D = { bodySerializer: (e) => JSON.stringify(e) }, M = T({ allowReserved: !1, array: { explode: !0, style: "form" }, object: { explode: !0, style: "deepObject" } }), J = { "Content-Type": "application/json" }, S = (e = {}) => ({ ...D, baseUrl: "", fetch: globalThis.fetch, headers: J, parseAs: "auto", querySerializer: M, ...e }), H = (e = {}) => {
  let c = A(S(), e), a = () => ({ ...c }), d = (t) => (c = A(c, t), a()), u = N(), n = async (t) => {
    let l = { ...c, ...t, headers: $(c.headers, t.headers) };
    l.body && l.bodySerializer && (l.body = l.bodySerializer(l.body)), l.body || l.headers.delete("Content-Type");
    let s = B({ baseUrl: l.baseUrl ?? "", path: l.path, query: l.query, querySerializer: typeof l.querySerializer == "function" ? l.querySerializer : T(l.querySerializer), url: l.url }), b = { redirect: "follow", ...l }, m = new Request(s, b);
    for (let f of u.request._fns) m = await f(m, l);
    let R = l.fetch, h = await R(m);
    for (let f of u.response._fns) h = await f(h, m, l);
    let g = { request: m, response: h };
    if (h.ok) {
      if (h.status === 204 || h.headers.get("Content-Length") === "0") return { data: {}, ...g };
      if (l.parseAs === "stream") return { data: h.body, ...g };
      let f = (l.parseAs === "auto" ? W(h.headers.get("Content-Type")) : l.parseAs) ?? "json", w = await h[f]();
      return f === "json" && l.responseTransformer && (w = await l.responseTransformer(w)), { data: w, ...g };
    }
    let y = await h.text();
    try {
      y = JSON.parse(y);
    } catch {
    }
    let i = y;
    for (let f of u.error._fns) i = await f(y, h, m, l);
    if (i = i || {}, l.throwOnError) throw i;
    return { error: i, ...g };
  };
  return { connect: (t) => n({ ...t, method: "CONNECT" }), delete: (t) => n({ ...t, method: "DELETE" }), get: (t) => n({ ...t, method: "GET" }), getConfig: a, head: (t) => n({ ...t, method: "HEAD" }), interceptors: u, options: (t) => n({ ...t, method: "OPTIONS" }), patch: (t) => n({ ...t, method: "PATCH" }), post: (t) => n({ ...t, method: "POST" }), put: (t) => n({ ...t, method: "PUT" }), request: n, setConfig: d, trace: (t) => n({ ...t, method: "TRACE" }) };
};
const r = H(S()), G = (e) => ((e == null ? void 0 : e.client) ?? r).get({
  ...e,
  url: "/api/config"
}), K = (e) => ((e == null ? void 0 : e.client) ?? r).post({
  ...e,
  url: "/api/access-tokens"
}), Q = (e) => ((e == null ? void 0 : e.client) ?? r).post({
  ...e,
  url: "/api/access-tokens/exchange-using-oidc"
}), V = (e) => ((e == null ? void 0 : e.client) ?? r).delete({
  ...e,
  url: "/api/access-tokens/me"
}), X = (e) => ((e == null ? void 0 : e.client) ?? r).get({
  ...e,
  url: "/api/users"
}), Y = (e) => ((e == null ? void 0 : e.client) ?? r).post({
  ...e,
  url: "/api/users"
}), Z = (e) => ((e == null ? void 0 : e.client) ?? r).get({
  ...e,
  url: "/api/users/{id}"
}), p = (e) => ((e == null ? void 0 : e.client) ?? r).patch({
  ...e,
  url: "/api/users/{id}"
}), o = (e) => ((e == null ? void 0 : e.client) ?? r).patch({
  ...e,
  url: "/api/users/{id}/email"
}), ee = (e) => ((e == null ? void 0 : e.client) ?? r).patch({
  ...e,
  url: "/api/users/{id}/password"
}), re = (e) => ((e == null ? void 0 : e.client) ?? r).patch({
  ...e,
  url: "/api/users/{id}/username"
}), ae = (e) => ((e == null ? void 0 : e.client) ?? r).post({
  ...v,
  ...e,
  headers: {
    "Content-Type": null
  },
  url: "/api/users/{id}/avatar"
}), te = (e) => ((e == null ? void 0 : e.client) ?? r).delete({
  ...e,
  url: "/api/users/{id}"
}), le = (e) => ((e == null ? void 0 : e.client) ?? r).get({
  ...e,
  url: "/api/projects"
}), ce = (e) => ((e == null ? void 0 : e.client) ?? r).post({
  ...e,
  url: "/api/projects"
}), ue = (e) => ((e == null ? void 0 : e.client) ?? r).get({
  ...e,
  url: "/api/projects/{id}"
}), de = (e) => ((e == null ? void 0 : e.client) ?? r).patch({
  ...e,
  url: "/api/projects/{id}"
}), ne = (e) => ((e == null ? void 0 : e.client) ?? r).post({
  ...v,
  ...e,
  headers: {
    "Content-Type": null
  },
  url: "/api/projects/{id}/background-image"
}), se = (e) => ((e == null ? void 0 : e.client) ?? r).delete({
  ...e,
  url: "/api/projects/{id}"
}), he = (e) => ((e == null ? void 0 : e.client) ?? r).post({
  ...e,
  url: "/api/projects/{projectId}/managers"
}), me = (e) => ((e == null ? void 0 : e.client) ?? r).delete({
  ...e,
  url: "/api/project-managers/{id}"
}), fe = (e) => ((e == null ? void 0 : e.client) ?? r).post({
  ...e,
  url: "/api/projects/{projectId}/boards"
}), be = (e) => ((e == null ? void 0 : e.client) ?? r).get({
  ...e,
  url: "/api/boards/{id}"
}), ie = (e) => ((e == null ? void 0 : e.client) ?? r).patch({
  ...e,
  url: "/api/boards/{id}"
}), ge = (e) => ((e == null ? void 0 : e.client) ?? r).delete({
  ...e,
  url: "/api/boards/{id}"
}), ye = (e) => ((e == null ? void 0 : e.client) ?? r).post({
  ...e,
  url: "/api/boards/{boardId}/memberships"
}), je = (e) => ((e == null ? void 0 : e.client) ?? r).patch({
  ...e,
  url: "/api/board-memberships/{id}"
}), we = (e) => ((e == null ? void 0 : e.client) ?? r).delete(
  {
    ...e,
    url: "/api/board-memberships/{id}"
  }
), Ce = (e) => ((e == null ? void 0 : e.client) ?? r).post({
  ...e,
  url: "/api/boards/{boardId}/labels"
}), ve = (e) => ((e == null ? void 0 : e.client) ?? r).patch({
  ...e,
  url: "/api/labels/{id}"
}), xe = (e) => ((e == null ? void 0 : e.client) ?? r).delete({
  ...e,
  url: "/api/labels/{id}"
}), Ae = (e) => ((e == null ? void 0 : e.client) ?? r).post({
  ...e,
  url: "/api/boards/{boardId}/lists"
}), Ue = (e) => ((e == null ? void 0 : e.client) ?? r).patch({
  ...e,
  url: "/api/lists/{id}"
}), Ie = (e) => ((e == null ? void 0 : e.client) ?? r).post({
  ...e,
  url: "/api/lists/{id}/sort"
}), Oe = (e) => ((e == null ? void 0 : e.client) ?? r).delete({
  ...e,
  url: "/api/lists/{id}"
}), Te = (e) => ((e == null ? void 0 : e.client) ?? r).post({
  ...e,
  url: "/api/lists/{listId}/cards"
}), $e = (e) => ((e == null ? void 0 : e.client) ?? r).get({
  ...e,
  url: "/api/cards/{id}"
}), Se = (e) => ((e == null ? void 0 : e.client) ?? r).patch({
  ...e,
  url: "/api/cards/{id}"
}), Re = (e) => ((e == null ? void 0 : e.client) ?? r).post({
  ...e,
  url: "/api/cards/{id}/duplicate"
}), qe = (e) => ((e == null ? void 0 : e.client) ?? r).delete({
  ...e,
  url: "/api/cards/{id}"
}), Pe = (e) => ((e == null ? void 0 : e.client) ?? r).post({
  ...e,
  url: "/api/cards/{cardId}/memberships"
}), ze = (e) => ((e == null ? void 0 : e.client) ?? r).delete({
  ...e,
  url: "/api/cards/{cardId}/memberships"
}), Ee = (e) => ((e == null ? void 0 : e.client) ?? r).post({
  ...e,
  url: "/api/cards/{cardId}/labels"
}), _e = (e) => ((e == null ? void 0 : e.client) ?? r).delete({
  ...e,
  url: "/api/cards/{cardId}/labels/{labelId}"
}), ke = (e) => ((e == null ? void 0 : e.client) ?? r).post({
  ...e,
  url: "/api/cards/{cardId}/tasks"
}), Le = (e) => ((e == null ? void 0 : e.client) ?? r).patch({
  ...e,
  url: "/api/tasks/{id}"
}), We = (e) => ((e == null ? void 0 : e.client) ?? r).delete({
  ...e,
  url: "/api/tasks/{id}"
}), Be = (e) => ((e == null ? void 0 : e.client) ?? r).post({
  ...v,
  ...e,
  headers: {
    "Content-Type": null
  },
  url: "/api/cards/{cardId}/attachments"
}), Ne = (e) => ((e == null ? void 0 : e.client) ?? r).patch({
  ...e,
  url: "/api/attachments/{id}"
}), De = (e) => ((e == null ? void 0 : e.client) ?? r).delete({
  ...e,
  url: "/api/attachments/{id}"
}), Me = (e) => ((e == null ? void 0 : e.client) ?? r).get({
  ...e,
  url: "/attachments/{id}/download/{filename}"
}), Je = (e) => ((e == null ? void 0 : e.client) ?? r).get({
  ...e,
  url: "/attachments/{id}/download/thumbnails/cover-256.{extension}"
}), He = (e) => ((e == null ? void 0 : e.client) ?? r).get({
  ...e,
  url: "/api/cards/{cardId}/actions"
}), Fe = (e) => ((e == null ? void 0 : e.client) ?? r).post({
  ...e,
  url: "/api/cards/{cardId}/comment-actions"
}), Ge = (e) => ((e == null ? void 0 : e.client) ?? r).patch({
  ...e,
  url: "/api/comment-actions/{id}"
}), Ke = (e) => ((e == null ? void 0 : e.client) ?? r).delete({
  ...e,
  url: "/api/comment-actions/{id}"
}), Qe = (e) => ((e == null ? void 0 : e.client) ?? r).get({
  ...e,
  url: "/api/notifications"
}), Ve = (e) => ((e == null ? void 0 : e.client) ?? r).get({
  ...e,
  url: "/api/notifications/{id}"
}), Xe = (e) => ((e == null ? void 0 : e.client) ?? r).patch({
  ...e,
  url: "/api/notifications/{ids}"
});
export {
  K as authorize,
  Q as authorizeOidc,
  r as client,
  Be as createAttachment,
  fe as createBoard,
  ye as createBoardMembership,
  Te as createCard,
  Ee as createCardLabel,
  Pe as createCardMembership,
  Fe as createCommentAction,
  Ce as createLabel,
  Ae as createList,
  ce as createProject,
  he as createProjectManager,
  ke as createTask,
  Y as createUser,
  De as deleteAttachment,
  ge as deleteBoard,
  we as deleteBoardMembership,
  qe as deleteCard,
  _e as deleteCardLabel,
  ze as deleteCardMembership,
  Ke as deleteCommentAction,
  xe as deleteLabel,
  Oe as deleteList,
  se as deleteProject,
  me as deleteProjectManager,
  We as deleteTask,
  te as deleteUser,
  Re as duplicateCard,
  Me as getAttachment,
  Je as getAttachmentThumbnail,
  be as getBoard,
  $e as getCard,
  He as getCardActions,
  G as getConfig,
  Ve as getNotification,
  Qe as getNotifications,
  ue as getProject,
  le as getProjects,
  Z as getUser,
  X as getUsers,
  Ie as sortList,
  V as unauthorize,
  Ne as updateAttachment,
  ie as updateBoard,
  je as updateBoardMembership,
  Se as updateCard,
  Ge as updateCommentAction,
  ve as updateLabel,
  Ue as updateList,
  Xe as updateNotifications,
  de as updateProject,
  ne as updateProjectBackgroundImage,
  Le as updateTask,
  p as updateUser,
  ae as updateUserAvatar,
  o as updateUserEmail,
  ee as updateUserPassword,
  re as updateUserUsername
};
