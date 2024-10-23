import { Client } from '@hey-api/client-fetch';
import { Config } from '@hey-api/client-fetch';
import { Options } from '@hey-api/client-fetch';
import { RequestOptionsBase } from '@hey-api/client-fetch';
import { RequestResult } from '@hey-api/client-fetch';

/**
 * Authentication
 */
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

export declare type ArrayResponse<T> = {
    items: T[];
    included?: Partial<Include>;
};

/**
 * Attachments
 */
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

/**
 * Create access token
 * 'POST /api/access-tokens': 'access-tokens/create'
 * @param options
 */
export declare const authorize: <ThrowOnError extends boolean = false>(options: Options<AuthorizeRequest, ThrowOnError>) => RequestResult<AuthorizeResponse, HttpError, ThrowOnError>;

export declare type AuthorizeError = HttpError;

/**
 * Exchange access token using oidc
 * 'POST /api/access-tokens/exchange-using-oidc': 'access-tokens/exchange-using-oidc'
 * TODO -- this endpoint needs a written test
 * @param options
 */
export declare const authorizeOidc: <ThrowOnError extends boolean = false>(options: Options<AuthorizeOidcRequest, ThrowOnError>) => RequestResult<AuthorizeOidcResponse, HttpError, ThrowOnError>;

export declare type AuthorizeOidcRequest = {
    body: AccessTokenOidcRequest;
};

export declare type AuthorizeOidcResponse = SingleResponse<string>;

export declare type AuthorizeRequest = {
    body: AccessTokenRequest;
};

export declare type AuthorizeResponse = SingleResponse<string>;

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

/**
 * Boards
 */
export declare type Board = {
    id: string;
    createdAt: Date;
    updatedAt?: Date;
    position: number;
    name: string;
    projectId: string;
};

/**
 * Board memberships
 */
export declare type BoardMembership = {
    id: string;
    createdAt: Date;
    updatedAt?: Date;
    role: Role;
    canComment?: boolean;
    boardId: string;
    userId: string;
};

/**
 * Cards
 */
