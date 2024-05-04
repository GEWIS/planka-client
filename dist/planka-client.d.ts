export declare type $OpenApiTs = {
    '/config': {
        get: {
            res: {
                200: SingleResponse<Oidc>;
            };
        };
    };
    '/access-tokens': {
        post: {
            req: {
                requestBody: AccessTokenRequest;
            };
            res: {
                200: SingleResponse<string>;
                400: BadRequestError;
            };
        };
    };
    '/access-tokens/exchange-using-oidc': {
        get: {
            req: {
                requestBody: AccessTokenOidcRequest;
            };
            res: {
                200: SingleResponse<string>;
                400: BadRequestError;
                401: UnauthorizedError;
            };
        };
    };
    '/access-tokens/me': {
        res: {
            200: SingleResponse<string>;
            401: UnauthorizedError;
        };
    };
    '/users': {
        get: {
            res: {
                200: ArrayResponse<User>;
                401: UnauthorizedError;
            };
        };
        post: {
            req: {
                requestBody: UserCreate;
            };
            res: {
                200: SingleResponse<User>;
                400: BadRequestError;
                401: UnauthorizedError;
            };
        };
    };
    '/users/{userId}': {
        get: {
            req: {
                userId: string;
            };
            res: {
                200: SingleResponse<User>;
                401: UnauthorizedError;
                404: NotFoundError;
            };
        };
        patch: {
            req: {
                userId: string;
                requestBody: User;
            };
            res: {
                200: SingleResponse<User>;
                400: BadRequestError;
                401: UnauthorizedError;
                404: NotFoundError;
            };
        };
        delete: {
            req: {
                userId: string;
                requestBody: User;
            };
            res: {
                200: void;
                401: UnauthorizedError;
                404: NotFoundError;
            };
        };
    };
    '/users/{id}/email': {
        patch: {};
    };
    '/users/{id}/password': {
        patch: {};
    };
    '/users/{id}/username': {
        patch: {};
    };
    '/users/{id}/avatar': {
        post: {};
    };
    '/projects': {
        get: {};
        post: {};
    };
    '/projects/{id}': {
        get: {};
        patch: {};
        delete: {};
    };
    '/projects/{id}/background-image': {
        post: {};
    };
    '/projects/{id}/manager': {
        post: {};
    };
    '/project-managers/{id}': {
        delete: {};
    };
    '/projects/{id}/boards': {
        post: {};
    };
    '/boards/{id}': {
        get: {};
        patch: {};
        delete: {};
    };
    '/boards/{id}/memberships': {
        post: {};
    };
    '/board-memberships/{id}': {
        update: {};
        delete: {};
    };
    '/boards/{id}/labels': {
        post: {};
    };
    '/labels/{id}': {
        patch: {};
        delete: {};
    };
    '/boards/{id}/lists': {
        post: {};
    };
    '/lists/{id}': {
        patch: {};
        delete: {};
    };
    '/lists/{id}/sort': {
        post: {};
    };
    '/lists/{id}/cards': {
        post: {};
    };
    '/cards/{id}': {
        get: {};
        patch: {};
        delete: {};
    };
    '/cards/{id}/duplicate': {
        post: {};
    };
    '/cards/{id}/memberships': {
        post: {};
        delete: {};
    };
    '/cards/{id}/labels': {
        post: {};
    };
    '/cards/{id}/labels/{labelId}': {
        delete: {};
    };
    '/cards/{id}/tasks': {
        post: {};
    };
    '/tasks/{id}': {
        patch: {};
        delete: {};
    };
    '/cards/{id}/attachments': {
        post: {};
    };
    '/attachments/{id}': {
        patch: {};
        delete: {};
    };
    '/cards/{id}/actions': {
        get: {};
    };
    '/cards/{id}/comment-actions': {
        get: {};
    };
    '/comment-actions/{id}': {
        patch: {};
        delete: {};
    };
    '/notifications': {
        get: {};
    };
    '/notifications/{id}': {
        get: {};
        patch: {};
    };
    '/attachments/{id}/download/{filename}': {
        get: {};
    };
    '/attachments/{id}/download/thumbnails/cover-256.{extension}': {
        get: {};
    };
};

export declare type AccessTokenOidcRequest = {
    code: string;
    nonce: string;
};

export declare type AccessTokenRequest = {
    emailOrUsername: string;
    password: string;
};

export declare class ApiError extends Error {
    readonly url: string;
    readonly status: number;
    readonly statusText: string;
    readonly body: unknown;
    readonly request: ApiRequestOptions;
    constructor(request: ApiRequestOptions, response: ApiResult, message: string);
}

