var S = Object.defineProperty;
var E = (e, c, r) => c in e ? S(e, c, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[c] = r;
var I = (e, c, r) => E(e, typeof c != "symbol" ? c + "" : c, r);
var q = /\{[^{}]+\}/g, j = ({ allowReserved: e, name: c, value: r }) => {
  if (r == null) return "";
  if (typeof r == "object") throw new Error("Deeply-nested arrays/objects aren’t supported. Provide your own `querySerializer()` to handle these.");
  return `${c}=${e ? r : encodeURIComponent(r)}`;
}, N = (e) => {
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
}, P = (e) => {
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
}, z = (e) => {
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
}, U = ({ allowReserved: e, explode: c, name: r, style: d, value: u }) => {
  if (!c) {
    let l = (e ? u : u.map((n) => encodeURIComponent(n))).join(P(d));
    switch (d) {
      case "label":
        return `.${l}`;
      case "matrix":
        return `;${r}=${l}`;
      case "simple":
        return l;
      default:
        return `${r}=${l}`;
    }
  }
  let s = N(d), a = u.map((l) => d === "label" || d === "simple" ? e ? l : encodeURIComponent(l) : j({ allowReserved: e, name: r, value: l })).join(s);
  return d === "label" || d === "matrix" ? s + a : a;
}, O = ({ allowReserved: e, explode: c, name: r, style: d, value: u }) => {
  if (u instanceof Date) return `${r}=${u.toISOString()}`;
  if (d !== "deepObject" && !c) {
    let l = [];
    Object.entries(u).forEach(([b, h]) => {
      l = [...l, b, e ? h : encodeURIComponent(h)];
    });
    let n = l.join(",");
    switch (d) {
      case "form":
        return `${r}=${n}`;
      case "label":
        return `.${n}`;
      case "matrix":
        return `;${r}=${n}`;
      default:
        return n;
    }
  }
  let s = z(d), a = Object.entries(u).map(([l, n]) => j({ allowReserved: e, name: d === "deepObject" ? `${r}[${l}]` : l, value: n })).join(s);
  return d === "label" || d === "matrix" ? s + a : a;
}, k = ({ path: e, url: c }) => {
  let r = c, d = c.match(q);
  if (d) for (let u of d) {
    let s = !1, a = u.substring(1, u.length - 1), l = "simple";
    a.endsWith("*") && (s = !0, a = a.substring(0, a.length - 1)), a.startsWith(".") ? (a = a.substring(1), l = "label") : a.startsWith(";") && (a = a.substring(1), l = "matrix");
    let n = e[a];
    if (n == null) continue;
    if (Array.isArray(n)) {
      r = r.replace(u, U({ explode: s, name: a, style: l, value: n }));
      continue;
    }
    if (typeof n == "object") {
      r = r.replace(u, O({ explode: s, name: a, style: l, value: n }));
      continue;
    }
    if (l === "matrix") {
      r = r.replace(u, `;${j({ name: a, value: n })}`);
      continue;
    }
    let b = encodeURIComponent(l === "label" ? `.${n}` : n);
    r = r.replace(u, b);
  }
  return r;
}, x = ({ allowReserved: e, array: c, object: r } = {}) => (d) => {
  let u = [];
  if (d && typeof d == "object") for (let s in d) {
    let a = d[s];
    if (a != null) {
      if (Array.isArray(a)) {
        u = [...u, U({ allowReserved: e, explode: !0, name: s, style: "form", value: a, ...c })];
        continue;
      }
      if (typeof a == "object") {
        u = [...u, O({ allowReserved: e, explode: !0, name: s, style: "deepObject", value: a, ...r })];
        continue;
      }
      u = [...u, j({ allowReserved: e, name: s, value: a })];
    }
  }
  return u.join("&");
}, L = (e) => {
  if (e) {
    if (e.startsWith("application/json") || e.endsWith("+json")) return "json";
    if (e === "multipart/form-data") return "formData";
    if (["application/", "audio/", "image/", "video/"].some((c) => e.startsWith(c))) return "blob";
    if (e.startsWith("text/")) return "text";
  }
}, D = ({ baseUrl: e, path: c, query: r, querySerializer: d, url: u }) => {
  let s = u.startsWith("/") ? u : `/${u}`, a = e + s;
  c && (a = k({ path: c, url: a }));
  let l = r ? d(r) : "";
  return l.startsWith("?") && (l = l.substring(1)), l && (a += `?${l}`), a;
}, v = (e, c) => {
  var d;
  let r = { ...e, ...c };
  return (d = r.baseUrl) != null && d.endsWith("/") && (r.baseUrl = r.baseUrl.substring(0, r.baseUrl.length - 1)), r.headers = T(e.headers, c.headers), r;
}, T = (...e) => {
  let c = new Headers();
  for (let r of e) {
    if (!r || typeof r != "object") continue;
    let d = r instanceof Headers ? r.entries() : Object.entries(r);
    for (let [u, s] of d) if (s === null) c.delete(u);
    else if (Array.isArray(s)) for (let a of s) c.append(u, a);
    else s !== void 0 && c.set(u, typeof s == "object" ? JSON.stringify(s) : s);
  }
  return c;
}, C = class {
  constructor() {
    I(this, "_fns");
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
}, W = () => ({ error: new C(), request: new C(), response: new C() }), A = (e, c, r) => {
  typeof r == "string" || r instanceof Blob ? e.append(c, r) : e.append(c, JSON.stringify(r));
}, _ = { bodySerializer: (e) => {
  let c = new FormData();
  return Object.entries(e).forEach(([r, d]) => {
    d != null && (Array.isArray(d) ? d.forEach((u) => A(c, r, u)) : A(c, r, d));
  }), c;
} }, B = { bodySerializer: (e) => JSON.stringify(e) }, M = x({ allowReserved: !1, array: { explode: !0, style: "form" }, object: { explode: !0, style: "deepObject" } }), H = { "Content-Type": "application/json" }, R = (e = {}) => ({ ...B, baseUrl: "", fetch: globalThis.fetch, headers: H, parseAs: "auto", querySerializer: M, ...e }), J = (e = {}) => {
  let c = v(R(), e), r = () => ({ ...c }), d = (a) => (c = v(c, a), r()), u = W(), s = async (a) => {
    let l = { ...c, ...a, headers: T(c.headers, a.headers) };
    l.body && l.bodySerializer && (l.body = l.bodySerializer(l.body)), l.body || l.headers.delete("Content-Type");
    let n = D({ baseUrl: l.baseUrl ?? "", path: l.path, query: l.query, querySerializer: typeof l.querySerializer == "function" ? l.querySerializer : x(l.querySerializer), url: l.url }), b = { redirect: "follow", ...l }, h = new Request(n, b);
    for (let m of u.request._fns) h = await m(h, l);
    let $ = l.fetch, f = await $(h);
    for (let m of u.response._fns) f = await m(f, h, l);
    let y = { request: h, response: f };
    if (f.ok) {
      if (f.status === 204 || f.headers.get("Content-Length") === "0") return { data: {}, ...y };
      if (l.parseAs === "stream") return { data: f.body, ...y };
      let m = (l.parseAs === "auto" ? L(f.headers.get("Content-Type")) : l.parseAs) ?? "json", w = await f[m]();
      return m === "json" && l.responseTransformer && (w = await l.responseTransformer(w)), { data: w, ...y };
    }
    let g = await f.text();
    try {
      g = JSON.parse(g);
    } catch {
    }
    let i = g;
    for (let m of u.error._fns) i = await m(g, f, h, l);
    if (i = i || {}, l.throwOnError) throw i;
    return { error: i, ...y };
  };
  return { connect: (a) => s({ ...a, method: "CONNECT" }), delete: (a) => s({ ...a, method: "DELETE" }), get: (a) => s({ ...a, method: "GET" }), getConfig: r, head: (a) => s({ ...a, method: "HEAD" }), interceptors: u, options: (a) => s({ ...a, method: "OPTIONS" }), patch: (a) => s({ ...a, method: "PATCH" }), post: (a) => s({ ...a, method: "POST" }), put: (a) => s({ ...a, method: "PUT" }), request: s, setConfig: d, trace: (a) => s({ ...a, method: "TRACE" }) };
};
const t = J(R()), V = (e) => ((e == null ? void 0 : e.client) ?? t).get({
  ...e,
  url: "/api/config"
}), Z = (e) => ((e == null ? void 0 : e.client) ?? t).post({
  ...e,
  url: "/api/access-tokens"
}), K = (e) => ((e == null ? void 0 : e.client) ?? t).post({
  ...e,
  url: "/api/access-tokens/exchange-using-oidc"
}), Q = (e) => ((e == null ? void 0 : e.client) ?? t).delete({
  ...e,
  url: "/api/access-tokens/me"
}), X = (e) => ((e == null ? void 0 : e.client) ?? t).get({
  ...e,
  url: "/api/users"
}), Y = (e) => ((e == null ? void 0 : e.client) ?? t).post({
  ...e,
  url: "/api/users"
}), p = (e) => ((e == null ? void 0 : e.client) ?? t).get({
  ...e,
  url: "/api/users/{id}"
}), o = (e) => ((e == null ? void 0 : e.client) ?? t).patch({
  ...e,
  url: "/api/users/{id}"
}), ee = (e) => ((e == null ? void 0 : e.client) ?? t).patch({
  ...e,
  url: "/api/users/{id}/email"
}), re = (e) => ((e == null ? void 0 : e.client) ?? t).patch({
  ...e,
  url: "/api/users/{id}/password"
}), ae = (e) => ((e == null ? void 0 : e.client) ?? t).patch({
  ...e,
  url: "/api/users/{id}/username"
}), te = (e) => ((e == null ? void 0 : e.client) ?? t).post({
  ..._,
  ...e,
  headers: {
    "Content-Type": null
  },
  url: "/api/users/{id}/avatar"
}), le = (e) => ((e == null ? void 0 : e.client) ?? t).delete({
  ...e,
  url: "/api/users/{id}"
}), ce = (e) => ((e == null ? void 0 : e.client) ?? t).get({
  ...e,
  url: "/api/projects"
}), ue = (e) => ((e == null ? void 0 : e.client) ?? t).post({
  ...e,
  url: "/api/projects"
}), de = (e) => ((e == null ? void 0 : e.client) ?? t).get({
  ...e,
  url: "/api/projects/{id}"
}), se = (e) => ((e == null ? void 0 : e.client) ?? t).patch(
  {
    ...e,
    url: "/api/projects/{id}"
  }
), ne = (e) => ((e == null ? void 0 : e.client) ?? t).post({
  ..._,
  ...e,
  headers: {
    "Content-Type": null
  },
  url: "/api/projects/{id}/background-image"
}), fe = (e) => ((e == null ? void 0 : e.client) ?? t).delete({
  ...e,
  url: "/api/projects/{id}"
}), he = (e) => ((e == null ? void 0 : e.client) ?? t).post({
  ...e,
  url: "/api/projects/{projectId}/managers"
}), me = (e) => ((e == null ? void 0 : e.client) ?? t).delete({
  ...e,
  url: "/api/project-managers/{id}"
}), be = (e) => ((e == null ? void 0 : e.client) ?? t).post({
  ...e,
  url: "/api/projects/{projectId}/boards"
}), ie = (e) => ((e == null ? void 0 : e.client) ?? t).get({
  ...e,
  url: "/api/boards/{id}"
}), ye = (e) => ((e == null ? void 0 : e.client) ?? t).patch({
  ...e,
  url: "/api/boards/{id}"
}), ge = (e) => ((e == null ? void 0 : e.client) ?? t).delete({
  ...e,
  url: "/api/boards/{id}"
}), je = (e) => ((e == null ? void 0 : e.client) ?? t).post({
  ...e,
  url: "/api/boards/{boardId}/memberships"
}), we = (e) => ((e == null ? void 0 : e.client) ?? t).patch({
  ...e,
  url: "/api/board-memberships/{id}"
}), Ce = (e) => ((e == null ? void 0 : e.client) ?? t).delete({
  ...e,
  url: "/api/board-memberships/{id}"
}), Ie = (e) => ((e == null ? void 0 : e.client) ?? t).post({
  ...e,
  url: "/api/boards/{boardId}/labels"
}), ve = (e) => ((e == null ? void 0 : e.client) ?? t).patch({
  ...e,
  url: "/api/labels/{id}"
}), Ae = (e) => ((e == null ? void 0 : e.client) ?? t).delete({
  ...e,
  url: "/api/labels/{id}"
}), Ue = (e) => ((e == null ? void 0 : e.client) ?? t).post({
  ...e,
  url: "/api/boards/{boardId}/lists"
}), Oe = (e) => ((e == null ? void 0 : e.client) ?? t).patch({
  ...e,
  url: "/api/lists/{id}"
}), xe = (e) => ((e == null ? void 0 : e.client) ?? t).post({
  ...e,
  url: "/api/lists/{id}/sort"
}), Te = (e) => ((e == null ? void 0 : e.client) ?? t).delete({
  ...e,
  url: "/api/lists/{id}"
}), _e = (e) => ((e == null ? void 0 : e.client) ?? t).post({
  ...e,
  url: "/api/lists/{listId}/cards"
}), Re = (e) => ((e == null ? void 0 : e.client) ?? t).get({
  ...e,
  url: "/api/cards/{id}"
}), $e = (e) => ((e == null ? void 0 : e.client) ?? t).patch({
  ...e,
  url: "/api/cards/{id}"
}), Se = (e) => ((e == null ? void 0 : e.client) ?? t).post({
  ...e,
  url: "/api/cards/{id}/duplicate"
}), Ee = (e) => ((e == null ? void 0 : e.client) ?? t).delete({
  ...e,
  url: "/api/cards/{id}"
}), qe = (e) => ((e == null ? void 0 : e.client) ?? t).post({
  ...e,
  url: "/api/cards/{cardId}/memberships"
}), Ne = (e) => ((e == null ? void 0 : e.client) ?? t).delete({
  ...e,
  url: "/api/cards/{cardId}/memberships"
}), Pe = (e) => ((e == null ? void 0 : e.client) ?? t).post({
  ...e,
  url: "/api/cards/{cardId}/labels"
}), ze = (e) => ((e == null ? void 0 : e.client) ?? t).delete({
  ...e,
  url: "/api/cards/{cardId}/labels/{labelId}"
}), ke = (e) => ((e == null ? void 0 : e.client) ?? t).post({
  ...e,
  url: "/api/cards/{cardId}/tasks"
}), Le = (e) => ((e == null ? void 0 : e.client) ?? t).patch({
  ...e,
  url: "/api/tasks/{id}"
}), De = (e) => ((e == null ? void 0 : e.client) ?? t).delete({
  ...e,
  url: "/api/tasks/{id}"
}), We = (e) => ((e == null ? void 0 : e.client) ?? t).post({
  ...e,
  url: "/api/cards/{cardId}/attachments"
}), Be = (e) => ((e == null ? void 0 : e.client) ?? t).patch({
  ...e,
  url: "/api/attachments/{id}"
}), Me = (e) => ((e == null ? void 0 : e.client) ?? t).delete({
  ...e,
  url: "/api/attachments/{id}"
}), He = (e) => ((e == null ? void 0 : e.client) ?? t).get(
  {
    ...e,
    url: "/api/cards/{cardId}/actions"
  }
), Je = (e) => ((e == null ? void 0 : e.client) ?? t).post({
  ...e,
  url: "/api/cards/{cardId}/comment-actions"
}), Fe = (e) => ((e == null ? void 0 : e.client) ?? t).patch({
  ...e,
  url: "/api/comment-actions/{id}"
}), Ge = (e) => ((e == null ? void 0 : e.client) ?? t).delete({
  ...e,
  url: "/api/comment-actions/{id}"
}), Ve = (e) => ((e == null ? void 0 : e.client) ?? t).get({
  ...e,
  url: "/api/notifications"
}), Ze = (e) => ((e == null ? void 0 : e.client) ?? t).get({
  ...e,
  url: "/api/notifications/{id}"
}), Ke = (e) => ((e == null ? void 0 : e.client) ?? t).patch({
  ...e,
  url: "/api/notifications/{ids}"
});
var F = /* @__PURE__ */ ((e) => (e.s400 = "E_MISSING_OR_INVALID_PARAMS", e.s401 = "E_UNAUTHORIZED", e.s404 = "E_NOT_FOUND", e.s409 = "E_CONFLICT", e))(F || {});
export {
  F as StatusCode,
  Z as authorize,
  K as authorizeOidc,
  t as client,
  We as createAttachment,
  be as createBoard,
  je as createBoardMembership,
  _e as createCard,
  Pe as createCardLabel,
  qe as createCardMembership,
  Je as createCommentAction,
  Ie as createLabel,
  Ue as createList,
  ue as createProject,
  he as createProjectManager,
  ke as createTask,
  Y as createUser,
  Me as deleteAttachment,
  ge as deleteBoard,
  Ce as deleteBoardMembership,
  Ee as deleteCard,
  ze as deleteCardLabel,
  Ne as deleteCardMembership,
  Ge as deleteCommentAction,
  Ae as deleteLabel,
  Te as deleteList,
  fe as deleteProject,
  me as deleteProjectManager,
  De as deleteTask,
  le as deleteUser,
  Se as duplicateCard,
  ie as getBoard,
  Re as getCard,
  He as getCardActions,
  V as getConfig,
  Ze as getNotification,
  Ve as getNotifications,
  de as getProject,
  ce as getProjects,
  p as getUser,
  X as getUsers,
  xe as sortList,
  Q as unauthorize,
  Be as updateAttachment,
  ye as updateBoard,
  we as updateBoardMembership,
  $e as updateCard,
  Fe as updateCommentAction,
  ve as updateLabel,
  Oe as updateList,
  Ke as updateNotifications,
  se as updateProject,
  ne as updateProjectBackgroundImage,
  Le as updateTask,
  o as updateUser,
  te as updateUserAvatar,
  ee as updateUserEmail,
  re as updateUserPassword,
  ae as updateUserUsername
};
