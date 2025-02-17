var z = Object.defineProperty;
var P = (e, a, r) => a in e ? z(e, a, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[a] = r;
var x = (e, a, r) => P(e, typeof a != "symbol" ? a + "" : a, r);
var k = async (e, a) => {
  let r = typeof a == "function" ? await a(e) : a;
  if (r) return e.scheme === "bearer" ? `Bearer ${r}` : e.scheme === "basic" ? `Basic ${btoa(r)}` : r;
}, A = (e, a, r) => {
  typeof r == "string" || r instanceof Blob ? e.append(a, r) : e.append(a, JSON.stringify(r));
}, v = { bodySerializer: (e) => {
  let a = new FormData();
  return Object.entries(e).forEach(([r, u]) => {
    u != null && (Array.isArray(u) ? u.forEach((d) => A(a, r, d)) : A(a, r, u));
  }), a;
} }, E = { bodySerializer: (e) => JSON.stringify(e, (a, r) => typeof r == "bigint" ? r.toString() : r) }, _ = (e) => {
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
}, B = (e) => {
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
}, L = (e) => {
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
}, $ = ({ allowReserved: e, explode: a, name: r, style: u, value: d }) => {
  if (!a) {
    let c = (e ? d : d.map((s) => encodeURIComponent(s))).join(B(u));
    switch (u) {
      case "label":
        return `.${c}`;
      case "matrix":
        return `;${r}=${c}`;
      case "simple":
        return c;
      default:
        return `${r}=${c}`;
    }
  }
  let n = _(u), l = d.map((c) => u === "label" || u === "simple" ? e ? c : encodeURIComponent(c) : w({ allowReserved: e, name: r, value: c })).join(n);
  return u === "label" || u === "matrix" ? n + l : l;
}, w = ({ allowReserved: e, name: a, value: r }) => {
  if (r == null) return "";
  if (typeof r == "object") throw new Error("Deeply-nested arrays/objects aren’t supported. Provide your own `querySerializer()` to handle these.");
  return `${a}=${e ? r : encodeURIComponent(r)}`;
}, O = ({ allowReserved: e, explode: a, name: r, style: u, value: d }) => {
  if (d instanceof Date) return `${r}=${d.toISOString()}`;
  if (u !== "deepObject" && !a) {
    let c = [];
    Object.entries(d).forEach(([i, f]) => {
      c = [...c, i, e ? f : encodeURIComponent(f)];
    });
    let s = c.join(",");
    switch (u) {
      case "form":
        return `${r}=${s}`;
      case "label":
        return `.${s}`;
      case "matrix":
        return `;${r}=${s}`;
      default:
        return s;
    }
  }
  let n = L(u), l = Object.entries(d).map(([c, s]) => w({ allowReserved: e, name: u === "deepObject" ? `${r}[${c}]` : c, value: s })).join(n);
  return u === "label" || u === "matrix" ? n + l : l;
}, N = /\{[^{}]+\}/g, W = ({ path: e, url: a }) => {
  let r = a, u = a.match(N);
  if (u) for (let d of u) {
    let n = !1, l = d.substring(1, d.length - 1), c = "simple";
    l.endsWith("*") && (n = !0, l = l.substring(0, l.length - 1)), l.startsWith(".") ? (l = l.substring(1), c = "label") : l.startsWith(";") && (l = l.substring(1), c = "matrix");
    let s = e[l];
    if (s == null) continue;
    if (Array.isArray(s)) {
      r = r.replace(d, $({ explode: n, name: l, style: c, value: s }));
      continue;
    }
    if (typeof s == "object") {
      r = r.replace(d, O({ explode: n, name: l, style: c, value: s }));
      continue;
    }
    if (c === "matrix") {
      r = r.replace(d, `;${w({ name: l, value: s })}`);
      continue;
    }
    let i = encodeURIComponent(c === "label" ? `.${s}` : s);
    r = r.replace(d, i);
  }
  return r;
}, T = ({ allowReserved: e, array: a, object: r } = {}) => (u) => {
  let d = [];
  if (u && typeof u == "object") for (let n in u) {
    let l = u[n];
    if (l != null) {
      if (Array.isArray(l)) {
        d = [...d, $({ allowReserved: e, explode: !0, name: n, style: "form", value: l, ...a })];
        continue;
      }
      if (typeof l == "object") {
        d = [...d, O({ allowReserved: e, explode: !0, name: n, style: "deepObject", value: l, ...r })];
        continue;
      }
      d = [...d, w({ allowReserved: e, name: n, value: l })];
    }
  }
  return d.join("&");
}, D = (e) => {
  var r;
  if (!e) return "stream";
  let a = (r = e.split(";")[0]) == null ? void 0 : r.trim();
  if (a) {
    if (a.startsWith("application/json") || a.endsWith("+json")) return "json";
    if (a === "multipart/form-data") return "formData";
    if (["application/", "audio/", "image/", "video/"].some((u) => a.startsWith(u))) return "blob";
    if (a.startsWith("text/")) return "text";
  }
}, M = async ({ security: e, ...a }) => {
  for (let r of e) {
    let u = await k(r, a.auth);
    if (!u) continue;
    let d = r.name ?? "Authorization";
    switch (r.in) {
      case "query":
        a.query || (a.query = {}), a.query[d] = u;
        break;
      case "header":
      default:
        a.headers.set(d, u);
        break;
    }
    return;
  }
}, U = (e) => H({ baseUrl: e.baseUrl, path: e.path, query: e.query, querySerializer: typeof e.querySerializer == "function" ? e.querySerializer : T(e.querySerializer), url: e.url }), H = ({ baseUrl: e, path: a, query: r, querySerializer: u, url: d }) => {
  let n = d.startsWith("/") ? d : `/${d}`, l = (e ?? "") + n;
  a && (l = W({ path: a, url: l }));
  let c = r ? u(r) : "";
  return c.startsWith("?") && (c = c.substring(1)), c && (l += `?${c}`), l;
}, I = (e, a) => {
  var u;
  let r = { ...e, ...a };
  return (u = r.baseUrl) != null && u.endsWith("/") && (r.baseUrl = r.baseUrl.substring(0, r.baseUrl.length - 1)), r.headers = S(e.headers, a.headers), r;
}, S = (...e) => {
  let a = new Headers();
  for (let r of e) {
    if (!r || typeof r != "object") continue;
    let u = r instanceof Headers ? r.entries() : Object.entries(r);
    for (let [d, n] of u) if (n === null) a.delete(d);
    else if (Array.isArray(n)) for (let l of n) a.append(d, l);
    else n !== void 0 && a.set(d, typeof n == "object" ? JSON.stringify(n) : n);
  }
  return a;
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
    let a = this._fns.indexOf(e);
    a !== -1 && (this._fns = [...this._fns.slice(0, a), ...this._fns.slice(a + 1)]);
  }
  use(e) {
    this._fns = [...this._fns, e];
  }
}, J = () => ({ error: new C(), request: new C(), response: new C() }), V = T({ allowReserved: !1, array: { explode: !0, style: "form" }, object: { explode: !0, style: "deepObject" } }), F = { "Content-Type": "application/json" }, q = (e = {}) => ({ ...E, headers: F, parseAs: "auto", querySerializer: V, ...e }), G = (e = {}) => {
  let a = I(q(), e), r = () => ({ ...a }), u = (l) => (a = I(a, l), r()), d = J(), n = async (l) => {
    let c = { ...a, ...l, fetch: l.fetch ?? a.fetch ?? globalThis.fetch, headers: S(a.headers, l.headers) };
    c.security && await M({ ...c, security: c.security }), c.body && c.bodySerializer && (c.body = c.bodySerializer(c.body)), c.body || c.headers.delete("Content-Type");
    let s = U(c), i = { redirect: "follow", ...c }, f = new Request(s, i);
    for (let m of d.request._fns) f = await m(f, c);
    let R = c.fetch, h = await R(f);
    for (let m of d.response._fns) h = await m(h, f, c);
    let y = { request: f, response: h };
    if (h.ok) {
      if (h.status === 204 || h.headers.get("Content-Length") === "0") return { data: {}, ...y };
      let m = (c.parseAs === "auto" ? D(h.headers.get("Content-Type")) : c.parseAs) ?? "json";
      if (m === "stream") return { data: h.body, ...y };
      let j = await h[m]();
      return m === "json" && (c.responseValidator && await c.responseValidator(j), c.responseTransformer && (j = await c.responseTransformer(j))), { data: j, ...y };
    }
    let g = await h.text();
    try {
      g = JSON.parse(g);
    } catch {
    }
    let b = g;
    for (let m of d.error._fns) b = await m(g, h, f, c);
    if (b = b || {}, c.throwOnError) throw b;
    return { error: b, ...y };
  };
  return { buildUrl: U, connect: (l) => n({ ...l, method: "CONNECT" }), delete: (l) => n({ ...l, method: "DELETE" }), get: (l) => n({ ...l, method: "GET" }), getConfig: r, head: (l) => n({ ...l, method: "HEAD" }), interceptors: d, options: (l) => n({ ...l, method: "OPTIONS" }), patch: (l) => n({ ...l, method: "PATCH" }), post: (l) => n({ ...l, method: "POST" }), put: (l) => n({ ...l, method: "PUT" }), request: n, setConfig: u, trace: (l) => n({ ...l, method: "TRACE" }) };
};
const t = G(q()), K = (e) => ((e == null ? void 0 : e.client) ?? t).get({
  ...e,
  url: "/api/config"
}), X = (e) => ((e == null ? void 0 : e.client) ?? t).post({
  ...e,
  url: "/api/access-tokens"
}), Y = (e) => ((e == null ? void 0 : e.client) ?? t).post({
  ...e,
  url: "/api/access-tokens/exchange-using-oidc"
}), Z = (e) => ((e == null ? void 0 : e.client) ?? t).delete({
  ...e,
  url: "/api/access-tokens/me"
}), p = (e) => ((e == null ? void 0 : e.client) ?? t).get({
  ...e,
  url: "/api/users"
}), o = (e) => ((e == null ? void 0 : e.client) ?? t).post({
  ...e,
  url: "/api/users"
}), ee = (e) => ((e == null ? void 0 : e.client) ?? t).get({
  ...e,
  url: "/api/users/{id}"
}), re = (e) => ((e == null ? void 0 : e.client) ?? t).patch({
  ...e,
  url: "/api/users/{id}"
}), ae = (e) => ((e == null ? void 0 : e.client) ?? t).patch({
  ...e,
  url: "/api/users/{id}/email"
}), te = (e) => ((e == null ? void 0 : e.client) ?? t).patch({
  ...e,
  url: "/api/users/{id}/password"
}), le = (e) => ((e == null ? void 0 : e.client) ?? t).patch({
  ...e,
  url: "/api/users/{id}/username"
}), ce = (e) => ((e == null ? void 0 : e.client) ?? t).post({
  ...v,
  ...e,
  headers: {
    "Content-Type": null
  },
  url: "/api/users/{id}/avatar"
}), ue = (e) => ((e == null ? void 0 : e.client) ?? t).delete({
  ...e,
  url: "/api/users/{id}"
}), de = (e) => ((e == null ? void 0 : e.client) ?? t).get({
  ...e,
  url: "/api/projects"
}), ne = (e) => ((e == null ? void 0 : e.client) ?? t).post({
  ...e,
  url: "/api/projects"
}), se = (e) => ((e == null ? void 0 : e.client) ?? t).get({
  ...e,
  url: "/api/projects/{id}"
}), he = (e) => ((e == null ? void 0 : e.client) ?? t).patch({
  ...e,
  url: "/api/projects/{id}"
}), fe = (e) => ((e == null ? void 0 : e.client) ?? t).post({
  ...v,
  ...e,
  headers: {
    "Content-Type": null
  },
  url: "/api/projects/{id}/background-image"
}), me = (e) => ((e == null ? void 0 : e.client) ?? t).delete({
  ...e,
  url: "/api/projects/{id}"
}), ie = (e) => ((e == null ? void 0 : e.client) ?? t).post({
  ...e,
  url: "/api/projects/{projectId}/managers"
}), be = (e) => ((e == null ? void 0 : e.client) ?? t).delete({
  ...e,
  url: "/api/project-managers/{id}"
}), ye = (e) => ((e == null ? void 0 : e.client) ?? t).post({
  ...e,
  url: "/api/projects/{projectId}/boards"
}), ge = (e) => ((e == null ? void 0 : e.client) ?? t).get({
  ...e,
  url: "/api/boards/{id}"
}), je = (e) => ((e == null ? void 0 : e.client) ?? t).patch({
  ...e,
  url: "/api/boards/{id}"
}), we = (e) => ((e == null ? void 0 : e.client) ?? t).delete({
  ...e,
  url: "/api/boards/{id}"
}), Ce = (e) => ((e == null ? void 0 : e.client) ?? t).post({
  ...e,
  url: "/api/boards/{boardId}/memberships"
}), ve = (e) => ((e == null ? void 0 : e.client) ?? t).patch({
  ...e,
  url: "/api/board-memberships/{id}"
}), xe = (e) => ((e == null ? void 0 : e.client) ?? t).delete({
  ...e,
  url: "/api/board-memberships/{id}"
}), Ae = (e) => ((e == null ? void 0 : e.client) ?? t).post({
  ...e,
  url: "/api/boards/{boardId}/labels"
}), Ue = (e) => ((e == null ? void 0 : e.client) ?? t).patch({
  ...e,
  url: "/api/labels/{id}"
}), Ie = (e) => ((e == null ? void 0 : e.client) ?? t).delete({
  ...e,
  url: "/api/labels/{id}"
}), $e = (e) => ((e == null ? void 0 : e.client) ?? t).post({
  ...e,
  url: "/api/boards/{boardId}/lists"
}), Oe = (e) => ((e == null ? void 0 : e.client) ?? t).patch({
  ...e,
  url: "/api/lists/{id}"
}), Te = (e) => ((e == null ? void 0 : e.client) ?? t).post({
  ...e,
  url: "/api/lists/{id}/sort"
}), Se = (e) => ((e == null ? void 0 : e.client) ?? t).delete({
  ...e,
  url: "/api/lists/{id}"
}), qe = (e) => ((e == null ? void 0 : e.client) ?? t).post({
  ...e,
  url: "/api/lists/{listId}/cards"
}), Re = (e) => ((e == null ? void 0 : e.client) ?? t).get({
  ...e,
  url: "/api/cards/{id}"
}), ze = (e) => ((e == null ? void 0 : e.client) ?? t).patch({
  ...e,
  url: "/api/cards/{id}"
}), Pe = (e) => ((e == null ? void 0 : e.client) ?? t).post({
  ...e,
  url: "/api/cards/{id}/duplicate"
}), ke = (e) => ((e == null ? void 0 : e.client) ?? t).delete({
  ...e,
  url: "/api/cards/{id}"
}), Ee = (e) => ((e == null ? void 0 : e.client) ?? t).post({
  ...e,
  url: "/api/cards/{cardId}/memberships"
}), _e = (e) => ((e == null ? void 0 : e.client) ?? t).delete({
  ...e,
  url: "/api/cards/{cardId}/memberships"
}), Be = (e) => ((e == null ? void 0 : e.client) ?? t).post({
  ...e,
  url: "/api/cards/{cardId}/labels"
}), Le = (e) => ((e == null ? void 0 : e.client) ?? t).delete({
  ...e,
  url: "/api/cards/{cardId}/labels/{labelId}"
}), Ne = (e) => ((e == null ? void 0 : e.client) ?? t).post({
  ...e,
  url: "/api/cards/{cardId}/tasks"
}), We = (e) => ((e == null ? void 0 : e.client) ?? t).patch({
  ...e,
  url: "/api/tasks/{id}"
}), De = (e) => ((e == null ? void 0 : e.client) ?? t).delete({
  ...e,
  url: "/api/tasks/{id}"
}), Me = (e) => ((e == null ? void 0 : e.client) ?? t).post({
  ...v,
  ...e,
  headers: {
    "Content-Type": null
  },
  url: "/api/cards/{cardId}/attachments"
}), He = (e) => ((e == null ? void 0 : e.client) ?? t).patch({
  ...e,
  url: "/api/attachments/{id}"
}), Je = (e) => ((e == null ? void 0 : e.client) ?? t).delete({
  ...e,
  url: "/api/attachments/{id}"
}), Ve = (e) => ((e == null ? void 0 : e.client) ?? t).get({
  ...e,
  url: "/attachments/{id}/download/{filename}"
}), Fe = (e) => ((e == null ? void 0 : e.client) ?? t).get({
  ...e,
  url: "/attachments/{id}/download/thumbnails/cover-256.{extension}"
}), Ge = (e) => ((e == null ? void 0 : e.client) ?? t).get({
  ...e,
  url: "/api/cards/{cardId}/actions"
}), Qe = (e) => ((e == null ? void 0 : e.client) ?? t).post({
  ...e,
  url: "/api/cards/{cardId}/comment-actions"
}), Ke = (e) => ((e == null ? void 0 : e.client) ?? t).patch({
  ...e,
  url: "/api/comment-actions/{id}"
}), Xe = (e) => ((e == null ? void 0 : e.client) ?? t).delete({
  ...e,
  url: "/api/comment-actions/{id}"
}), Ye = (e) => ((e == null ? void 0 : e.client) ?? t).get({
  ...e,
  url: "/api/notifications"
}), Ze = (e) => ((e == null ? void 0 : e.client) ?? t).get({
  ...e,
  url: "/api/notifications/{id}"
}), pe = (e) => ((e == null ? void 0 : e.client) ?? t).patch({
  ...e,
  url: "/api/notifications/{ids}"
});
export {
  X as authorize,
  Y as authorizeOidc,
  t as client,
  Me as createAttachment,
  ye as createBoard,
  Ce as createBoardMembership,
  qe as createCard,
  Be as createCardLabel,
  Ee as createCardMembership,
  Qe as createCommentAction,
  Ae as createLabel,
  $e as createList,
  ne as createProject,
  ie as createProjectManager,
  Ne as createTask,
  o as createUser,
  Je as deleteAttachment,
  we as deleteBoard,
  xe as deleteBoardMembership,
  ke as deleteCard,
  Le as deleteCardLabel,
  _e as deleteCardMembership,
  Xe as deleteCommentAction,
  Ie as deleteLabel,
  Se as deleteList,
  me as deleteProject,
  be as deleteProjectManager,
  De as deleteTask,
  ue as deleteUser,
  Pe as duplicateCard,
  Ve as getAttachment,
  Fe as getAttachmentThumbnail,
  ge as getBoard,
  Re as getCard,
  Ge as getCardActions,
  K as getConfig,
  Ze as getNotification,
  Ye as getNotifications,
  se as getProject,
  de as getProjects,
  ee as getUser,
  p as getUsers,
  Te as sortList,
  Z as unauthorize,
  He as updateAttachment,
  je as updateBoard,
  ve as updateBoardMembership,
  ze as updateCard,
  Ke as updateCommentAction,
  Ue as updateLabel,
  Oe as updateList,
  pe as updateNotifications,
  he as updateProject,
  fe as updateProjectBackgroundImage,
  We as updateTask,
  re as updateUser,
  ce as updateUserAvatar,
  ae as updateUserEmail,
  te as updateUserPassword,
  le as updateUserUsername
};