declare type ApiRequestOptions = {
    readonly method: 'GET' | 'PUT' | 'POST' | 'DELETE' | 'OPTIONS' | 'HEAD' | 'PATCH';
    readonly url: string;
    readonly path?: Record<string, unknown>;
    readonly cookies?: Record<string, unknown>;
    readonly headers?: Record<string, unknown>;
    readonly query?: Record<string, unknown>;
    readonly formData?: Record<string, unknown>;
    readonly body?: any;
    readonly mediaType?: string;
    readonly responseHeader?: string;
    readonly errors?: Record<number, string>;
};

declare type ApiResult<TData = any> = {
    readonly body: TData;
    readonly ok: boolean;
    readonly status: number;
    readonly statusText: string;
    readonly url: string;
};

export declare type ArrayResponse<T> = {
    items: T[];
};

export declare type BadRequestError = {
    code: string;
    problems: string[];
    message: string;
};

export declare class CancelablePromise<T> implements Promise<T> {
    private _isResolved;
    private _isRejected;
    private _isCancelled;
    readonly cancelHandlers: (() => void)[];
    readonly promise: Promise<T>;
    private _resolve?;
    private _reject?;
    constructor(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: unknown) => void, onCancel: OnCancel) => void);
    get [Symbol.toStringTag](): string;
    then<TResult1 = T, TResult2 = never>(onFulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null, onRejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null): Promise<TResult1 | TResult2>;
    catch<TResult = never>(onRejected?: ((reason: unknown) => TResult | PromiseLike<TResult>) | null): Promise<T | TResult>;
    finally(onFinally?: (() => void) | null): Promise<T>;
    cancel(): void;
    get isCancelled(): boolean;
}

export declare class CancelError extends Error {
    constructor(message: string);
    get isCancelled(): boolean;
}

declare type Headers_2 = Record<string, string>;

declare class Interceptors<T> {
    _fns: Middleware<T>[];
    constructor();
    eject(fn: Middleware<T>): void;
    use(fn: Middleware<T>): void;
}

declare type Middleware<T> = (value: T) => T | Promise<T>;

export declare type NotFoundError = {
    code: string;
};

export declare type Oidc = {
    oidc: string;
};

declare interface OnCancel {
    readonly isResolved: boolean;
    readonly isRejected: boolean;
    readonly isCancelled: boolean;
    (cancelHandler: () => void): void;
}

export declare const OpenAPI: OpenAPIConfig;

export declare type OpenAPIConfig = {
    BASE: string;
    CREDENTIALS: 'include' | 'omit' | 'same-origin';
    ENCODE_PATH?: ((path: string) => string) | undefined;
    HEADERS?: Headers_2 | Resolver<Headers_2> | undefined;
    PASSWORD?: string | Resolver<string> | undefined;
    TOKEN?: string | Resolver<string> | undefined;
    USERNAME?: string | Resolver<string> | undefined;
    VERSION: string;
    WITH_CREDENTIALS: boolean;
    interceptors: {
        request: Interceptors<RequestInit>;
        response: Interceptors<Response>;
    };
};

export declare class PlankaService {
    /**
     * @returns User Ok
     * @throws ApiError
     */
    static getUsers(): CancelablePromise<$OpenApiTs['/users']['get']['res'][200]>;
    /**
     * @param data The data for the request.
     * @param data.requestBody
     * @returns User Ok
     * @throws ApiError
     */
    static createUser(data: $OpenApiTs['/users']['post']['req']): CancelablePromise<$OpenApiTs['/users']['post']['res'][200]>;
    /**
     * @param data The data for the request.
     * @param data.userId
     * @returns User Ok
     * @throws ApiError
     */
    static getUser(data: $OpenApiTs['/users/{userId}']['get']['req']): CancelablePromise<$OpenApiTs['/users/{userId}']['get']['res'][200]>;
    /**
     * @param data The data for the request.
     * @param data.userId
     * @param data.requestBody
     * @returns User Ok
     * @throws ApiError
     */
    static updateUser(data: $OpenApiTs['/users/{userId}']['patch']['req']): CancelablePromise<$OpenApiTs['/users/{userId}']['patch']['res'][200]>;
    /**
     * @param data The data for the request.
     * @param data.userId
     * @param data.requestBody
     * @returns User Ok
     * @throws ApiError
     */
    static deleteUser(data: $OpenApiTs['/users/{userId}']['delete']['req']): CancelablePromise<$OpenApiTs['/users/{userId}']['delete']['res'][200]>;
}

declare type Resolver<T> = (options: ApiRequestOptions) => Promise<T>;

export declare type SingleResponse<T> = {
    item: T;
};

export declare type UnauthorizedError = {
    code: string;
    message: string;
};

export declare type User = {
    id: string;
    email?: string;
    isAdmin: boolean;
    name?: string;
    username?: string;
    phone?: string;
    organization?: string;
    language?: string;
    subscribeToOwnCards: boolean;
    createdAt: Date;
    updatedAt?: Date;
    deletedAt?: Date;
};

export declare type UserCreate = {
    email: string;
    password: string;
    name: string;
    username?: string;
};

export { }
