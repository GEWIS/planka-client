class A extends Error {
  constructor(e, r, n) {
    super(n), this.name = "ApiError", this.url = r.url, this.status = r.status, this.statusText = r.statusText, this.body = r.body, this.request = e;
  }
}
class S extends Error {
  constructor(e) {
    super(e), this.name = "CancelError";
  }
  get isCancelled() {
    return !0;
  }
}
class w {
  constructor(e) {
    this._isResolved = !1, this._isRejected = !1, this._isCancelled = !1, this.cancelHandlers = [], this.promise = new Promise((r, n) => {
      this._resolve = r, this._reject = n;
      const s = (c) => {
        this._isResolved || this._isRejected || this._isCancelled || (this._isResolved = !0, this._resolve && this._resolve(c));
      }, a = (c) => {
        this._isResolved || this._isRejected || this._isCancelled || (this._isRejected = !0, this._reject && this._reject(c));
      }, o = (c) => {
        this._isResolved || this._isRejected || this._isCancelled || this.cancelHandlers.push(c);
      };
      return Object.defineProperty(o, "isResolved", {
        get: () => this._isResolved
      }), Object.defineProperty(o, "isRejected", {
        get: () => this._isRejected
      }), Object.defineProperty(o, "isCancelled", {
        get: () => this._isCancelled
      }), e(s, a, o);
    });
  }
  get [Symbol.toStringTag]() {
    return "Cancellable Promise";
  }
  then(e, r) {
    return this.promise.then(e, r);
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
      this.cancelHandlers.length = 0, this._reject && this._reject(new S("Request aborted"));
    }
  }
  get isCancelled() {
    return this._isCancelled;
  }
}
class b {
  constructor() {
    this._fns = [];
  }
  eject(e) {
    const r = this._fns.indexOf(e);
    r !== -1 && (this._fns = [...this._fns.slice(0, r), ...this._fns.slice(r + 1)]);
  }
  use(e) {
    this._fns = [...this._fns, e];
  }
}
const l = {
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
    request: new b(),
    response: new b()
  }
};
var i = /* @__PURE__ */ ((t) => (t.s400 = "Bad request", t.s401 = "Unauthorized", t.s404 = "Not found", t.s409 = "Conflict", t.s422 = "Bad request (unprocessable)", t))(i || {});
const f = (t) => typeof t == "string", y = (t) => f(t) && t !== "", T = (t) => t instanceof Blob, R = (t) => t instanceof FormData, k = (t) => {
  try {
    return btoa(t);
  } catch {
    return Buffer.from(t).toString("base64");
  }
}, C = (t) => {
  const e = [], r = (s, a) => {
    e.push(`${encodeURIComponent(s)}=${encodeURIComponent(String(a))}`);
  }, n = (s, a) => {
    a != null && (a instanceof Date ? r(s, a.toISOString()) : Array.isArray(a) ? a.forEach((o) => n(s, o)) : typeof a == "object" ? Object.entries(a).forEach(([o, c]) => n(`${s}[${o}]`, c)) : r(s, a));
  };
  return Object.entries(t).forEach(([s, a]) => n(s, a)), e.length ? `?${e.join("&")}` : "";
}, I = (t, e) => {
  const r = t.ENCODE_PATH || encodeURI, n = e.url.replace("{api-version}", t.VERSION).replace(/{(.*?)}/g, (a, o) => Object.prototype.hasOwnProperty.call(e.path, o) ? r(String(e.path[o])) : a), s = t.BASE + n;
  return e.query ? s + C(e.query) : s;
}, j = (t) => {
  if (t.formData) {
    const e = new FormData(), r = (n, s) => {
      f(s) || T(s) ? e.append(n, s) : e.append(n, JSON.stringify(s));
    };
    return Object.entries(t.formData).filter(([, n]) => n != null).forEach(([n, s]) => {
      Array.isArray(s) ? s.forEach((a) => r(n, a)) : r(n, s);
    }), e;
  }
}, p = async (t, e) => typeof e == "function" ? e(t) : e, q = async (t, e) => {
  const [r, n, s, a] = await Promise.all([
    p(e, t.TOKEN),
    p(e, t.USERNAME),
    p(e, t.PASSWORD),
    p(e, t.HEADERS)
  ]), o = Object.entries({
    Accept: "application/json",
    ...a,
    ...e.headers
  }).filter(([, c]) => c != null).reduce((c, [h, d]) => ({
    ...c,
    [h]: String(d)
  }), {});
  if (y(r) && (o.Authorization = `Bearer ${r}`), y(n) && y(s)) {
    const c = k(`${n}:${s}`);
    o.Authorization = `Basic ${c}`;
  }
  return e.body !== void 0 && (e.mediaType ? o["Content-Type"] = e.mediaType : T(e.body) ? o["Content-Type"] = e.body.type || "application/octet-stream" : f(e.body) ? o["Content-Type"] = "text/plain" : R(e.body) || (o["Content-Type"] = "application/json")), new Headers(o);
}, B = (t) => {
  var e, r;
  if (t.body !== void 0)
    return (e = t.mediaType) != null && e.includes("application/json") || (r = t.mediaType) != null && r.includes("+json") ? JSON.stringify(t.body) : f(t.body) || T(t.body) || R(t.body) ? t.body : JSON.stringify(t.body);
}, P = async (t, e, r, n, s, a, o) => {
  const c = new AbortController();
  let h = {
    headers: a,
    body: n ?? s,
    method: e.method,
    signal: c.signal
  };
  t.WITH_CREDENTIALS && (h.credentials = t.CREDENTIALS);
  for (const d of t.interceptors.request._fns)
    h = await d(h);
  return o(() => c.abort()), await fetch(r, h);
}, O = (t, e) => {
  if (e) {
    const r = t.headers.get(e);
    if (f(r))
      return r;
  }
}, N = async (t) => {
  if (t.status !== 204)
    try {
      const e = t.headers.get("Content-Type");
      if (e) {
        const r = ["application/octet-stream", "application/pdf", "application/zip", "audio/", "image/", "video/"];
        if (e.includes("application/json") || e.includes("+json"))
          return await t.json();
        if (r.some((n) => e.includes(n)))
          return await t.blob();
        if (e.includes("multipart/form-data"))
          return await t.formData();
        if (e.includes("text/"))
          return await t.text();
      }
    } catch (e) {
      console.error(e);
    }
}, D = (t, e) => {
  const n = {
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
  if (n)
    throw new A(t, e, n);
  if (!e.ok) {
    const s = e.status ?? "unknown", a = e.statusText ?? "unknown", o = (() => {
      try {
        return JSON.stringify(e.body, null, 2);
      } catch {
        return;
      }
    })();
    throw new A(
      t,
      e,
      `Generic Error: status: ${s}; status text: ${a}; body: ${o}`
    );
  }
}, u = (t, e) => new w(async (r, n, s) => {
  try {
    const a = I(t, e), o = j(e), c = B(e), h = await q(t, e);
    if (!s.isCancelled) {
      let d = await P(t, e, a, c, o, h, s);
      for (const _ of t.interceptors.response._fns)
        d = await _(d);
      const E = await N(d), g = O(d, e.responseHeader), m = {
        url: a,
        ok: d.ok,
        status: d.status,
        statusText: d.statusText,
        body: g ?? E
      };
      D(e, m), r(m.body);
    }
  } catch (a) {
    n(a);
  }
});
class U {
  constructor(e) {
    this.planka = e;
  }
  /**
     * @returns SingleResponse<Oidc> Ok
     */
  getConfig() {
    return u(l, {
      method: "GET",
      url: "/api/config"
    });
  }
  /**
     * @returns none Ok
     * @throws ApiError
     */
  async authorize(e) {
    const r = await u(l, {
      method: "POST",
      url: "/api/access-tokens",
      body: e.requestBody,
      errors: {
        400: i.s400
      }
    });
    this.planka.setAccessToken(r.item);
  }
  /**
     * @returns none Ok
     * @throws ApiError
     */
  async authorizeOidc(e) {
    const r = await u(l, {
      method: "POST",
      url: "/api/access-tokens/exchange-using-oidc",
      body: e.requestBody,
      errors: {
        400: i.s400
      }
    });
    this.planka.setAccessToken(r.item);
  }
  /**
     * @returns none Ok
     * @throws ApiError
     */
  async unauthorize() {
    await u(l, {
      method: "DELETE",
      url: "/api/access-tokens/me",
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`
      },
      errors: {
        401: i.s401
      }
    }), this.planka.setAccessToken(null);
  }
}
class v {
  constructor(e) {
    this.planka = e;
  }
  /**
   * @returns ArrayResponse<User> Ok
   * @throws ApiError
   */
  getUsers() {
    return u(l, {
      method: "GET",
      url: "/api/users",
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`
      },
      errors: {
        401: i.s401,
        404: i.s404
      }
    });
  }
  /**
   * @param data The data for the request.
   * @param data.requestBody
   * @returns SingleResponse<User> Ok
   * @throws ApiError
   */
  createUser(e) {
    return u(l, {
      method: "POST",
      url: "/api/users",
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`
      },
      body: e.requestBody,
      errors: {
        401: i.s401,
        404: i.s404
      }
    });
  }
  /**
   * @param data The data for the request.
   * @param data.userId
   * @returns SingleResponse<User> Ok
   * @throws ApiError
   */
  getUser(e) {
    return u(l, {
      method: "GET",
      url: "/api/users/{userId}",
      path: {
        userId: e.userId
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`
      },
      errors: {
        401: i.s401,
        404: i.s404
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
  updateUser(e) {
    return u(l, {
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
        400: i.s400,
        401: i.s401,
        404: i.s404
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
  deleteUser(e) {
    return u(l, {
      method: "DELETE",
      url: "/api/users/{userId}",
      path: {
        userId: e.userId
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`
      },
      errors: {
        401: i.s401,
        404: i.s404
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
  updateUserMail(e) {
    return u(l, {
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
        400: i.s400,
        401: i.s401,
        404: i.s404,
        409: i.s409
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
  updateUserPassword(e) {
    return u(l, {
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
        400: i.s400,
        401: i.s401,
        404: i.s404,
        409: i.s409
      }
    });
  }
}
class H {
  constructor() {
    this.accessToken = null, this.AuthService = new U(this), this.UserService = new v(this);
  }
  setAccessToken(e) {
    this.accessToken = e;
  }
  getAccessToken() {
    return this.accessToken;
  }
}
export {
  A as ApiError,
  S as CancelError,
  w as CancelablePromise,
  l as OpenAPI,
  H as Planka,
  i as StatusCode
};
