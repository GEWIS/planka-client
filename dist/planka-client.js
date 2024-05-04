class b extends Error {
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
class A {
  constructor(e) {
    this._isResolved = !1, this._isRejected = !1, this._isCancelled = !1, this.cancelHandlers = [], this.promise = new Promise((r, n) => {
      this._resolve = r, this._reject = n;
      const s = (a) => {
        this._isResolved || this._isRejected || this._isCancelled || (this._isResolved = !0, this._resolve && this._resolve(a));
      }, o = (a) => {
        this._isResolved || this._isRejected || this._isCancelled || (this._isRejected = !0, this._reject && this._reject(a));
      }, i = (a) => {
        this._isResolved || this._isRejected || this._isCancelled || this.cancelHandlers.push(a);
      };
      return Object.defineProperty(i, "isResolved", {
        get: () => this._isResolved
      }), Object.defineProperty(i, "isRejected", {
        get: () => this._isRejected
      }), Object.defineProperty(i, "isCancelled", {
        get: () => this._isCancelled
      }), e(s, o, i);
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
class m {
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
const d = {
  BASE: process.env.PLANKA_URL || "http://localhost:3000/api",
  CREDENTIALS: "include",
  ENCODE_PATH: void 0,
  HEADERS: void 0,
  PASSWORD: void 0,
  TOKEN: void 0,
  USERNAME: void 0,
  VERSION: "1.0.0",
  WITH_CREDENTIALS: !1,
  interceptors: {
    request: new m(),
    response: new m()
  }
}, h = (t) => typeof t == "string", y = (t) => h(t) && t !== "", p = (t) => t instanceof Blob, R = (t) => t instanceof FormData, w = (t) => {
  try {
    return btoa(t);
  } catch {
    return Buffer.from(t).toString("base64");
  }
}, C = (t) => {
  const e = [], r = (s, o) => {
    e.push(`${encodeURIComponent(s)}=${encodeURIComponent(String(o))}`);
  }, n = (s, o) => {
    o != null && (o instanceof Date ? r(s, o.toISOString()) : Array.isArray(o) ? o.forEach((i) => n(s, i)) : typeof o == "object" ? Object.entries(o).forEach(([i, a]) => n(`${s}[${i}]`, a)) : r(s, o));
  };
  return Object.entries(t).forEach(([s, o]) => n(s, o)), e.length ? `?${e.join("&")}` : "";
}, j = (t, e) => {
  const r = t.ENCODE_PATH || encodeURI, n = e.url.replace("{api-version}", t.VERSION).replace(/{(.*?)}/g, (o, i) => Object.prototype.hasOwnProperty.call(e.path, i) ? r(String(e.path[i])) : o), s = t.BASE + n;
  return e.query ? s + C(e.query) : s;
}, I = (t) => {
  if (t.formData) {
    const e = new FormData(), r = (n, s) => {
      h(s) || p(s) ? e.append(n, s) : e.append(n, JSON.stringify(s));
    };
    return Object.entries(t.formData).filter(([, n]) => n != null).forEach(([n, s]) => {
      Array.isArray(s) ? s.forEach((o) => r(n, o)) : r(n, s);
    }), e;
  }
}, f = async (t, e) => typeof e == "function" ? e(t) : e, U = async (t, e) => {
  const [r, n, s, o] = await Promise.all([
    f(e, t.TOKEN),
    f(e, t.USERNAME),
    f(e, t.PASSWORD),
    f(e, t.HEADERS)
  ]), i = Object.entries({
    Accept: "application/json",
    ...o,
    ...e.headers
  }).filter(([, a]) => a != null).reduce((a, [l, c]) => ({
    ...a,
    [l]: String(c)
  }), {});
  if (y(r) && (i.Authorization = `Bearer ${r}`), y(n) && y(s)) {
    const a = w(`${n}:${s}`);
    i.Authorization = `Basic ${a}`;
  }
  return e.body !== void 0 && (e.mediaType ? i["Content-Type"] = e.mediaType : p(e.body) ? i["Content-Type"] = e.body.type || "application/octet-stream" : h(e.body) ? i["Content-Type"] = "text/plain" : R(e.body) || (i["Content-Type"] = "application/json")), new Headers(i);
}, q = (t) => {
  var e, r;
  if (t.body !== void 0)
    return (e = t.mediaType) != null && e.includes("application/json") || (r = t.mediaType) != null && r.includes("+json") ? JSON.stringify(t.body) : h(t.body) || p(t.body) || R(t.body) ? t.body : JSON.stringify(t.body);
}, O = async (t, e, r, n, s, o, i) => {
  const a = new AbortController();
  let l = {
    headers: o,
    body: n ?? s,
    method: e.method,
    signal: a.signal
  };
  t.WITH_CREDENTIALS && (l.credentials = t.CREDENTIALS);
  for (const c of t.interceptors.request._fns)
    l = await c(l);
  return i(() => a.abort()), await fetch(r, l);
}, N = (t, e) => {
  if (e) {
    const r = t.headers.get(e);
    if (h(r))
      return r;
  }
}, P = async (t) => {
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
}, B = (t, e) => {
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
    throw new b(t, e, n);
  if (!e.ok) {
    const s = e.status ?? "unknown", o = e.statusText ?? "unknown", i = (() => {
      try {
        return JSON.stringify(e.body, null, 2);
      } catch {
        return;
      }
    })();
    throw new b(
      t,
      e,
      `Generic Error: status: ${s}; status text: ${o}; body: ${i}`
    );
  }
}, u = (t, e) => new A(async (r, n, s) => {
  try {
    const o = j(t, e), i = I(e), a = q(e), l = await U(t, e);
    if (!s.isCancelled) {
      let c = await O(t, e, o, a, i, l, s);
      for (const g of t.interceptors.response._fns)
        c = await g(c);
      const E = await P(c), _ = N(c, e.responseHeader), T = {
        url: o,
        ok: c.ok,
        status: c.status,
        statusText: c.statusText,
        body: _ ?? E
      };
      B(e, T), r(T.body);
    }
  } catch (o) {
    n(o);
  }
});
class D {
  constructor() {
    this.accessToken = null;
  }
  /**
   * @returns SingleResponse<Oidc> Ok
   */
  getConfig() {
    return u(d, {
      method: "GET",
      url: "/config"
    });
  }
  /**
   * @returns none Ok
   * @throws ApiError
   */
  async authorize(e) {
    const r = await u(d, {
      method: "POST",
      url: "/access-tokens",
      body: e.requestBody,
      errors: {
        400: "Invalid request body"
      }
    });
    this.accessToken = r.item;
  }
  /**
   * @returns none Ok
   * @throws ApiError
   */
  async authorizeOidc(e) {
    const r = await u(d, {
      method: "POST",
      url: "/access-tokens/exchange-using-oidc",
      body: e.requestBody,
      errors: {
        400: "Invalid request body"
      }
    });
    this.accessToken = r.item;
  }
  /**
   * @returns none Ok
   * @throws ApiError
   */
  async unauthorize() {
    await u(d, {
      method: "DELETE",
      url: "/access-tokens/me",
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      },
      errors: {
        401: "Unauthorized"
      }
    }), this.accessToken = null;
  }
  /**
     * @returns ArrayResponse<User> Ok
     * @throws ApiError
     */
  getUsers() {
    return u(d, {
      method: "GET",
      url: "/users",
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      },
      errors: {
        401: "Unauthorized",
        404: "User not found"
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
    return u(d, {
      method: "GET",
      url: "/users",
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      },
      body: e.requestBody,
      errors: {
        401: "Unauthorized",
        404: "User not found"
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
    return u(d, {
      method: "GET",
      url: "/users/{userId}",
      path: {
        userId: e.userId
      },
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      },
      errors: {
        401: "Unauthorized",
        404: "User not found"
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
    return u(d, {
      method: "POST",
      url: "/users/{userId}",
      path: {
        userId: e.userId
      },
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      },
      body: e.requestBody,
      errors: {
        400: "Invalid request body",
        401: "Unauthorized",
        404: "User not found"
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
    return u(d, {
      method: "GET",
      url: "/users/{userId}",
      path: {
        userId: e.userId
      },
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      },
      errors: {
        401: "Unauthorized",
        404: "User not found"
      }
    });
  }
}
export {
  b as ApiError,
  S as CancelError,
  A as CancelablePromise,
  d as OpenAPI,
  D as PlankaService
};
