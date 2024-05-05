class k extends Error {
  constructor(e, o, i) {
    super(i), this.name = "ApiError", this.url = o.url, this.status = o.status, this.statusText = o.statusText, this.body = o.body, this.request = e;
  }
}
class E extends Error {
  constructor(e) {
    super(e), this.name = "CancelError";
  }
  get isCancelled() {
    return !0;
  }
}
class S {
  constructor(e) {
    this._isResolved = !1, this._isRejected = !1, this._isCancelled = !1, this.cancelHandlers = [], this.promise = new Promise((o, i) => {
      this._resolve = o, this._reject = i;
      const n = (h) => {
        this._isResolved || this._isRejected || this._isCancelled || (this._isResolved = !0, this._resolve && this._resolve(h));
      }, d = (h) => {
        this._isResolved || this._isRejected || this._isCancelled || (this._isRejected = !0, this._reject && this._reject(h));
      }, c = (h) => {
        this._isResolved || this._isRejected || this._isCancelled || this.cancelHandlers.push(h);
      };
      return Object.defineProperty(c, "isResolved", {
        get: () => this._isResolved
      }), Object.defineProperty(c, "isRejected", {
        get: () => this._isRejected
      }), Object.defineProperty(c, "isCancelled", {
        get: () => this._isCancelled
      }), e(n, d, c);
    });
  }
  get [Symbol.toStringTag]() {
    return "Cancellable Promise";
  }
  then(e, o) {
    return this.promise.then(e, o);
  }
  catch(e) {
    return this.promise.catch(e);
  }
  finally(e) {
    return this.promise.finally(e);
  }
  cancel() {
    if (!(this._isResolved || this._isRejected || this._isCancelled)) {
      if (this._isCancelled = !0, this.cancelHandlers.length)
        try {
          for (const e of this.cancelHandlers)
            e();
        } catch (e) {
          console.warn("Cancellation threw an error", e);
          return;
        }
      this.cancelHandlers.length = 0, this._reject && this._reject(new E("Request aborted"));
    }
  }
  get isCancelled() {
    return this._isCancelled;
  }
}
class y {
  constructor() {
    this._fns = [];
  }
  eject(e) {
    const o = this._fns.indexOf(e);
    o !== -1 && (this._fns = [...this._fns.slice(0, o), ...this._fns.slice(o + 1)]);
  }
  use(e) {
    this._fns = [...this._fns, e];
  }
}
const s = {
  BASE: process.env.PLANKA_URL || "http://localhost:3000",
  CREDENTIALS: "include",
  ENCODE_PATH: void 0,
  HEADERS: void 0,
  PASSWORD: void 0,
  TOKEN: void 0,
  USERNAME: void 0,
  VERSION: "1.0.0",
  WITH_CREDENTIALS: !1,
  interceptors: {
    request: new y(),
    response: new y()
  }
};
var r = /* @__PURE__ */ ((t) => (t.s400 = "Bad request", t.s401 = "Unauthorized", t.s404 = "Not found", t.s409 = "Conflict", t.s422 = "Bad request (unprocessable)", t))(r || {});
const p = (t) => typeof t == "string", A = (t) => p(t) && t !== "", I = (t) => t instanceof Blob, b = (t) => t instanceof FormData, $ = (t) => {
  try {
    return btoa(t);
  } catch {
    return Buffer.from(t).toString("base64");
  }
}, j = (t) => {
  const e = [], o = (n, d) => {
    e.push(`${encodeURIComponent(n)}=${encodeURIComponent(String(d))}`);
  }, i = (n, d) => {
    d != null && (d instanceof Date ? o(n, d.toISOString()) : Array.isArray(d) ? d.forEach((c) => i(n, c)) : typeof d == "object" ? Object.entries(d).forEach(([c, h]) => i(`${n}[${c}]`, h)) : o(n, d));
  };
  return Object.entries(t).forEach(([n, d]) => i(n, d)), e.length ? `?${e.join("&")}` : "";
}, z = (t, e) => {
  const o = t.ENCODE_PATH || encodeURI, i = e.url.replace("{api-version}", t.VERSION).replace(/{(.*?)}/g, (d, c) => Object.prototype.hasOwnProperty.call(e.path, c) ? o(String(e.path[c])) : d), n = t.BASE + i;
  return e.query ? n + j(e.query) : n;
}, q = (t) => {
  if (t.formData) {
    const e = new FormData(), o = (i, n) => {
      p(n) || I(n) ? e.append(i, n) : e.append(i, JSON.stringify(n));
    };
    return Object.entries(t.formData).filter(([, i]) => i != null).forEach(([i, n]) => {
      Array.isArray(n) ? n.forEach((d) => o(i, d)) : o(i, n);
    }), e;
  }
}, m = async (t, e) => typeof e == "function" ? e(t) : e, P = async (t, e) => {
  const [o, i, n, d] = await Promise.all([
    m(e, t.TOKEN),
    m(e, t.USERNAME),
    m(e, t.PASSWORD),
    m(e, t.HEADERS)
  ]), c = Object.entries({
    Accept: "application/json",
    ...d,
    ...e.headers
  }).filter(([, h]) => h != null).reduce((h, [l, u]) => ({
    ...h,
    [l]: String(u)
  }), {});
  if (A(o) && (c.Authorization = `Bearer ${o}`), A(i) && A(n)) {
    const h = $(`${i}:${n}`);
    c.Authorization = `Basic ${h}`;
  }
  return e.body !== void 0 && (e.mediaType ? c["Content-Type"] = e.mediaType : I(e.body) ? c["Content-Type"] = e.body.type || "application/octet-stream" : p(e.body) ? c["Content-Type"] = "text/plain" : b(e.body) || (c["Content-Type"] = "application/json")), new Headers(c);
}, v = (t) => {
  var e, o;
  if (t.body !== void 0)
    return (e = t.mediaType) != null && e.includes("application/json") || (o = t.mediaType) != null && o.includes("+json") ? JSON.stringify(t.body) : p(t.body) || I(t.body) || b(t.body) ? t.body : JSON.stringify(t.body);
}, R = async (t, e, o, i, n, d, c) => {
  const h = new AbortController();
  let l = {
    headers: d,
    body: i ?? n,
    method: e.method,
    signal: h.signal
  };
  t.WITH_CREDENTIALS && (l.credentials = t.CREDENTIALS);
  for (const u of t.interceptors.request._fns)
    l = await u(l);
  return c(() => h.abort()), await fetch(o, l);
}, w = (t, e) => {
  if (e) {
    const o = t.headers.get(e);
    if (p(o))
      return o;
  }
}, C = async (t) => {
  if (t.status !== 204)
    try {
      const e = t.headers.get("Content-Type");
      if (e) {
        const o = ["application/octet-stream", "application/pdf", "application/zip", "audio/", "image/", "video/"];
        if (e.includes("application/json") || e.includes("+json"))
          return await t.json();
        if (o.some((i) => e.includes(i)))
          return await t.blob();
        if (e.includes("multipart/form-data"))
          return await t.formData();
        if (e.includes("text/"))
          return await t.text();
      }
    } catch (e) {
      console.error(e);
    }
}, _ = (t, e) => {
  const i = {
    400: "Bad Request",
    401: "Unauthorized",
    402: "Payment Required",
    403: "Forbidden",
    404: "Not Found",
    405: "Method Not Allowed",
    406: "Not Acceptable",
    407: "Proxy Authentication Required",
    408: "Request Timeout",
    409: "Conflict",
    410: "Gone",
    411: "Length Required",
    412: "Precondition Failed",
    413: "Payload Too Large",
    414: "URI Too Long",
    415: "Unsupported Media Type",
    416: "Range Not Satisfiable",
    417: "Expectation Failed",
    418: "Im a teapot",
    421: "Misdirected Request",
    422: "Unprocessable Content",
    423: "Locked",
    424: "Failed Dependency",
    425: "Too Early",
    426: "Upgrade Required",
    428: "Precondition Required",
    429: "Too Many Requests",
    431: "Request Header Fields Too Large",
    451: "Unavailable For Legal Reasons",
    500: "Internal Server Error",
    501: "Not Implemented",
    502: "Bad Gateway",
    503: "Service Unavailable",
    504: "Gateway Timeout",
    505: "HTTP Version Not Supported",
    506: "Variant Also Negotiates",
    507: "Insufficient Storage",
    508: "Loop Detected",
    510: "Not Extended",
    511: "Network Authentication Required",
    ...t.errors
  }[e.status];
  if (i)
    throw new k(t, e, i);
  if (!e.ok) {
    const n = e.status ?? "unknown", d = e.statusText ?? "unknown", c = (() => {
      try {
        return JSON.stringify(e.body, null, 2);
      } catch {
        return;
      }
    })();
    throw new k(
      t,
      e,
      `Generic Error: status: ${n}; status text: ${d}; body: ${c}`
    );
  }
}, a = (t, e) => new S(async (o, i, n) => {
  try {
    const d = z(t, e), c = q(e), h = v(e), l = await P(t, e);
    if (!n.isCancelled) {
      let u = await R(t, e, d, h, c, l, n);
      for (const B of t.interceptors.response._fns)
        u = await B(u);
      const g = await C(u), f = w(u, e.responseHeader), T = {
        url: d,
        ok: u.ok,
        status: u.status,
        statusText: u.statusText,
        body: f ?? g
      };
      _(e, T), o(T.body);
    }
  } catch (d) {
    i(d);
  }
});
class O {
  constructor(e) {
    this.planka = e;
  }
  /**
     * @returns SingleResponse<Oidc> Ok
     */
  getConfig() {
    return a(s, {
      method: "GET",
      url: "/api/config"
    });
  }
  /**
     * @returns none Ok
     * @throws ApiError
     */
  async authorize(e) {
    const o = await a(s, {
      method: "POST",
      url: "/api/access-tokens",
      body: e.requestBody,
      errors: {
        400: r.s400
      }
    });
    this.planka.setAccessToken(o.item);
  }
  /**
     * @returns none Ok
     * @throws ApiError
     */
  async authorizeOidc(e) {
    const o = await a(s, {
      method: "POST",
      url: "/api/access-tokens/exchange-using-oidc",
      body: e.requestBody,
      errors: {
        400: r.s400
      }
    });
    this.planka.setAccessToken(o.item);
  }
  /**
     * @returns none Ok
     * @throws ApiError
     */
  async unauthorize() {
    await a(s, {
      method: "DELETE",
      url: "/api/access-tokens/me",
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`
      },
      errors: {
        401: r.s401
      }
    }), this.planka.setAccessToken(null);
  }
}
class D {
  constructor(e) {
    this.planka = e;
  }
  /**
   * @returns ArrayResponse<User> Ok
   * @throws ApiError
   */
  getAll() {
    return a(s, {
      method: "GET",
      url: "/api/users",
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`
      },
      errors: {
        401: r.s401,
        404: r.s404
      }
    });
  }
  /**
   * @param data The data for the request.
   * @param data.requestBody
   * @returns SingleResponse<User> Ok
   * @throws ApiError
   */
  create(e) {
    return a(s, {
      method: "POST",
      url: "/api/users",
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`
      },
      body: e.requestBody,
      errors: {
        401: r.s401,
        404: r.s404
      }
    });
  }
  /**
   * @param data The data for the request.
   * @param data.userId
   * @returns SingleResponse<User> Ok
   * @throws ApiError
   */
  get(e) {
    return a(s, {
      method: "GET",
      url: "/api/users/{userId}",
      path: {
        userId: e.userId
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`
      },
      errors: {
        401: r.s401,
        404: r.s404
      }
    });
  }
  /**
   * @param data The data for the request.
   * @param data.userId
   * @param data.requestBody
   * @returns SingleResponse<User> Ok
   * @throws ApiError
   */
  update(e) {
    return a(s, {
      method: "PATCH",
      url: "/api/users/{userId}",
      path: {
        userId: e.userId
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`
      },
      body: e.requestBody,
      errors: {
        400: r.s400,
        401: r.s401,
        404: r.s404
      }
    });
  }
  /**
   * @param data The data for the request.
   * @param data.userId
   * @param data.requestBody
   * @returns SingleResponse<User> Ok
   * @throws ApiError
   */
  remove(e) {
    return a(s, {
      method: "DELETE",
      url: "/api/users/{userId}",
      path: {
        userId: e.userId
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`
      },
      body: e.requestBody,
      errors: {
        401: r.s401,
        404: r.s404
      }
    });
  }
  /**
   * @param data The data for the request.
   * @param data.userId
   * @param data.requestBody
   * @returns SingleResponse<User> Ok
   * @throws ApiError
   */
  updateMail(e) {
    return a(s, {
      method: "PATCH",
      url: "/api/users/{userId}/email",
      path: {
        userId: e.userId
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`
      },
      body: e.requestBody,
      errors: {
        400: r.s400,
        401: r.s401,
        404: r.s404,
        409: r.s409
      }
    });
  }
  /**
   * @param data The data for the request.
   * @param data.userId
   * @param data.requestBody
   * @returns SingleResponse<User> Ok
   * @throws ApiError
   */
  updatePassword(e) {
    return a(s, {
      method: "PATCH",
      url: "/api/users/{userId}/password",
      path: {
        userId: e.userId
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`
      },
      body: e.requestBody,
      errors: {
        400: r.s400,
        401: r.s401,
        404: r.s404,
        409: r.s409
      }
    });
  }
  /**
   * @param data The data for the request.
   * @param data.userId
   * @param data.requestBody
   * @returns SingleResponse<User> Ok
   * @throws ApiError
   */
  updateName(e) {
    return a(s, {
      method: "PATCH",
      url: "/api/users/{userId}/username",
      path: {
        userId: e.userId
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`
      },
      body: e.requestBody,
      errors: {
        400: r.s400,
        401: r.s401,
        404: r.s404,
        409: r.s409
      }
    });
  }
  /**
   * @param data The data for the request.
   * @param data.userId
   * @param data.requestBody
   * @returns SingleResponse<User> Ok
   * @throws ApiError
   */
  updateAvatar(e) {
    return a(s, {
      method: "POST",
      url: "/api/users/{userId}/avatar",
      path: {
        userId: e.userId
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`
      },
      body: e.requestBody,
      errors: {
        400: r.s400,
        401: r.s401,
        404: r.s404,
        422: r.s422
      }
    });
  }
}
class L {
  constructor(e) {
    this.planka = e;
  }
  create(e) {
    return a(s, {
      method: "POST",
      url: "/api/cards/{cardId}/comment-actions",
      path: {
        cardId: e.cardId
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`
      },
      body: e.requestBody,
      errors: {
        400: r.s400,
        401: r.s401,
        404: r.s404
      }
    });
  }
  update(e) {
    return a(s, {
      method: "PATCH",
      url: "/api/comment-actions/{actionId}",
      path: {
        actionId: e.actionId
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`
      },
      body: e.requestBody,
      errors: {
        400: r.s400,
        401: r.s401,
        404: r.s404
      }
    });
  }
  remove(e) {
    return a(s, {
      method: "DELETE",
      url: "/api/attachments/{attachmentId}",
      path: {
        attachmentId: e.attachmentId
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`
      },
      errors: {
        401: r.s401,
        404: r.s404
      }
    });
  }
}
class H {
  constructor(e) {
    this.planka = e;
  }
  create(e) {
    return a(s, {
      method: "POST",
      url: "/api/cards/{cardId}/attachments",
      path: {
        cardId: e.cardId
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`
      },
      body: e.requestBody,
      errors: {
        401: r.s401,
        404: r.s404,
        422: r.s422
      }
    });
  }
  update(e) {
    return a(s, {
      method: "PATCH",
      url: "/api/attachments/{attachmentId}",
      path: {
        attachmentId: e.attachmentId
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`
      },
      body: e.requestBody,
      errors: {
        401: r.s401,
        404: r.s404
      }
    });
  }
  remove(e) {
    return a(s, {
      method: "DELETE",
      url: "/api/attachments/{attachmentId}",
      path: {
        attachmentId: e.attachmentId
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`
      },
      errors: {
        401: r.s401,
        404: r.s404
      }
    });
  }
  download(e) {
    return a(s, {
      method: "GET",
      url: "/attachments/{attachmentId}/download/{filename}",
      path: {
        attachmentId: e.attachmentId,
        filename: e.filename
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`
      },
      errors: {
        401: r.s401,
        404: r.s404
      }
    });
  }
  thumbnail(e) {
    return a(s, {
      method: "GET",
      url: "/attachments/{attachmentId}/download/thumbnails/cover-256.{extension}",
      path: {
        attachmentId: e.attachmentId,
        extension: e.extension
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`
      },
      errors: {
        401: r.s401,
        404: r.s404
      }
    });
  }
}
class N {
  constructor(e) {
    this.planka = e;
  }
  /**
   * @param data The data for the request.
   * @param data.projectId
   * @param data.requestBody
   * @returns SingleResponse<Board> Ok
   * @throws ApiError
   */
  create(e) {
    return a(s, {
      method: "DELETE",
      url: "/api/projects/{projectId}/managers",
      path: {
        projectId: e.projectId
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`
      },
      body: e.requestBody,
      errors: {
        400: r.s400,
        401: r.s401,
        404: r.s404
      }
    });
  }
  get(e) {
    return a(s, {
      method: "GET",
      url: "/api/boards/{projectId}",
      path: {
        projectId: e.boardId
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`
      },
      errors: {
        401: r.s401,
        404: r.s404
      }
    });
  }
  update(e) {
    return a(s, {
      method: "PATCH",
      url: "/api/boards/{boardId}",
      path: {
        projectId: e.boardId
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`
      },
      body: e.requestBody,
      errors: {
        401: r.s401,
        404: r.s404
      }
    });
  }
  remove(e) {
    return a(s, {
      method: "DELETE",
      url: "/api/boards/{boardId}",
      path: {
        boardId: e.boardId
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`
      },
      errors: {
        401: r.s401,
        404: r.s404
      }
    });
  }
  addMember(e) {
    return a(s, {
      method: "POST",
      url: "/api/boards/{boardId}/memberships",
      path: {
        boardId: e.boardId
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`
      },
      body: e.requestBody,
      errors: {
        400: r.s400,
        401: r.s401,
        404: r.s404,
        409: r.s409
      }
    });
  }
  updateMember(e) {
    return a(s, {
      method: "PATCH",
      url: "/api/board-memberships/{membershipId}",
      path: {
        membershipId: e.membershipId
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`
      },
      body: e.requestBody,
      errors: {
        401: r.s401,
        404: r.s404
      }
    });
  }
  removeMember(e) {
    return a(s, {
      method: "DELETE",
      url: "/api/board-memberships/{membershipId}",
      path: {
        membershipId: e.membershipId
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`
      },
      errors: {
        401: r.s401,
        404: r.s404
      }
    });
  }
}
class x {
  constructor(e) {
    this.planka = e;
  }
  /**
   * @param data The data for the request.
   * @param data.projectId
   * @param data.requestBody
   * @returns SingleResponse<Board> Ok
   * @throws ApiError
   */
  create(e) {
    return a(s, {
      method: "POST",
      url: "/api/lists/{listId}/cards",
      path: {
        listId: e.listId
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`
      },
      body: e.requestBody,
      errors: {
        400: r.s400,
        401: r.s401,
        404: r.s404,
        422: r.s422
      }
    });
  }
  get(e) {
    return a(s, {
      method: "GET",
      url: "/api/cards/{cardId}",
      path: {
        cardId: e.cardId
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`
      },
      errors: {
        401: r.s401,
        404: r.s404
      }
    });
  }
  update(e) {
    return a(s, {
      method: "PATCH",
      url: "/api/cards/{cardId}",
      path: {
        cardId: e.cardId
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`
      },
      body: e.requestBody,
      errors: {
        401: r.s401,
        404: r.s404
      }
    });
  }
  delete(e) {
    return a(s, {
      method: "DELETE",
      url: "/api/cards/{cardId}",
      path: {
        cardId: e.cardId
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`
      },
      errors: {
        401: r.s401,
        404: r.s404
      }
    });
  }
  duplicate(e) {
    return a(s, {
      method: "POST",
      url: "/api/cards/{cardId}/duplicate",
      path: {
        cardId: e.cardId
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`
      },
      body: e.requestBody,
      errors: {
        400: r.s400,
        401: r.s401,
        404: r.s404
      }
    });
  }
  addMember(e) {
    return a(s, {
      method: "POST",
      url: "/api/cards/{cardId}/memberships",
      path: {
        cardId: e.cardId
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`
      },
      body: e.requestBody,
      errors: {
        400: r.s400,
        401: r.s401,
        404: r.s404
      }
    });
  }
  removeMember(e) {
    return a(s, {
      method: "DELETE",
      url: "/api/cards/{cardId}/memberships",
      path: {
        cardId: e.cardId
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`
      },
      body: e.requestBody,
      errors: {
        400: r.s400,
        401: r.s401,
        404: r.s404
      }
    });
  }
  addLabel(e) {
    return a(s, {
      method: "POST",
      url: "/api/cards/{cardId}/labels",
      path: {
        cardId: e.cardId
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`
      },
      body: e.requestBody,
      errors: {
        400: r.s400,
        401: r.s401,
        404: r.s404
      }
    });
  }
  removeLabel(e) {
    return a(s, {
      method: "DELETE",
      url: "/api/cards/{cardId}/labels/{labelId}",
      path: {
        cardId: e.cardId
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`
      },
      errors: {
        400: r.s400,
        401: r.s401,
        404: r.s404
      }
    });
  }
}
class U {
  constructor(e) {
    this.planka = e;
  }
  create(e) {
    return a(s, {
      method: "POST",
      url: "/api/boards/{boardId}/labels",
      path: {
        boardId: e.boardId
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`
      },
      body: e.requestBody,
      errors: {
        400: r.s400,
        401: r.s401,
        404: r.s404
      }
    });
  }
  update(e) {
    return a(s, {
      method: "PATCH",
      url: "/api/labels/{labelId}",
      path: {
        labelId: e.labelId
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`
      },
      body: e.requestBody,
      errors: {
        401: r.s401,
        404: r.s404
      }
    });
  }
  remove(e) {
    return a(s, {
      method: "DELETE",
      url: "/api/labels/{labelId}",
      path: {
        labelId: e.labelId
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`
      },
      errors: {
        401: r.s401,
        404: r.s404
      }
    });
  }
}
class G {
  constructor(e) {
    this.planka = e;
  }
  create(e) {
    return a(s, {
      method: "POST",
      url: "/api/boards/{boardId}/lists",
      path: {
        boardId: e.boardId
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`
      },
      body: e.requestBody,
      errors: {
        400: r.s400,
        401: r.s401,
        404: r.s404
      }
    });
  }
  update(e) {
    return a(s, {
      method: "PATCH",
      url: "/api/lists/{listId}",
      path: {
        listId: e.listId
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`
      },
      body: e.requestBody,
      errors: {
        401: r.s401,
        404: r.s404
      }
    });
  }
  delete(e) {
    return a(s, {
      method: "DELETE",
      url: "/api/lists/{listId}",
      path: {
        listId: e.listId
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`
      },
      errors: {
        401: r.s401,
        404: r.s404
      }
    });
  }
  sort(e) {
    return a(s, {
      method: "POST",
      url: "/api/lists/{listId}/sort",
      path: {
        listId: e.listId
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`
      },
      errors: {
        401: r.s401,
        404: r.s404
      }
    });
  }
}
class M {
  constructor(e) {
    this.planka = e;
  }
  getAll() {
    return a(s, {
      method: "GET",
      url: "/api/notifications",
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`
      },
      errors: {
        401: r.s401,
        404: r.s404
      }
    });
  }
  get(e) {
    return a(s, {
      method: "GET",
      url: "/api/notifications/{notificationId}",
      path: {
        notificationId: e.notificationId
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`
      },
      errors: {
        401: r.s401,
        404: r.s404
      }
    });
  }
  update(e) {
    return a(s, {
      method: "PATCH",
      url: "/api/notifications/{notificationId}",
      path: {
        notificationId: e.notificationId
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`
      },
      body: e.requestBody,
      errors: {
        401: r.s401,
        404: r.s404
      }
    });
  }
}
class F {
  constructor(e) {
    this.planka = e;
  }
  /**
   * @returns ArrayResponse<Project> Ok
   * @throws ApiError
   */
  getAll() {
    return a(s, {
      method: "GET",
      url: "/api/projects",
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`
      },
      errors: {
        401: r.s401
      }
    });
  }
  /**
   * @param data The data for the request.
   * @param data.requestBody
   * @returns SingleResponse<Project> Ok
   * @throws ApiError
   */
  create(e) {
    return a(s, {
      method: "POST",
      url: "/api/projects",
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`
      },
      body: e.requestBody,
      errors: {
        400: r.s400,
        401: r.s401
      }
    });
  }
  /**
   * @param data The data for the request.
   * @param data.projectId
   * @param data.requestBody
   * @returns SingleResponse<Project> Ok
   * @throws ApiError
   */
  get(e) {
    return a(s, {
      method: "GET",
      url: "/api/projects/{projectId}",
      path: {
        projectId: e.projectId
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`
      },
      body: e.requestBody,
      errors: {
        400: r.s400,
        401: r.s401,
        404: r.s404
      }
    });
  }
  /**
   * @param data The data for the request.
   * @param data.projectId
   * @param data.requestBody
   * @returns SingleResponse<Project> Ok
   * @throws ApiError
   */
  update(e) {
    return a(s, {
      method: "PATCH",
      url: "/api/projects/{projectId}",
      path: {
        projectId: e.projectId
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`
      },
      body: e.requestBody,
      errors: {
        401: r.s401,
        404: r.s404
      }
    });
  }
  /**
   * @param data The data for the request.
   * @param data.projectId
   * @param data.requestBody
   * @returns SingleResponse<Project> Ok
   * @throws ApiError
   */
  remove(e) {
    return a(s, {
      method: "DELETE",
      url: "/api/projects/{projectId}",
      path: {
        projectId: e.projectId
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`
      },
      errors: {
        401: r.s401,
        404: r.s404
      }
    });
  }
  /**
   * @param data The data for the request.
   * @param data.projectId
   * @param data.requestBody
   * @returns SingleResponse<Project> Ok
   * @throws ApiError
   */
  setBackgroundImage(e) {
    return a(s, {
      method: "POST",
      url: "/api/projects/{projectId}/background-image",
      path: {
        projectId: e.projectId
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`
      },
      body: e.requestBody,
      errors: {
        401: r.s401,
        404: r.s404,
        422: r.s422
      }
    });
  }
  /**
   * @param data The data for the request.
   * @param data.projectId
   * @param data.requestBody
   * @returns SingleResponse<ProjectManager> Ok
   * @throws ApiError
   */
  addManager(e) {
    return a(s, {
      method: "POST",
      url: "/api/projects/{projectId}/managers",
      path: {
        projectId: e.projectId
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`
      },
      body: e.requestBody,
      errors: {
        400: r.s400,
        401: r.s401,
        404: r.s404
      }
    });
  }
  /**
   * @param data The data for the request.
   * @param data.managerId
   * @param data.requestBody
   * @returns SingleResponse<ProjectManager> Ok
   * @throws ApiError
   */
  removeManager(e) {
    return a(s, {
      method: "DELETE",
      url: "/api/projects/{projectId}/managers",
      path: {
        projectId: e.managerId
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`
      },
      errors: {
        400: r.s400,
        401: r.s401,
        404: r.s404
      }
    });
  }
}
class V {
  constructor(e) {
    this.planka = e;
  }
  create(e) {
    return a(s, {
      method: "POST",
      url: "/api/cards/{cardId}/tasks",
      path: {
        cardId: e.cardId
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`
      },
      body: e.requestBody,
      errors: {
        400: r.s400,
        401: r.s401,
        404: r.s404
      }
    });
  }
  update(e) {
    return a(s, {
      method: "PATCH",
      url: "/api/tasks/{taskId}",
      path: {
        taskId: e.taskId
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`
      },
      body: e.requestBody,
      errors: {
        401: r.s401,
        404: r.s404
      }
    });
  }
  remove(e) {
    return a(s, {
      method: "DELETE",
      url: "/api/tasks/{taskId}",
      path: {
        taskId: e.taskId
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`
      },
      errors: {
        401: r.s401,
        404: r.s404
      }
    });
  }
}
class W {
  constructor() {
    this.accessToken = null, this.ActionService = new L(this), this.AttachmentService = new H(this), this.AuthService = new O(this), this.BoardService = new N(this), this.CardService = new x(this), this.LabelService = new U(this), this.ListService = new G(this), this.NotificationService = new M(this), this.ProjectService = new F(this), this.TaskService = new V(this), this.UserService = new D(this);
  }
  setAccessToken(e) {
    this.accessToken = e;
  }
  getAccessToken() {
    return this.accessToken;
  }
}
export {
  k as ApiError,
  E as CancelError,
  S as CancelablePromise,
  s as OpenAPI,
  W as Planka,
  r as StatusCode
};