export declare type Card = {
    id: string;
    createdAt: Date;
    updatedAt?: Date;
    creatorUserId: string;
    position: number;
    name: string;
    description?: string;
    dueDate?: Date;
    isDueDateCompleted?: boolean;
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

export declare const client: Client<Request, Response, unknown, RequestOptionsBase<false> & Config<false> & {
headers: Headers;
}>;

/**
 * Comments
 */
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

/**
 * Create attachment
 * 'POST /api/cards/:cardId/attachments': 'attachments/create'
 * @param options
 */
export declare const createAttachment: <ThrowOnError extends boolean = false>(options: Options<CreateAttachmentRequest, ThrowOnError>) => RequestResult<CreateAttachmentResponse, HttpError, ThrowOnError>;

export declare type CreateAttachmentRequest = {
    path: {
        cardId: string;
    };
    body: {
        file: File;
    };
};

export declare type CreateAttachmentResponse = SingleResponse<Attachment>;

/**
 * Create board
 * 'POST /api/projects/:projectId/boards': 'boards/create'
 * @param options
 */
export declare const createBoard: <ThrowOnError extends boolean = false>(options: Options<CreateBoardRequest, ThrowOnError>) => RequestResult<CreateBoardResponse, HttpError, ThrowOnError>;

/**
 * Create board membership
 * 'POST /api/boards/:boardId/memberships': 'board-memberships/create'
 * @param options
 */
export declare const createBoardMembership: <ThrowOnError extends boolean = false>(options: Options<CreateBoardMembershipRequest, ThrowOnError>) => RequestResult<CreateBoardMembershipResponse, HttpError, ThrowOnError>;

export declare type CreateBoardMembershipRequest = {
    path: {
        boardId: string;
    };
    body: {
        userId: string;
        role: Role;
    };
};

export declare type CreateBoardMembershipResponse = SingleResponse<BoardMembership>;

export declare type CreateBoardRequest = {
    path: {
        projectId: string;
    };
    body: {
        position: number;
        name: string;
    };
};

export declare type CreateBoardResponse = SingleResponse<Board>;

/**
 * Create card
 * 'POST /api/lists/:listId/cards': 'cards/create'
 * @param options
 */
export declare const createCard: <ThrowOnError extends boolean = false>(options: Options<CreateCardRequest, ThrowOnError>) => RequestResult<CreateCardResponse, HttpError, ThrowOnError>;

/**
 * Create card label
 * 'POST /api/cards/:cardId/labels': 'card-labels/create'
 * @param options
 */
export declare const createCardLabel: <ThrowOnError extends boolean = false>(options: Options<CreateCardLabelRequest, ThrowOnError>) => RequestResult<CreateCardLabelResponse, HttpError, ThrowOnError>;

export declare type CreateCardLabelRequest = {
    path: {
        cardId: string;
    };
    body: {
        labelId: string;
    };
};

export declare type CreateCardLabelResponse = SingleResponse<CardLabel>;

/**
 * Create card membership
 * 'POST /api/cards/:cardId/memberships': 'card-memberships/create'
 * @param options
 */
export declare const createCardMembership: <ThrowOnError extends boolean = false>(options: Options<CreateCardMembershipRequest, ThrowOnError>) => RequestResult<CreateCardMembershipResponse, HttpError, ThrowOnError>;

export declare type CreateCardMembershipRequest = {
    path: {
        cardId: string;
    };
    body: {
        userId: string;
    };
};

export declare type CreateCardMembershipResponse = SingleResponse<CardMembership>;

export declare type CreateCardRequest = {
    path: {
        listId: string;
    };
    body: {
        name: string;
        position: number;
    };
};

export declare type CreateCardResponse = SingleResponse<Card>;

/**
 * Create comment action
 * 'POST /api/cards/:cardId/comment-actions': 'comment-actions/create'
 * @param options
 */
export declare const createCommentAction: <ThrowOnError extends boolean = false>(options: Options<CreateCommentActionRequest, ThrowOnError>) => RequestResult<CreateCommentActionResponse, HttpError, ThrowOnError>;

export declare type CreateCommentActionRequest = {
    path: {
        cardId: string;
    };
    body: {
        text: string;
    };
};

export declare type CreateCommentActionResponse = SingleResponse<Comment_2>;

/**
 * Create label
 * 'POST /api/boards/:boardId/labels': 'labels/create'
 * @param options
 */
export declare const createLabel: <ThrowOnError extends boolean = false>(options: Options<CreateLabelRequest, ThrowOnError>) => RequestResult<CreateLabelResponse, HttpError, ThrowOnError>;

export declare type CreateLabelRequest = {
    path: {
        boardId: string;
    };
    body: {
        name: string;
        position: number;
        color: LabelColor;
    };
};

export declare type CreateLabelResponse = SingleResponse<Label>;

/**
 * Create list
 * 'POST /api/boards/:boardId/lists': 'lists/create'
 * @param options
 */
export declare const createList: <ThrowOnError extends boolean = false>(options: Options<CreateListRequest, ThrowOnError>) => RequestResult<CreateListResponse, HttpError, ThrowOnError>;

export declare type CreateListRequest = {
    path: {
        boardId: string;
    };
    body: {
        position: number;
        name: string;
    };
};

export declare type CreateListResponse = SingleResponse<List>;

/**
 * Create project
 * 'POST /api/projects': 'projects/create'
 * @param options
 */
export declare const createProject: <ThrowOnError extends boolean = false>(options: Options<CreateProjectRequest, ThrowOnError>) => RequestResult<CreateProjectResponse, HttpError, ThrowOnError>;

/**
 * Create project manager
 * 'POST /api/projects/:projectId/managers': 'project-managers/create'
 * @param options
 */
export declare const createProjectManager: <ThrowOnError extends boolean = false>(options: Options<CreateProjectManagerRequest, ThrowOnError>) => RequestResult<CreateProjectManagerResponse, HttpError, ThrowOnError>;

export declare type CreateProjectManagerRequest = {
    path: {
        projectId: string;
    };
    body: {
        userId: string;
    };
};

export declare type CreateProjectManagerResponse = SingleResponse<ProjectManager>;

export declare type CreateProjectRequest = {
    body: {
        name: string;
    };
};

export declare type CreateProjectResponse = SingleResponse<Project>;

/**
 * Create task
 * 'POST /api/cards/:cardId/tasks': 'tasks/create'
 * @param options
 */
export declare const createTask: <ThrowOnError extends boolean = false>(options: Options<CreateTaskRequest, ThrowOnError>) => RequestResult<CreateTaskResponse, HttpError, ThrowOnError>;

export declare type CreateTaskRequest = {
    path: {
        cardId: string;
    };
    body: {
        position: number;
        name: string;
    };
};

export declare type CreateTaskResponse = SingleResponse<Task>;

/**
 * Create user
 * 'POST /api/users': 'users/create'
 * @param options
 */
export declare const createUser: <ThrowOnError extends boolean = false>(options: Options<CreateUserRequest, ThrowOnError>) => RequestResult<CreateUserResponse, HttpError, ThrowOnError>;

export declare type CreateUserRequest = {
    body: {
        email: string;
        password: string;
        name: string;
        username?: string;
    };
};

export declare type CreateUserResponse = SingleResponse<User>;

/**
 * Delete attachment
 * 'DELETE /api/attachments/:id': 'attachments/delete'
 * @param options
 */
export declare const deleteAttachment: <ThrowOnError extends boolean = false>(options: Options<DeleteAttachmentRequest, ThrowOnError>) => RequestResult<DeleteAttachmentResponse, HttpError, ThrowOnError>;

export declare type DeleteAttachmentRequest = {
    path: {
        id: string;
    };
};

export declare type DeleteAttachmentResponse = SingleResponse<Attachment>;

/**
 * Delete board
 * 'DELETE /api/boards/:id': 'boards/delete'
 * @param options
 */
export declare const deleteBoard: <ThrowOnError extends boolean = false>(options: Options<DeleteBoardRequest, ThrowOnError>) => RequestResult<DeleteBoardResponse, HttpError, ThrowOnError>;

/**
 * Delete board membership
 * 'DELETE /api/board-memberships/:id': 'board-memberships/delete'
 * @param options
 */
export declare const deleteBoardMembership: <ThrowOnError extends boolean = false>(options: Options<DeleteBoardMembershipRequest, ThrowOnError>) => RequestResult<DeleteBoardMembershipResponse, HttpError, ThrowOnError>;

export declare type DeleteBoardMembershipRequest = {
    path: {
        id: string;
    };
};

export declare type DeleteBoardMembershipResponse = SingleResponse<BoardMembership>;

export declare type DeleteBoardRequest = {
    path: {
        id: string;
    };
};

export declare type DeleteBoardResponse = SingleResponse<void>;

/**
 * Delete card
 * 'DELETE /api/cards/:id': 'cards/delete'
 * @param options
 */
export declare const deleteCard: <ThrowOnError extends boolean = false>(options: Options<DeleteCardRequest, ThrowOnError>) => RequestResult<DeleteCardResponse, HttpError, ThrowOnError>;

/**
 * Delete card label
 * 'DELETE /api/cards/:cardId/labels/:labelId': 'card-labels/delete'
 * @param options
 */
export declare const deleteCardLabel: <ThrowOnError extends boolean = false>(options: Options<DeleteCardLabelRequest, ThrowOnError>) => RequestResult<DeleteCardLabelResponse, HttpError, ThrowOnError>;

export declare type DeleteCardLabelRequest = {
    path: {
        cardId: string;
        labelId: string;
    };
};

export declare type DeleteCardLabelResponse = SingleResponse<CardLabel>;

/**
 * Delete card membership
 * 'DELETE /api/cards/:cardId/memberships': 'card-memberships/delete'
 * @param options
 */
export declare const deleteCardMembership: <ThrowOnError extends boolean = false>(options: Options<DeleteCardMembershipRequest, ThrowOnError>) => RequestResult<DeleteCardMembershipResponse, HttpError, ThrowOnError>;

export declare type DeleteCardMembershipRequest = {
    path: {
        cardId: string;
    };
    body: {
        userId: string;
    };
};

export declare type DeleteCardMembershipResponse = SingleResponse<CardMembership>;

export declare type DeleteCardRequest = {
    path: {
        id: string;
    };
};

export declare type DeleteCardResponse = SingleResponse<Card>;

/**
 * Delete comment action
 * 'DELETE /api/comment-actions/:id': 'comment-actions/delete'
 * @param options
 */
export declare const deleteCommentAction: <ThrowOnError extends boolean = false>(options: Options<DeleteCommentActionRequest, ThrowOnError>) => RequestResult<DeleteCommentActionResponse, HttpError, ThrowOnError>;

export declare type DeleteCommentActionRequest = {
    path: {
        id: string;
    };
};

export declare type DeleteCommentActionResponse = SingleResponse<Comment_2>;

/**
 * Delete label
 * 'DELETE /api/labels/:id': 'labels/delete'
 * @param options
 */
export declare const deleteLabel: <ThrowOnError extends boolean = false>(options: Options<DeleteLabelRequest, ThrowOnError>) => RequestResult<DeleteLabelResponse, HttpError, ThrowOnError>;

export declare type DeleteLabelRequest = {
    path: {
        id: string;
    };
};

export declare type DeleteLabelResponse = SingleResponse<Label>;

/**
 * Delete list
 * 'DELETE /api/lists/:id': 'lists/delete'
 * @param options
 */
export declare const deleteList: <ThrowOnError extends boolean = false>(options: Options<DeleteListRequest, ThrowOnError>) => RequestResult<DeleteListResponse, HttpError, ThrowOnError>;

export declare type DeleteListRequest = {
    path: {
        id: string;
    };
};

export declare type DeleteListResponse = SingleResponse<List>;

/**
 * Delete project
 * 'DELETE /api/projects/:id': 'projects/delete'
 * @param options
 */
export declare const deleteProject: <ThrowOnError extends boolean = false>(options: Options<DeleteProjectRequest, ThrowOnError>) => RequestResult<DeleteProjectResponse, HttpError, ThrowOnError>;

/**
 * Delete project manager
 * 'DELETE /api/project-managers/:id': 'project-managers/delete'
 * @param options
 */
export declare const deleteProjectManager: <ThrowOnError extends boolean = false>(options: Options<DeleteProjectManagerRequest, ThrowOnError>) => RequestResult<DeleteProjectManagerResponse, HttpError, ThrowOnError>;

export declare type DeleteProjectManagerRequest = {
    path: {
        id: string;
    };
};

export declare type DeleteProjectManagerResponse = SingleResponse<ProjectManager>;

export declare type DeleteProjectRequest = {
    path: {
        id: string;
    };
};

export declare type DeleteProjectResponse = SingleResponse<Project>;

/**
 * Delete task
 * 'DELETE /api/tasks/:id': 'tasks/delete'
 * @param options
 */
export declare const deleteTask: <ThrowOnError extends boolean = false>(options: Options<DeleteTaskRequest, ThrowOnError>) => RequestResult<DeleteTaskResponse, HttpError, ThrowOnError>;

export declare type DeleteTaskRequest = {
    path: {
        id: string;
    };
};

export declare type DeleteTaskResponse = SingleResponse<Task>;

/**
 * Delete user
 * 'DELETE /api/users/:id': 'users/delete'
 * @param options
 */
export declare const deleteUser: <ThrowOnError extends boolean = false>(options: Options<DeleteUserRequest, ThrowOnError>) => RequestResult<DeleteUserResponse, HttpError, ThrowOnError>;

export declare type DeleteUserRequest = {
    path: {
        id: string;
    };
};

export declare type DeleteUserResponse = SingleResponse<User>;

/**
 * Duplicate card
 * 'POST /api/cards/:id/duplicate': 'cards/duplicate'
 * @param options
 */
export declare const duplicateCard: <ThrowOnError extends boolean = false>(options: Options<DuplicateCardRequest, ThrowOnError>) => RequestResult<DuplicateCardResponse, HttpError, ThrowOnError>;

export declare type DuplicateCardRequest = {
    path: {
        id: string;
    };
    body: {
        position: number;
    };
};

export declare type DuplicateCardResponse = SingleResponse<Card>;

/**
 * Get attachment
 * 'GET /attachments/:id/download/:filename'
 * Note: this endpoint requires access token to be passed as a cookie, not as bearer token
 * @param options
 */
export declare const getAttachment: <ThrowOnError extends boolean = false>(options: Options<GetAttachmentRequest, ThrowOnError>) => RequestResult<Blob, HttpError, ThrowOnError>;

export declare type GetAttachmentRequest = {
    path: {
        id: string;
        filename: string;
    };
};

export declare type GetAttachmentResponse = Blob;

/**
 * Get attachment thumbnail
 * 'GET /attachments/:id/download/thumbnails/cover-256.:extension'
 * Note: this endpoint requires access token to be passed as a cookie, not as bearer token
 * @param options
 */
export declare const getAttachmentThumbnail: <ThrowOnError extends boolean = false>(options: Options<GetAttachmentThumbnailRequest, ThrowOnError>) => RequestResult<Blob, HttpError, ThrowOnError>;

export declare type GetAttachmentThumbnailRequest = {
    path: {
        id: string;
        extension: string;
    };
};

export declare type GetAttachmentThumbnailResponse = Blob;

/**
 * Get board
 * 'GET /api/boards/:id': 'boards/show'
 * @param options
 */
export declare const getBoard: <ThrowOnError extends boolean = false>(options: Options<GetBoardRequest, ThrowOnError>) => RequestResult<GetBoardResponse, HttpError, ThrowOnError>;

export declare type GetBoardRequest = {
    path: {
        id: string;
    };
};

export declare type GetBoardResponse = SingleResponse<Board>;

/**
 * Get card
 * 'GET /api/cards/:id': 'cards/show'
 * @param options
 */
export declare const getCard: <ThrowOnError extends boolean = false>(options: Options<GetCardRequest, ThrowOnError>) => RequestResult<GetCardResponse, HttpError, ThrowOnError>;

/**
 * Get card actions
 * 'GET /api/cards/:cardId/actions': 'actions/index'
 * @param options
 */
export declare const getCardActions: <ThrowOnError extends boolean = false>(options: Options<GetCardActionsRequest, ThrowOnError>) => RequestResult<GetCardActionsResponse, HttpError, ThrowOnError>;

export declare type GetCardActionsRequest = {
    path: {
        cardId: string;
    };
};

export declare type GetCardActionsResponse = ArrayResponse<Action>;

export declare type GetCardRequest = {
    path: {
        id: string;
    };
};

export declare type GetCardResponse = SingleResponse<Card>;

/**
 * Get config
 * 'GET /api/config': 'show-config'
 * @param options
 */
export declare const getConfig: <ThrowOnError extends boolean = false>(options: Options<unknown, ThrowOnError>) => RequestResult<GetConfigResponse, unknown, ThrowOnError>;

/**
 * All types necessary to provide to the hey-api client
 */
export declare type GetConfigResponse = SingleResponse<Oidc>;

/**
 * Get notification
 * 'GET /api/notifications/:id': 'notifications/show'
 * @param options
 */
export declare const getNotification: <ThrowOnError extends boolean = false>(options: Options<GetNotificationRequest, ThrowOnError>) => RequestResult<GetNotificationResponse, HttpError, ThrowOnError>;

export declare type GetNotificationRequest = {
    path: {
        id: string;
    };
};

export declare type GetNotificationResponse = SingleResponse<Notification_2>;

/**
 * Get notifications
 * 'GET /api/notifications': 'notifications/index'
 * @param options
 */
export declare const getNotifications: <ThrowOnError extends boolean = false>(options: Options<unknown, ThrowOnError>) => RequestResult<GetNotificationsResponse, HttpError, ThrowOnError>;

export declare type GetNotificationsResponse = ArrayResponse<Notification_2>;

/**
 * Get project
 * 'GET /api/projects/:id': 'projects/show'
 * @param options
 */
export declare const getProject: <ThrowOnError extends boolean = false>(options: Options<GetProjectRequest, ThrowOnError>) => RequestResult<GetProjectResponse, HttpError, ThrowOnError>;

export declare type GetProjectRequest = {
    path: {
        id: string;
    };
};

export declare type GetProjectResponse = SingleResponse<Project>;

/**
 * Get projects
 * 'GET /api/projects': 'projects/index'
 * @param options
 */
export declare const getProjects: <ThrowOnError extends boolean = false>(options: Options<unknown, ThrowOnError>) => RequestResult<GetProjectsResponse, HttpError, ThrowOnError>;

export declare type GetProjectsResponse = ArrayResponse<Project>;

/**
 * Get user
 * 'GET /api/users/:id': 'users/show'
 * @param options
 */
export declare const getUser: <ThrowOnError extends boolean = false>(options: Options<GetUserRequest, ThrowOnError>) => RequestResult<GetUserResponse, HttpError, ThrowOnError>;

export declare type GetUserRequest = {
    path: {
        id: string;
    };
};

export declare type GetUserResponse = SingleResponse<User>;

/**
 * Get users
 * 'GET /api/users': 'users/index'
 * @param options
 */
export declare const getUsers: <ThrowOnError extends boolean = false>(options: Options<unknown, ThrowOnError>) => RequestResult<GetUsersResponse, HttpError, ThrowOnError>;

export declare type GetUsersResponse = ArrayResponse<User>;

/**
 * Most errors are roughly the same, so they are types singly
 */
export declare type HttpError = {
    code: 'E_MISSING_OR_INVALID_PARAMS' | 'E_UNAUTHORIZED' | 'E_NOT_FOUND' | 'E_CONFLICT' | 'E_UNPROCESSABLE_ENTITY';
    message?: string;
    problems?: string[];
};

declare type Image_2 = {
    width: number;
    height: number;
};
export { Image_2 as Image }

export declare type Include = {
    users: User[];
    boardMemberships: BoardMembership[];
    labels: Label[];
    lists: List[];
    cards: Card[];
    cardMemberships: Card[];
    cardLabels: Label[];
    tasks: Action[];
    boards: Board[];
    actions: Action[];
    projectManagers: ProjectManager[];
};

/**
 * Labels
 */
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

export declare type Language = 'ar-YE' | 'bg-BG' | 'cs-CZ' | 'da-DK' | 'de-DE' | 'en-GB' | 'en-US' | 'es-ES' | 'fa-IR' | 'fr-FR' | 'hu-HU' | 'id-ID' | 'it-IT' | 'ja-JP' | 'ko-KR' | 'nl-NL' | 'pl-PL' | 'pt-BR' | 'ro-RO' | 'ru-RU' | 'sk-SK' | 'sv-SE' | 'tr-TR' | 'uk-UA' | 'uz-UZ' | 'zh-CN' | 'zh-TW';

/**
 * Lists
 */
export declare type List = {
    id: string;
    createdAt: Date;
    updatedAt?: Date;
    position: number;
    name: string;
    boardId: string;
};

/**
 * Notifications
 */
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

/**
 * Projects
 */
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

export declare type Role = 'editor' | 'viewer';

/**
 * Responses are given as single or array, and can include other data types
 */
export declare type SingleResponse<T> = {
    item: T;
    included?: Partial<Include>;
};

/**
 * Sort list
 * 'POST /api/lists/:id/sort': 'lists/sort'
 * @param options
 */
export declare const sortList: <ThrowOnError extends boolean = false>(options: Options<SortListRequest, ThrowOnError>) => RequestResult<SortListResponse, HttpError, ThrowOnError>;

export declare type SortListRequest = {
    path: {
        id: string;
    };
    body: {
        type: SortType;
    };
};

export declare type SortListResponse = SingleResponse<List>;

export declare type SortType = 'name_asc' | 'dueDate_asc' | 'createdAt_asc' | 'createdAt_desc';

export declare type Task = {
    id: string;
    createdAt: Date;
    updatedAt?: Date;
    position: number;
    name: string;
    isCompleted: boolean;
    cardId: string;
};

/**
 * Delete access token
 * 'DELETE /api/access-tokens/me': 'access-tokens/delete'
 * @param options
 */
export declare const unauthorize: <ThrowOnError extends boolean = false>(options: Options<unknown, ThrowOnError>) => RequestResult<UnauthorizeResponse, HttpError, ThrowOnError>;

export declare type UnauthorizeResponse = SingleResponse<string>;

/**
 * Update attachment
 * 'PATCH /api/attachments/:id': 'attachments/update'
 * @param options
 */
export declare const updateAttachment: <ThrowOnError extends boolean = false>(options: Options<UpdateAttachmentRequest, ThrowOnError>) => RequestResult<UpdateAttachmentResponse, HttpError, ThrowOnError>;

export declare type UpdateAttachmentRequest = {
    path: {
        id: string;
    };
    body: Partial<Omit<Attachment, 'createdAt' | 'updatedAt' | 'id' | 'cardId' | 'createUserId' | 'url' | 'coverUrl'>>;
};

export declare type UpdateAttachmentResponse = SingleResponse<Attachment>;

/**
 * Update board
 * 'PATCH /api/boards/:id': 'boards/update'
 * @param options
 */
export declare const updateBoard: <ThrowOnError extends boolean = false>(options: Options<UpdateBoardRequest, ThrowOnError>) => RequestResult<UpdateBoardResponse, HttpError, ThrowOnError>;

/**
 * Update board membership
 * 'PATCH /api/board-memberships/:id': 'board-memberships/update'
 * @param options
 */
export declare const updateBoardMembership: <ThrowOnError extends boolean = false>(options: Options<UpdateBoardMembershipRequest, ThrowOnError>) => RequestResult<UpdateBoardMembershipResponse, HttpError, ThrowOnError>;

export declare type UpdateBoardMembershipRequest = {
    path: {
        id: string;
    };
    body: {
        role: Role;
    };
};

export declare type UpdateBoardMembershipResponse = SingleResponse<BoardMembership>;

export declare type UpdateBoardRequest = {
    path: {
        id: string;
    };
    body: Partial<Omit<Board, 'createdAt' | 'updatedAt' | 'id' | 'projectId'>>;
};

export declare type UpdateBoardResponse = SingleResponse<Board>;

/**
 * Update card
 * 'PATCH /api/cards/:id': 'cards/update'
 * @param options
 */
export declare const updateCard: <ThrowOnError extends boolean = false>(options: Options<UpdateCardRequest, ThrowOnError>) => RequestResult<UpdateCardResponse, HttpError, ThrowOnError>;

export declare type UpdateCardRequest = {
    path: {
        id: string;
    };
    body: Partial<Omit<Card, 'createdAt' | 'updatedAt' | 'id' | 'creatorUserId' | 'isSubscribed'>>;
};

export declare type UpdateCardResponse = SingleResponse<Card>;

/**
 * Update comment action
 * 'PATCH /api/comment-actions/:id': 'comment-actions/update'
 * @param options
 */
export declare const updateCommentAction: <ThrowOnError extends boolean = false>(options: Options<UpdateCommentActionRequest, ThrowOnError>) => RequestResult<UpdateCommentActionResponse, HttpError, ThrowOnError>;

export declare type UpdateCommentActionRequest = {
    path: {
        id: string;
    };
    body: {
        text: string;
    };
};

export declare type UpdateCommentActionResponse = SingleResponse<Comment_2>;

/**
 * Update label
 * 'PATCH /api/labels/:id': 'labels/update'
 * @param options
 */
export declare const updateLabel: <ThrowOnError extends boolean = false>(options: Options<UpdateLabelRequest, ThrowOnError>) => RequestResult<UpdateLabelResponse, HttpError, ThrowOnError>;

export declare type UpdateLabelRequest = {
    path: {
        id: string;
    };
    body: Partial<Omit<Label, 'createdAt' | 'updatedAt' | 'id' | 'boardId'>>;
};

export declare type UpdateLabelResponse = SingleResponse<Label>;

/**
 * Update list
 * 'PATCH /api/lists/:id': 'lists/update'
 * @param options
 */
export declare const updateList: <ThrowOnError extends boolean = false>(options: Options<UpdateListRequest, ThrowOnError>) => RequestResult<UpdateListResponse, HttpError, ThrowOnError>;

export declare type UpdateListRequest = {
    path: {
        id: string;
    };
    body: Partial<Omit<List, 'createdAt' | 'updatedAt' | 'id' | 'boardId'>>;
};

export declare type UpdateListResponse = SingleResponse<List>;

/**
 * Update notifications
 * 'PATCH /api/notifications/:ids': 'notifications/update'
 * @param options
 */
export declare const updateNotifications: <ThrowOnError extends boolean = false>(options: Options<UpdateNotificationsRequest, ThrowOnError>) => RequestResult<UpdateNotificationsResponse, HttpError, ThrowOnError>;

export declare type UpdateNotificationsRequest = {
    path: {
        ids: string[];
    };
    body: Partial<Omit<Notification_2, 'createdAt' | 'updatedAt' | 'id' | 'cardId' | 'userId' | 'actionId'>>;
};

export declare type UpdateNotificationsResponse = ArrayResponse<Notification_2>;

/**
 * Update project
 * 'PATCH /api/projects/:id': 'projects/update'
 * @param options
 */
export declare const updateProject: <ThrowOnError extends boolean = false>(options: Options<UpdateProjectRequest, ThrowOnError>) => RequestResult<UpdateProjectResponse, HttpError, ThrowOnError>;

/**
 * Update project background image
 * 'POST /api/projects/:id/background-image': 'projects/update-background-image'
 * @param options
 */
export declare const updateProjectBackgroundImage: <ThrowOnError extends boolean = false>(options: Options<UpdateProjectBackgroundImageRequest, ThrowOnError>) => RequestResult<UpdateProjectBackgroundImageResponse, HttpError, ThrowOnError>;

export declare type UpdateProjectBackgroundImageRequest = {
    path: {
        id: string;
    };
    body: {
        file: File;
    };
};

export declare type UpdateProjectBackgroundImageResponse = SingleResponse<Project>;

export declare type UpdateProjectRequest = {
    path: {
        id: string;
    };
    body: Partial<Omit<Project, 'createdAt' | 'updatedAt' | 'id' | 'backgroundImage'>>;
};

export declare type UpdateProjectResponse = SingleResponse<Project>;

/**
 * Update task
 * 'PATCH /api/tasks/:id': 'tasks/update'
 * @param options
 */
export declare const updateTask: <ThrowOnError extends boolean = false>(options: Options<UpdateTaskRequest, ThrowOnError>) => RequestResult<UpdateTaskResponse, HttpError, ThrowOnError>;

export declare type UpdateTaskRequest = {
    path: {
        id: string;
    };
    body: Partial<Omit<Task, 'createdAt' | 'updatedAt' | 'id' | 'cardId'>>;
};

export declare type UpdateTaskResponse = SingleResponse<Task>;

/**
 * Update user
 * 'PATCH /api/users/:id': 'users/update'
 * @param options
 */
export declare const updateUser: <ThrowOnError extends boolean = false>(options: Options<UpdateUserRequest, ThrowOnError>) => RequestResult<UpdateUserResponse, HttpError, ThrowOnError>;

/**
 * Update user avatar
 * 'POST /api/users/:id/avatar': 'users/update-avatar'
 * @param options
 */
export declare const updateUserAvatar: <ThrowOnError extends boolean = false>(options: Options<UpdateUserAvatarRequest, ThrowOnError>) => RequestResult<UpdateUserAvatarResponse, HttpError, ThrowOnError>;

export declare type UpdateUserAvatarRequest = {
    path: {
        id: string;
    };
    body: {
        file: File;
    };
};

export declare type UpdateUserAvatarResponse = SingleResponse<User>;

/**
 * Update user email
 * 'PATCH /api/users/:id/email': 'users/update-email'
 * @param options
 */
export declare const updateUserEmail: <ThrowOnError extends boolean = false>(options: Options<UpdateUserEmailRequest, ThrowOnError>) => RequestResult<UpdateUserEmailResponse, HttpError, ThrowOnError>;

export declare type UpdateUserEmailRequest = {
    path: {
        id: string;
    };
    body: {
        email: string;
    };
};

export declare type UpdateUserEmailResponse = SingleResponse<User>;

/**
 * Update user password
 * 'PATCH /api/users/:id/password': 'users/update-password'
 * @param options
 */
export declare const updateUserPassword: <ThrowOnError extends boolean = false>(options: Options<UpdateUserPasswordRequest, ThrowOnError>) => RequestResult<UpdateUserPasswordResponse, HttpError, ThrowOnError>;

export declare type UpdateUserPasswordRequest = {
    path: {
        id: string;
    };
    body: {
        password: string;
    };
};

export declare type UpdateUserPasswordResponse = SingleResponse<User>;

export declare type UpdateUserRequest = {
    path: {
        id: string;
    };
    body: Partial<Omit<User, 'updatedAt' | 'createdAt' | 'deletedAt' | 'username' | 'email' | 'avatarUrl'>>;
};

export declare type UpdateUserResponse = SingleResponse<User>;

/**
 * Update user username
 * 'PATCH /api/users/:id/username': 'users/update-username'
 * @param options
 */
export declare const updateUserUsername: <ThrowOnError extends boolean = false>(options: Options<UpdateUserUsernameRequest, ThrowOnError>) => RequestResult<UpdateUserUsernameResponse, HttpError, ThrowOnError>;

export declare type UpdateUserUsernameRequest = {
    path: {
        id: string;
    };
    body: {
        username: string;
    };
};

export declare type UpdateUserUsernameResponse = SingleResponse<User>;

/**
 * Users
 */
export declare type User = {
    id: string;
    email: string;
    isAdmin: boolean;
    name: string;
    username: string;
    phone?: string;
    organization?: string;
    language?: Language;
    subscribeToOwnCards: boolean;
    avatarUrl?: string;
    createdAt: Date;
    updatedAt?: Date;
    deletedAt?: Date;
};

export { }
