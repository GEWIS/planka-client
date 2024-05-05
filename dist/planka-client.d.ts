export declare type $OpenApiTs = {
    '/api/config': {
        get: {
            res: {
                200: SingleResponse<Oidc>;
            };
        };
    };
    '/api/access-tokens': {
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
    '/api/access-tokens/exchange-using-oidc': {
        post: {
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
    '/api/access-tokens/me': {
        delete: {
            res: {
                200: SingleResponse<string>;
                401: UnauthorizedError;
            };
        };
    };
    '/api/users': {
        get: {
            res: {
                200: ArrayResponse<User>;
                401: UnauthorizedError;
            };
        };
        post: {
            req: {
                requestBody: {
                    email: string;
                    password: string;
                    name: string;
                    username?: string;
                };
            };
            res: {
                200: SingleResponse<User>;
                400: BadRequestError;
                401: UnauthorizedError;
                409: ConflictError;
            };
        };
    };
    '/api/users/{userId}': {
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
                requestBody: Partial<User>;
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
    '/api/users/{userId}/email': {
        patch: {
            req: {
                userId: string;
                requestBody: {
                    email: string;
                };
            };
            res: {
                200: SingleResponse<User>;
                400: BadRequestError;
                401: UnauthorizedError;
                404: NotFoundError;
                409: ConflictError;
            };
        };
    };
    '/api/users/{userId}/password': {
        patch: {
            req: {
                userId: string;
                requestBody: {
                    password: string;
                };
            };
            res: {
                200: SingleResponse<User>;
                400: BadRequestError;
                401: UnauthorizedError;
                404: NotFoundError;
                409: ConflictError;
            };
        };
    };
    '/api/users/{userId}/username': {
        patch: {
            req: {
                userId: string;
                requestBody: {
                    username: string;
                };
            };
            res: {
                200: SingleResponse<User>;
                400: BadRequestError;
                401: UnauthorizedError;
                404: NotFoundError;
                409: ConflictError;
            };
        };
    };
    '/api/users/{userId}/avatar': {
        post: {
            req: {
                userId: string;
                requestBody: {
                    file: File;
                };
            };
            res: {
                200: SingleResponse<User>;
                400: BadRequestError;
                401: UnauthorizedError;
                404: NotFoundError;
                422: UnprocessableError;
            };
        };
    };
    '/api/projects': {
        get: {
            res: {
                200: ArrayResponse<Project>;
                401: UnauthorizedError;
            };
        };
        post: {
            req: {
                requestBody: {
                    name: string;
                };
            };
            res: {
                200: ArrayResponse<Project>;
                400: BadRequestError;
                401: UnauthorizedError;
            };
        };
    };
    '/api/projects/{projectId}': {
        get: {
            req: {
                projectId: string;
                requestBody: {
                    name: string;
                };
            };
            res: {
                200: SingleResponse<Project>;
                400: BadRequestError;
                401: UnauthorizedError;
                404: NotFoundError;
            };
        };
        patch: {
            req: {
                projectId: string;
                requestBody: Partial<Project>;
            };
            res: {
                200: SingleResponse<Project>;
                401: UnauthorizedError;
                404: NotFoundError;
            };
        };
        delete: {
            req: {
                projectId: string;
            };
            res: {
                200: SingleResponse<Project>;
                401: UnauthorizedError;
                404: NotFoundError;
            };
        };
    };
    '/api/projects/{projectId}/background-image': {
        post: {
            req: {
                projectId: string;
                requestBody: {
                    file: File;
                };
            };
            res: {
                200: SingleResponse<Project>;
                401: UnauthorizedError;
                404: NotFoundError;
                422: UnprocessableError;
            };
        };
    };
    '/api/projects/{projectId}/manager': {
        post: {
            req: {
                projectId: string;
                requestBody: {
                    userId: string;
                };
            };
            res: {
                200: SingleResponse<ProjectManager>;
                400: BadRequestError;
                401: UnauthorizedError;
                404: NotFoundError;
            };
        };
    };
    '/api/project-managers/{managerId}': {
        delete: {
            req: {
                managerId: string;
            };
            res: {
                200: SingleResponse<ProjectManager>;
                401: UnauthorizedError;
                404: NotFoundError;
            };
        };
    };
    '/api/projects/{projectId}/boards': {
        post: {
            req: {
                projectId: string;
                requestBody: {
                    position: number;
                    name: string;
                };
            };
            res: {
                200: SingleResponse<Board>;
                400: BadRequestError;
                401: UnauthorizedError;
                404: NotFoundError;
            };
        };
    };
    '/api/boards/{boardId}': {
        get: {
            req: {
                boardId: string;
            };
            res: {
                200: SingleResponse<Board>;
                401: UnauthorizedError;
                404: NotFoundError;
            };
        };
        patch: {
            req: {
                boardId: string;
                requestBody: Partial<Board>;
            };
            res: {
                200: SingleResponse<Board>;
                401: UnauthorizedError;
                404: NotFoundError;
            };
        };
        delete: {
            req: {
                boardId: string;
            };
            res: {
                200: SingleResponse<Board>;
                401: UnauthorizedError;
                404: NotFoundError;
            };
        };
    };
    '/api/boards/{boardId}/memberships': {
        post: {
            req: {
                boardId: string;
                requestBody: {
                    userId: string;
                    role: Role;
                };
            };
            res: {
                200: SingleResponse<Board>;
                400: BadRequestError;
                401: UnauthorizedError;
                404: NotFoundError;
                409: ConflictError;
            };
        };
    };
    '/api/board-memberships/{membershipId}': {
        update: {
            req: {
                membershipId: string;
                requestBody: {
                    role: Role;
                    canComment: boolean;
                };
            };
            res: {
                200: SingleResponse<BoardMembership>;
                401: UnauthorizedError;
                404: NotFoundError;
            };
        };
        delete: {
            req: {
                membershipId: string;
            };
            res: {
                200: SingleResponse<BoardMembership>;
                401: UnauthorizedError;
                404: NotFoundError;
            };
        };
    };
    '/api/boards/{boardId}/labels': {
        post: {
            req: {
                boardId: string;
                requestBody: {
                    position: number;
                    color: LabelColor;
                };
            };
            res: {
                200: SingleResponse<Label>;
                400: BadRequestError;
                401: UnauthorizedError;
                404: NotFoundError;
            };
        };
    };
    '/api/labels/{labelId}': {
        patch: {
            req: {
                labelId: string;
                requestBody: Partial<Label>;
            };
            res: {
                200: SingleResponse<Label>;
                401: UnauthorizedError;
                404: NotFoundError;
            };
        };
        delete: {
            req: {
                labelId: string;
            };
            res: {
                200: SingleResponse<Label>;
                401: UnauthorizedError;
                404: NotFoundError;
            };
        };
    };
    '/api/boards/{boardId}/lists': {
        post: {
            req: {
                boardId: string;
                requestBody: {
                    position: number;
                    name: string;
                };
            };
            res: {
                200: SingleResponse<List>;
                400: BadRequestError;
                401: UnauthorizedError;
                404: NotFoundError;
            };
        };
    };
    '/api/lists/{listId}': {
        patch: {
            req: {
                listId: string;
                requestBody: Partial<List>;
            };
            res: {
                200: SingleResponse<List>;
                401: UnauthorizedError;
                404: NotFoundError;
            };
        };
        delete: {
            req: {
                listId: string;
            };
            res: {
                200: SingleResponse<Label>;
                401: UnauthorizedError;
                404: NotFoundError;
            };
        };
    };
    '/api/lists/{listId}/sort': {
        post: {
            req: {
                listId: number;
            };
            res: {
                200: SingleResponse<List>;
                401: UnauthorizedError;
                404: NotFoundError;
            };
        };
    };
    '/api/lists/{listId}/cards': {
        post: {
            req: {
                listId: number;
                requestBody: {
                    name: string;
                    position: number;
                };
            };
            res: {
                200: SingleResponse<List>;
                400: BadRequestError;
                401: UnauthorizedError;
                404: NotFoundError;
                422: UnprocessableError;
            };
        };
    };
    '/api/cards/{cardId}': {
        get: {
            req: {
                cardId: string;
            };
            res: {
                200: SingleResponse<Card>;
                401: UnauthorizedError;
                404: NotFoundError;
            };
        };
        patch: {
            req: {
                cardId: string;
                requestBody: Partial<Card>;
            };
            res: {
                200: SingleResponse<Card>;
                401: UnauthorizedError;
                404: NotFoundError;
            };
        };
        delete: {
            req: {
                cardId: string;
            };
            res: {
                200: SingleResponse<Card>;
                401: UnauthorizedError;
                404: NotFoundError;
            };
        };
    };
    '/api/cards/{cardId}/duplicate': {
        post: {
            req: {
                cardId: string;
                requestBody: {
                    position: number;
                };
            };
            res: {
                200: SingleResponse<Card>;
                400: BadRequestError;
                401: UnauthorizedError;
                404: NotFoundError;
            };
        };
    };
    '/api/cards/{cardId}/memberships': {
        post: {
            req: {
                cardId: string;
                requestBody: {
                    userId: string;
                };
            };
            res: {
                200: SingleResponse<CardMembership>;
                400: BadRequestError;
                401: UnauthorizedError;
                404: NotFoundError;
            };
        };
        delete: {
            req: {
                cardId: string;
                requestBody: {
                    userId: string;
                };
            };
            res: {
                200: SingleResponse<CardMembership>;
                400: BadRequestError;
                401: UnauthorizedError;
                404: NotFoundError;
            };
        };
    };
    '/api/cards/{cardId}/labels': {
        post: {
            req: {
                cardId: string;
                requestBody: {
                    labelId: string;
                };
            };
            res: {
                200: SingleResponse<CardLabel>;
                400: BadRequestError;
                401: UnauthorizedError;
                404: NotFoundError;
            };
        };
    };
    '/api/cards/{cardId}/labels/{labelId}': {
        delete: {
            req: {
                cardId: string;
                labelId: string;
            };
            res: {
                200: SingleResponse<CardLabel>;
                400: BadRequestError;
                401: UnauthorizedError;
                404: NotFoundError;
            };
        };
    };
    '/api/cards/{cardId}/tasks': {
        post: {
            req: {
                cardId: string;
                requestBody: {
                    position: number;
                    name: string;
                };
            };
            res: {
                200: SingleResponse<Task>;
                400: BadRequestError;
                401: UnauthorizedError;
                404: NotFoundError;
            };
        };
    };
    '/api/tasks/{taskId}': {
        patch: {
            req: {
                taskId: string;
                requestBody: Partial<Task>;
            };
            res: {
                200: SingleResponse<Task>;
                401: UnauthorizedError;
                404: NotFoundError;
            };
        };
        delete: {
            req: {
                taskId: string;
            };
            res: {
                200: SingleResponse<Task>;
                401: UnauthorizedError;
                404: NotFoundError;
            };
        };
    };
    '/api/cards/{cardId}/attachments': {
        post: {
            req: {
                cardId: string;
                requestBody: {
                    file: File;
                };
            };
            res: {
                200: SingleResponse<Attachment>;
                401: UnauthorizedError;
                404: NotFoundError;
                422: UnprocessableError;
            };
        };
    };
    '/api/attachments/{attachmentId}': {
        patch: {
            req: {
                attachmentId: string;
                requestBody: Partial<Attachment>;
            };
            res: {
                200: SingleResponse<Attachment>;
                401: UnauthorizedError;
                404: NotFoundError;
            };
        };
        delete: {
            req: {
                attachmentId: string;
            };
            res: {
                200: SingleResponse<Attachment>;
                401: UnauthorizedError;
                404: NotFoundError;
            };
        };
    };
    '/api/cards/{cardId}/actions': {
        get: {
            req: {
                cardId: string;
            };
            res: {
                200: ArrayResponse<Action>;
                401: UnauthorizedError;
                404: NotFoundError;
            };
        };
    };
    '/api/cards/{cardId}/comment-actions': {
        post: {
            req: {
                cardId: string;
                requestBody: {
                    text: string;
                };
            };
            res: {
                200: SingleResponse<Comment_2>;
                400: BadRequestError;
                401: UnauthorizedError;
                404: NotFoundError;
            };
        };
    };
    '/api/comment-actions/{actionId}': {
        'patch': {
            req: {
                actionId: string;
                requestBody: {
                    text: string;
                };
                res: {
                    200: SingleResponse<Comment_2>;
                    401: UnauthorizedError;
                    404: NotFoundError;
                };
            };
            delete: {
                req: {
                    actionId: string;
                };
                res: {
                    200: SingleResponse<Comment_2>;
                    401: UnauthorizedError;
                    404: NotFoundError;
                };
            };
        };
        '/api/notifications': {
            get: {
                res: {
                    200: ArrayResponse<Notification_2>;
                    401: UnauthorizedError;
                    404: NotFoundError;
                };
            };
        };
        '/api/notifications/{notificationId}': {
            get: {
                req: {
                    notificationId: string;
                };
                res: {
                    200: ArrayResponse<Notification_2>;
                    401: UnauthorizedError;
                    404: NotFoundError;
                };
            };
            patch: {
                req: {
                    notificationId: string;
                    requestBody: Partial<Notification_2>;
                };
                res: {
                    200: ArrayResponse<Notification_2>;
                    401: UnauthorizedError;
                    404: NotFoundError;
                };
            };
        };
        '/attachments/{attachmentId}/download/{filename}': {
            get: {
                req: {
                    attachmentId: string;
                    filename: string;
                };
                res: {
                    200: File;
                    401: UnauthorizedError;
                    404: NotFoundError;
                };
            };
        };
        '/attachments/{attachmentId}/download/thumbnails/cover-256.{extension}': {
            get: {
                req: {
                    attachmentId: string;
                    extension: string;
                };
                res: {
                    200: File;
                    401: UnauthorizedError;
                    404: NotFoundError;
                };
            };
        };
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

export declare type Action = {
    id: string;
    createdAt: Date;
    updatedAt?: Date;
    type: CommentType;
    data: ActionText;
    cardId: string;
    userId: string;
};

export declare type ActionText = {
    text: string;
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
    included?: Partial<Include>;
};

export declare type Attachment = {
    id: string;
    name: string;
    cardId: string;
    url: string;
    createUserId: string;
    createdAt: Date;
    updatedAt?: Date;
    coverUrl?: string;
    image?: Image_2;
};

declare class AuthService {
    private planka;
    constructor(planka: Planka);
    /**
     * @returns SingleResponse<Oidc> Ok
     */
    getConfig(): CancelablePromise<$OpenApiTs['/api/config']['get']['res'][200]>;
    /**
     * @returns none Ok
     * @throws ApiError
     */
    authorize(data: $OpenApiTs['/api/access-tokens']['post']['req']): Promise<void>;
    /**
     * @returns none Ok
     * @throws ApiError
     */
    authorizeOidc(data: $OpenApiTs['/api/access-tokens/exchange-using-oidc']['post']['req']): Promise<void>;
    /**
     * @returns none Ok
     * @throws ApiError
     */
    unauthorize(): Promise<void>;
}

export declare type Background = {
    type: BackgroundType;
    name?: BackgroundGradient;
};

export declare type BackgroundGradient = 'old-lime' | 'ocean-dive' | 'tzepesch-style' | 'jungle-mesh' | 'strawberry-dust' | 'purple-rose' | 'sun-scream' | 'warm-rust' | 'sky-change' | 'green-eyes' | 'blue-xchange' | 'blood-orange' | 'sour-peel' | 'green-ninja' | 'algae-green' | 'coral-reef' | 'steel-grey' | 'heat-waves' | 'velvet-lounge' | 'purple-rain' | 'blue-steel' | 'blueish-curve' | 'prism-light' | 'green-mist' | 'red-curtain';

export declare type BackgroundImage = {
    url?: string;
    coverUrl?: string;
};

export declare type BackgroundType = 'gradient' | 'image';

export declare type BadRequestError = BaseError & {
    problems: string[];
};

export declare type BaseError = {
    code: string;
    message: string;
};

export declare type Board = {
    id: string;
    createdAt: Date;
    updatedAt?: Date;
    position: number;
    name: string;
    projectId: string;
};

export declare type BoardMembership = {
    id: string;
    createdAt: Date;
    updatedAt?: Date;
    role: Role;
    canComment?: boolean;
    boardId: string;
    userId: string;
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

export declare type Card = {
    id: string;
    createdAt: Date;
    updatedAt?: Date;
    creatorUserId: string;
    position: number;
    name: string;
    description?: string;
    dueDate?: Date;
    stopWatch?: StopWatch;
    boardId: string;
    listId: string;
    coverAttachmentId?: string;
    isSubscribed: boolean;
};

export declare type CardLabel = {
    id: string;
    createdAt: Date;
    updatedAt?: Date;
    cardId: string;
    labelId?: string;
};

export declare type CardMembership = {
    id: string;
    createdAt: Date;
    updatedAt?: Date;
    cardId: string;
    userId: string;
};

declare type Comment_2 = {
    id: string;
    createdAt: Date;
    updatedAt?: Date;
    cardId: string;
    userId: string;
    data: ActionText;
    type: CommentType;
};
export { Comment_2 as Comment }

export declare type CommentType = 'commentCard';

export declare type ConflictError = BaseError;

declare type Headers_2 = Record<string, string>;

declare type Image_2 = {
    width: number;
    height: number;
};
export { Image_2 as Image }

export declare type Include = {
    users: User[];
    projectManagers: ProjectManager[];
    boards: Board[];
    boardMemberships: BoardMembership[];
    cardMemberships: Card[];
    cardLabels: Label[];
    actions: Action[];
    tasks: Action[];
};

declare class Interceptors<T> {
    _fns: Middleware<T>[];
    constructor();
    eject(fn: Middleware<T>): void;
    use(fn: Middleware<T>): void;
}

export declare type Label = {
    id: string;
    createdAt: Date;
    updatedAt?: Date;
    position: number;
    name: string;
    color: LabelColor;
    boardId: string;
};

export declare type LabelColor = 'berry-red' | 'pumpkin-orange' | 'lagoon-blue' | 'pink-tulip' | 'light-mud' | 'orange-peel' | 'bright-moss' | 'antique-blue' | 'dark-granite' | 'lagune-blue' | 'sunny-grass' | 'morning-sky' | 'light-orange' | 'midnight-blue' | 'tank-green' | 'gun-metal' | 'wet-moss' | 'red-burgundy' | 'light-concrete' | 'apricot-red' | 'desert-sand' | 'navy-blue' | 'egg-yellow' | 'coral-green' | 'light-cocoa';

export declare type List = {
    id: string;
    createdAt: Date;
    updatedAt?: Date;
    position: number;
    name: string;
    boardId: string;
};

declare type Middleware<T> = (value: T) => T | Promise<T>;

export declare type NotFoundError = Omit<BaseError, 'message'>;

declare type Notification_2 = {
    id: string;
    createdAt: Date;
    updatedAt?: Date;
    isRead: boolean;
    userId: string;
    cardId: string;
    actionId: string;
};
export { Notification_2 as Notification }

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

export declare class Planka {
    private accessToken;
    AuthService: AuthService;
    UserService: UserService;
    setAccessToken(accessToken: string): void;
    getAccessToken(): string;
    constructor();
}

export declare type Project = {
    id: string;
    createdAt: Date;
    updatedAt?: Date;
    name: string;
    background?: Background;
    backgroundImage?: BackgroundImage;
};

export declare type ProjectManager = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    projectId: string;
    userId: string;
};

declare type Resolver<T> = (options: ApiRequestOptions) => Promise<T>;

export declare type Role = 'editor' | 'viewer';

export declare type SingleResponse<T> = {
    item: T;
    included?: Partial<Include>;
};

export declare enum StatusCode {
    s400 = "Bad request",
    s401 = "Unauthorized",
    s404 = "Not found",
    s409 = "Conflict",
    s422 = "Bad request (unprocessable)"
}

export declare type StopWatch = {
    startedAt?: Date;
    total: number;
};

export declare type Task = {
    id: string;
    createdAt: Date;
    updatedAt?: Date;
    position: number;
    name: string;
    isCompleted: boolean;
    cardId: string;
};

export declare type UnauthorizedError = BaseError;

export declare type UnprocessableError = BaseError;

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
    avatarUrl?: string;
    createdAt: Date;
    updatedAt?: Date;
    deletedAt?: Date;
};

declare class UserService {
    private planka;
    constructor(planka: Planka);
    /**
     * @returns ArrayResponse<User> Ok
     * @throws ApiError
     */
    getUsers(): CancelablePromise<$OpenApiTs['/api/users']['get']['res'][200]>;
    /**
     * @param data The data for the request.
     * @param data.requestBody
     * @returns SingleResponse<User> Ok
     * @throws ApiError
     */
    createUser(data: $OpenApiTs['/api/users']['post']['req']): CancelablePromise<$OpenApiTs['/api/users']['post']['res'][200]>;
    /**
     * @param data The data for the request.
     * @param data.userId
     * @returns SingleResponse<User> Ok
     * @throws ApiError
     */
    getUser(data: $OpenApiTs['/api/users/{userId}']['get']['req']): CancelablePromise<$OpenApiTs['/api/users/{userId}']['get']['res'][200]>;
    /**
     * @param data The data for the request.
     * @param data.userId
     * @param data.requestBody
     * @returns SingleResponse<User> Ok
     * @throws ApiError
     */
    updateUser(data: $OpenApiTs['/api/users/{userId}']['patch']['req']): CancelablePromise<$OpenApiTs['/api/users/{userId}']['patch']['res'][200]>;
    /**
     * @param data The data for the request.
     * @param data.userId
     * @param data.requestBody
     * @returns SingleResponse<User> Ok
     * @throws ApiError
     */
    deleteUser(data: $OpenApiTs['/api/users/{userId}']['delete']['req']): CancelablePromise<$OpenApiTs['/api/users/{userId}']['delete']['res'][200]>;
    /**
     * @param data The data for the request.
     * @param data.userId
     * @param data.requestBody
     * @returns SingleResponse<User> Ok
     * @throws ApiError
     */
    updateUserMail(data: $OpenApiTs['/api/users/{userId}/email']['patch']['req']): CancelablePromise<$OpenApiTs['/api/users/{userId}/email']['patch']['res'][200]>;
    /**
     * @param data The data for the request.
     * @param data.userId
     * @param data.requestBody
     * @returns SingleResponse<User> Ok
     * @throws ApiError
     */
    updateUserPassword(data: $OpenApiTs['/api/users/{userId}/password']['patch']['req']): CancelablePromise<$OpenApiTs['/api/users/{userId}/password']['patch']['res'][200]>;
}

export { }
