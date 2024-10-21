var T = Object.defineProperty;
var q = (e, c, l) => c in e ? T(e, c, { enumerable: !0, configurable: !0, writable: !0, value: l }) : e[c] = l;
var C = (e, c, l) => q(e, typeof c != "symbol" ? c + "" : c, l);
var P = /\{[^{}]+\}/g, j = ({ allowReserved: e, name: c, value: l }) => {
  if (l == null) return "";
  if (typeof l == "object") throw new Error("Deeply-nested arrays/objects aren’t supported. Provide your own `querySerializer()` to handle these.");
  return `${c}=${e ? l : encodeURIComponent(l)}`;
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
}, S = (e) => {
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
}, _ = (e) => {
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
}, x = ({ allowReserved: e, explode: c, name: l, style: s, value: u }) => {
  if (!c) {
    let t = (e ? u : u.map((f) => encodeURIComponent(f))).join(S(s));
    switch (s) {
      case "label":
        return `.${t}`;
      case "matrix":
        return `;${l}=${t}`;
      case "simple":
        return t;
      default:
        return `${l}=${t}`;
    }
  }
  let d = z(s), r = u.map((t) => s === "label" || s === "simple" ? e ? t : encodeURIComponent(t) : j({ allowReserved: e, name: l, value: t })).join(d);
  return s === "label" || s === "matrix" ? d + r : r;
}, I = ({ allowReserved: e, explode: c, name: l, style: s, value: u }) => {
  if (u instanceof Date) return `${l}=${u.toISOString()}`;
  if (s !== "deepObject" && !c) {
    let t = [];
    Object.entries(u).forEach(([h, n]) => {
      t = [...t, h, e ? n : encodeURIComponent(n)];
    });
    let f = t.join(",");
    switch (s) {
      case "form":
        return `${l}=${f}`;
      case "label":
        return `.${f}`;
      case "matrix":
        return `;${l}=${f}`;
      default:
        return f;
    }
  }
  let d = _(s), r = Object.entries(u).map(([t, f]) => j({ allowReserved: e, name: s === "deepObject" ? `${l}[${t}]` : t, value: f })).join(d);
  return s === "label" || s === "matrix" ? d + r : r;
}, k = ({ path: e, url: c }) => {
  let l = c, s = c.match(P);
  if (s) for (let u of s) {
    let d = !1, r = u.substring(1, u.length - 1), t = "simple";
    r.endsWith("*") && (d = !0, r = r.substring(0, r.length - 1)), r.startsWith(".") ? (r = r.substring(1), t = "label") : r.startsWith(";") && (r = r.substring(1), t = "matrix");
    let f = e[r];
    if (f == null) continue;
    if (Array.isArray(f)) {
      l = l.replace(u, x({ explode: d, name: r, style: t, value: f }));
      continue;
    }
    if (typeof f == "object") {
      l = l.replace(u, I({ explode: d, name: r, style: t, value: f }));
      continue;
    }
    if (t === "matrix") {
      l = l.replace(u, `;${j({ name: r, value: f })}`);
      continue;
    }
    let h = encodeURIComponent(t === "label" ? `.${f}` : f);
    l = l.replace(u, h);
  }
  return l;
}, A = ({ allowReserved: e, array: c, object: l } = {}) => (s) => {
  let u = [];
  if (s && typeof s == "object") for (let d in s) {
    let r = s[d];
    if (r != null) {
      if (Array.isArray(r)) {
        u = [...u, x({ allowReserved: e, explode: !0, name: d, style: "form", value: r, ...c })];
        continue;
      }
      if (typeof r == "object") {
        u = [...u, I({ allowReserved: e, explode: !0, name: d, style: "deepObject", value: r, ...l })];
        continue;
      }
      u = [...u, j({ allowReserved: e, name: d, value: r })];
    }
  }
  return u.join("&");
}, E = (e) => {
  if (e) {
    if (e.startsWith("application/json") || e.endsWith("+json")) return "json";
    if (e === "multipart/form-data") return "formData";
    if (["application/", "audio/", "image/", "video/"].some((c) => e.startsWith(c))) return "blob";
    if (e.startsWith("text/")) return "text";
  }
}, B = ({ baseUrl: e, path: c, query: l, querySerializer: s, url: u }) => {
  let d = u.startsWith("/") ? u : `/${u}`, r = e + d;
  c && (r = k({ path: c, url: r }));
  let t = l ? s(l) : "";
  return t.startsWith("?") && (t = t.substring(1)), t && (r += `?${t}`), r;
}, U = (e, c) => {
  var s;
  let l = { ...e, ...c };
  return (s = l.baseUrl) != null && s.endsWith("/") && (l.baseUrl = l.baseUrl.substring(0, l.baseUrl.length - 1)), l.headers = $(e.headers, c.headers), l;
}, $ = (...e) => {
  let c = new Headers();
  for (let l of e) {
    if (!l || typeof l != "object") continue;
    let s = l instanceof Headers ? l.entries() : Object.entries(l);
    for (let [u, d] of s) if (d === null) c.delete(u);
    else if (Array.isArray(d)) for (let r of d) c.append(u, r);
    else d !== void 0 && c.set(u, typeof d == "object" ? JSON.stringify(d) : d);
  }
  return c;
}, v = class {
  constructor() {
    C(this, "_fns");
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
}, L = () => ({ error: new v(), request: new v(), response: new v() }), W = { bodySerializer: (e) => JSON.stringify(e) }, N = A({ allowReserved: !1, array: { explode: !0, style: "form" }, object: { explode: !0, style: "deepObject" } }), D = { "Content-Type": "application/json" }, O = (e = {}) => ({ ...W, baseUrl: "", fetch: globalThis.fetch, headers: D, parseAs: "auto", querySerializer: N, ...e }), M = (e = {}) => {
  let c = U(O(), e), l = () => ({ ...c }), s = (r) => (c = U(c, r), l()), u = L(), d = async (r) => {
    let t = { ...c, ...r, headers: $(c.headers, r.headers) };
    t.body && t.bodySerializer && (t.body = t.bodySerializer(t.body)), t.body || t.headers.delete("Content-Type");
    let f = B({ baseUrl: t.baseUrl ?? "", path: t.path, query: t.query, querySerializer: typeof t.querySerializer == "function" ? t.querySerializer : A(t.querySerializer), url: t.url }), h = { redirect: "follow", ...t }, n = new Request(f, h);
    for (let m of u.request._fns) n = await m(n, t);
    let R = t.fetch, g = await R(n);
    for (let m of u.response._fns) g = await m(g, n, t);
    let i = { request: n, response: g };
    if (g.ok) {
      if (g.status === 204 || g.headers.get("Content-Length") === "0") return { data: {}, ...i };
      if (t.parseAs === "stream") return { data: g.body, ...i };
      let m = (t.parseAs === "auto" ? E(g.headers.get("Content-Type")) : t.parseAs) ?? "json", w = await g[m]();
      return m === "json" && t.responseTransformer && (w = await t.responseTransformer(w)), { data: w, ...i };
    }
    let y = await g.text();
    try {
      y = JSON.parse(y);
    } catch {
    }
    let b = y;
    for (let m of u.error._fns) b = await m(y, g, n, t);
    if (b = b || {}, t.throwOnError) throw b;
    return { error: b, ...i };
  };
  return { connect: (r) => d({ ...r, method: "CONNECT" }), delete: (r) => d({ ...r, method: "DELETE" }), get: (r) => d({ ...r, method: "GET" }), getConfig: l, head: (r) => d({ ...r, method: "HEAD" }), interceptors: u, options: (r) => d({ ...r, method: "OPTIONS" }), patch: (r) => d({ ...r, method: "PATCH" }), post: (r) => d({ ...r, method: "POST" }), put: (r) => d({ ...r, method: "PUT" }), request: d, setConfig: s, trace: (r) => d({ ...r, method: "TRACE" }) };
};
const a = M(O()), G = (e) => ((e == null ? void 0 : e.client) ?? a).get({
  ...e,
  url: "/api/config"
}), F = (e) => ((e == null ? void 0 : e.client) ?? a).get({
  ...e,
  url: "/api/access-tokens"
}), K = (e) => ((e == null ? void 0 : e.client) ?? a).get({
  ...e,
  url: "/api/access-tokens/exchange-using-oidc"
}), Q = (e) => ((e == null ? void 0 : e.client) ?? a).get({
  ...e,
  url: "/api/access-tokens/me"
}), V = (e) => ((e == null ? void 0 : e.client) ?? a).get({
  ...e,
  url: "/api/users"
}), X = (e) => ((e == null ? void 0 : e.client) ?? a).get({
  ...e,
  url: "/api/users"
}), Y = (e) => ((e == null ? void 0 : e.client) ?? a).get({
  ...e,
  url: "/api/users/{id}"
}), Z = (e) => ((e == null ? void 0 : e.client) ?? a).get({
  ...e,
  url: "/api/users/{id}"
}), p = (e) => ((e == null ? void 0 : e.client) ?? a).get({
  ...e,
  url: "/api/users/{id}/email"
}), o = (e) => ((e == null ? void 0 : e.client) ?? a).get({
  ...e,
  url: "/api/users/{id}/password"
}), ee = (e) => ((e == null ? void 0 : e.client) ?? a).get({
  ...e,
  url: "/api/users/{id}/username"
}), re = (e) => ((e == null ? void 0 : e.client) ?? a).get({
  ...e,
  url: "/api/users/{id}/avatar"
}), ae = (e) => ((e == null ? void 0 : e.client) ?? a).get({
  ...e,
  url: "/api/users/{id}"
}), te = (e) => ((e == null ? void 0 : e.client) ?? a).get({
  ...e,
  url: "/api/projects"
}), le = (e) => ((e == null ? void 0 : e.client) ?? a).get({
  ...e,
  url: "/api/projects"
}), ce = (e) => ((e == null ? void 0 : e.client) ?? a).get({
  ...e,
  url: "/api/projects/{id}"
}), ue = (e) => ((e == null ? void 0 : e.client) ?? a).get({
  ...e,
  url: "/api/projects/{id}"
}), de = (e) => ((e == null ? void 0 : e.client) ?? a).get({
  ...e,
  url: "/api/projects/{id}/background-image"
}), se = (e) => ((e == null ? void 0 : e.client) ?? a).get({
  ...e,
  url: "/api/projects/{id}"
}), fe = (e) => ((e == null ? void 0 : e.client) ?? a).get({
  ...e,
  url: "/api/projects/{projectId}/managers"
}), ge = (e) => ((e == null ? void 0 : e.client) ?? a).get({
  ...e,
  url: "/api/project-managers/{id}"
}), ne = (e) => ((e == null ? void 0 : e.client) ?? a).get({
  ...e,
  url: "/api/projects/{projectId}/boards"
}), me = (e) => ((e == null ? void 0 : e.client) ?? a).get({
  ...e,
  url: "/api/boards/{id}"
}), he = (e) => ((e == null ? void 0 : e.client) ?? a).get({
  ...e,
  url: "/api/boards/{id}"
}), be = (e) => ((e == null ? void 0 : e.client) ?? a).get({
  ...e,
  url: "/api/boards/{id}"
}), ie = (e) => ((e == null ? void 0 : e.client) ?? a).get({
  ...e,
  url: "/api/boards/{boardId}/memberships"
}), ye = (e) => ((e == null ? void 0 : e.client) ?? a).get({
  ...e,
  url: "/api/board-memberships/{id}"
}), je = (e) => ((e == null ? void 0 : e.client) ?? a).get({
  ...e,
  url: "/api/board-memberships/{id}"
}), we = (e) => ((e == null ? void 0 : e.client) ?? a).get({
  ...e,
  url: "/api/boards/{boardId}/labels"
}), ve = (e) => ((e == null ? void 0 : e.client) ?? a).get({
  ...e,
  url: "/api/labels/{id}"
}), Ce = (e) => ((e == null ? void 0 : e.client) ?? a).get({
  ...e,
  url: "/api/labels/{id}"
}), Ue = (e) => ((e == null ? void 0 : e.client) ?? a).get({
  ...e,
  url: "/api/boards/{boardId}/lists"
}), xe = (e) => ((e == null ? void 0 : e.client) ?? a).get({
  ...e,
  url: "/api/lists/{id}"
}), Ie = (e) => ((e == null ? void 0 : e.client) ?? a).get({
  ...e,
  url: "/api/lists/{id}/sort"
}), Ae = (e) => ((e == null ? void 0 : e.client) ?? a).get({
  ...e,
  url: "/api/lists/{id}"
}), $e = (e) => ((e == null ? void 0 : e.client) ?? a).get({
  ...e,
  url: "/api/lists/{listId}/cards"
}), Oe = (e) => ((e == null ? void 0 : e.client) ?? a).get({
  ...e,
  url: "/api/cards/{id}"
}), Re = (e) => ((e == null ? void 0 : e.client) ?? a).get({
  ...e,
  url: "/api/cards/{id}"
}), Te = (e) => ((e == null ? void 0 : e.client) ?? a).get({
  ...e,
  url: "/api/cards/{id}/duplicate"
}), qe = (e) => ((e == null ? void 0 : e.client) ?? a).get({
  ...e,
  url: "/api/cards/{id}"
}), Pe = (e) => ((e == null ? void 0 : e.client) ?? a).get({
  ...e,
  url: "/api/cards/{cardId}/memberships"
}), ze = (e) => ((e == null ? void 0 : e.client) ?? a).get({
  ...e,
  url: "/api/cards/{cardId}/memberships"
}), Se = (e) => ((e == null ? void 0 : e.client) ?? a).get({
  ...e,
  url: "/api/cards/{cardId}/labels"
}), _e = (e) => ((e == null ? void 0 : e.client) ?? a).get({
  ...e,
  url: "/api/cards/{cardId}/labels/{labelId}"
}), ke = (e) => ((e == null ? void 0 : e.client) ?? a).get({
  ...e,
  url: "/api/cards/{cardId}/tasks"
}), Ee = (e) => ((e == null ? void 0 : e.client) ?? a).get({
  ...e,
  url: "/api/tasks/{id}"
}), Be = (e) => ((e == null ? void 0 : e.client) ?? a).get({
  ...e,
  url: "/api/tasks/{id}"
}), Le = (e) => ((e == null ? void 0 : e.client) ?? a).get({
  ...e,
  url: "/api/cards/{cardId}/attachments"
}), We = (e) => ((e == null ? void 0 : e.client) ?? a).get({
  ...e,
  url: "/api/attachments/{id}"
}), Ne = (e) => ((e == null ? void 0 : e.client) ?? a).get({
  ...e,
  url: "/api/attachments/{id}"
}), De = (e) => ((e == null ? void 0 : e.client) ?? a).get(
  {
    ...e,
    url: "/api/cards/{cardId}/actions"
  }
), Me = (e) => ((e == null ? void 0 : e.client) ?? a).get({
  ...e,
  url: "/api/cards/{cardId}/comment-actions"
}), He = (e) => ((e == null ? void 0 : e.client) ?? a).get({
  ...e,
  url: "/api/comment-actions/{id}"
}), Je = (e) => ((e == null ? void 0 : e.client) ?? a).get({
  ...e,
  url: "/api/comment-actions/{id}"
}), Ge = (e) => ((e == null ? void 0 : e.client) ?? a).get({
  ...e,
  url: "/api/notifications"
}), Fe = (e) => ((e == null ? void 0 : e.client) ?? a).get({
  ...e,
  url: "/api/notifications/{id}"
}), Ke = (e) => ((e == null ? void 0 : e.client) ?? a).get({
  ...e,
  url: "/api/notifications/{ids}"
});
var H = /* @__PURE__ */ ((e) => (e.s400 = "Bad request", e.s401 = "Unauthorized", e.s404 = "Not found", e.s409 = "Conflict", e.s422 = "Bad request (unprocessable)", e))(H || {});
export {
  H as StatusCode,
  F as authorize,
  K as authorizeOidc,
  a as client,
  Le as createAttachment,
  ne as createBoard,
  ie as createBoardMembership,
  $e as createCard,
  Se as createCardLabel,
  Pe as createCardMembership,
  Me as createCommentAction,
  we as createLabel,
  Ue as createList,
  le as createProject,
  fe as createProjectManager,
  ke as createTask,
  X as createUser,
  Ne as deleteAttachment,
  be as deleteBoard,
  je as deleteBoardMembership,
  qe as deleteCard,
  _e as deleteCardLabel,
  ze as deleteCardMembership,
  Je as deleteCommentAction,
  Ce as deleteLabel,
  Ae as deleteList,
  se as deleteProject,
  ge as deleteProjectManager,
  Be as deleteTask,
  ae as deleteUser,
  Te as duplicateCard,
  me as getBoard,
  Oe as getCard,
  De as getCardActions,
  G as getConfig,
  Fe as getNotification,
  Ge as getNotifications,
  ce as getProject,
  te as getProjects,
  Y as getUser,
  V as getUsers,
  Ie as sortList,
  Q as unauthorize,
  We as updateAttachment,
  he as updateBoard,
  ye as updateBoardMembership,
  Re as updateCard,
  He as updateCommentAction,
  ve as updateLabel,
  xe as updateList,
  Ke as updateNotifications,
  ue as updateProject,
  de as updateProjectBackgroundImage,
  Ee as updateTask,
  Z as updateUser,
  re as updateUserAvatar,
  p as updateUserEmail,
  o as updateUserPassword,
  ee as updateUserUsername
};
