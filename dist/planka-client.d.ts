import { Client } from '@hey-api/client-fetch';
import { Config } from '@hey-api/client-fetch';
import { Options } from '@hey-api/client-fetch';
import { RequestOptionsBase } from '@hey-api/client-fetch';
import { RequestResult } from '@hey-api/client-fetch';

export declare type $OpenApiTs = {
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

export declare const authorize: <ThrowOnError extends boolean = false>(options: Options<AuthorizeRequest, ThrowOnError>) => RequestResult<AuthorizeResponse, BadRequestError, ThrowOnError>;

export declare type AuthorizeError = BadRequestError;

export declare const authorizeOidc: <ThrowOnError extends boolean = false>(options: Options<AuthorizeOidcRequest, ThrowOnError>) => RequestResult<AuthorizeOidcResponse, AuthorizeOidcError, ThrowOnError>;

export declare type AuthorizeOidcError = BadRequestError | UnauthorizedError;

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

export declare const client: Client<Request, Response, unknown, RequestOptionsBase<false> & Config<false> & {
headers: Headers;
}>;

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

export declare const createAttachment: <ThrowOnError extends boolean = false>(options: Options<CreateAttachmentRequest, ThrowOnError>) => RequestResult<CreateAttachmentResponse, CreateAttachmentError, ThrowOnError>;

export declare type CreateAttachmentError = BadRequestError | UnauthorizedError | NotFoundError;

export declare type CreateAttachmentRequest = {
    path: {
        cardId: string;
    };
    body: {
        text: string;
    };
};

export declare type CreateAttachmentResponse = SingleResponse<Attachment>;

export declare const createBoard: <ThrowOnError extends boolean = false>(options: Options<CreateBoardRequest, ThrowOnError>) => RequestResult<CreateBoardResponse, CreateBoardError, ThrowOnError>;

export declare type CreateBoardError = BadRequestError | UnauthorizedError | NotFoundError;

export declare const createBoardMembership: <ThrowOnError extends boolean = false>(options: Options<CreateBoardMembershipRequest, ThrowOnError>) => RequestResult<CreateBoardMembershipResponse, CreateBoardMembershipError, ThrowOnError>;

export declare type CreateBoardMembershipError = BadRequestError | UnauthorizedError | NotFoundError | ConflictError;

export declare type CreateBoardMembershipRequest = {
    path: {
        boardId: string;
    };
    body: {
        userId: string;
        role: Role;
    };
};

export declare type CreateBoardMembershipResponse = SingleResponse<Board>;

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

export declare const createCard: <ThrowOnError extends boolean = false>(options: Options<CreateCardRequest, ThrowOnError>) => RequestResult<CreateCardResponse, CreateCardError, ThrowOnError>;

export declare type CreateCardError = BadRequestError | UnauthorizedError | NotFoundError | UnprocessableError;

export declare const createCardLabel: <ThrowOnError extends boolean = false>(options: Options<CreateCardLabelRequest, ThrowOnError>) => RequestResult<CreateCardLabelResponse, CreateCardLabelError, ThrowOnError>;

export declare type CreateCardLabelError = BadRequestError | UnauthorizedError | NotFoundError;

export declare type CreateCardLabelRequest = {
    path: {
        cardId: string;
    };
    body: {
        labelId: string;
    };
};

export declare type CreateCardLabelResponse = SingleResponse<CardLabel>;

export declare const createCardMembership: <ThrowOnError extends boolean = false>(options: Options<CreateCardMembershipRequest, ThrowOnError>) => RequestResult<CreateCardMembershipResponse, CreateCardMembershipError, ThrowOnError>;

export declare type CreateCardMembershipError = BadRequestError | UnauthorizedError | NotFoundError;

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

export declare const createCommentAction: <ThrowOnError extends boolean = false>(options: Options<CreateCommentActionRequest, ThrowOnError>) => RequestResult<CreateCommentActionResponse, CreateCommentActionError, ThrowOnError>;

export declare type CreateCommentActionError = BadRequestError | UnauthorizedError | NotFoundError;

export declare type CreateCommentActionRequest = {
    path: {
        cardId: string;
    };
    body: {
        text: string;
    };
};

export declare type CreateCommentActionResponse = SingleResponse<Comment_2>;

export declare const createLabel: <ThrowOnError extends boolean = false>(options: Options<CreateLabelRequest, ThrowOnError>) => RequestResult<CreateLabelResponse, CreateLabelError, ThrowOnError>;

export declare type CreateLabelError = BadRequestError | UnauthorizedError | NotFoundError;

export declare type CreateLabelRequest = {
    path: {
        boardId: string;
    };
    body: {
        position: number;
        color: LabelColor;
    };
};

export declare type CreateLabelResponse = SingleResponse<Label>;

export declare const createList: <ThrowOnError extends boolean = false>(options: Options<CreateListRequest, ThrowOnError>) => RequestResult<CreateListResponse, CreateListError, ThrowOnError>;

export declare type CreateListError = BadRequestError | UnauthorizedError | NotFoundError;

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

export declare const createProject: <ThrowOnError extends boolean = false>(options: Options<CreateProjectRequest, ThrowOnError>) => RequestResult<CreateProjectResponse, CreateProjectError, ThrowOnError>;

export declare type CreateProjectError = BadRequestError | UnauthorizedError;

export declare const createProjectManager: <ThrowOnError extends boolean = false>(options: Options<CreateProjectManagerRequest, ThrowOnError>) => RequestResult<CreateProjectManagerResponse, CreateProjectManagerError, ThrowOnError>;

export declare type CreateProjectManagerError = BadRequestError | UnauthorizedError | NotFoundError;

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

export declare const createTask: <ThrowOnError extends boolean = false>(options: Options<CreateTaskRequest, ThrowOnError>) => RequestResult<CreateTaskResponse, CreateTaskError, ThrowOnError>;

export declare type CreateTaskError = BadRequestError | UnauthorizedError | NotFoundError;

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

export declare const createUser: <ThrowOnError extends boolean = false>(options: Options<CreateUserRequest, ThrowOnError>) => RequestResult<CreateUserResponse, CreateUserError, ThrowOnError>;

export declare type CreateUserError = BadRequestError | UnauthorizedError | ConflictError;

export declare type CreateUserRequest = {
    body: {
        email: string;
        password: string;
        name: string;
        username?: string;
    };
};

export declare type CreateUserResponse = SingleResponse<User>;

export declare const deleteAttachment: <ThrowOnError extends boolean = false>(options: Options<DeleteAttachmentRequest, ThrowOnError>) => RequestResult<DeleteAttachmentResponse, DeleteAttachmentError, ThrowOnError>;

export declare type DeleteAttachmentError = UnauthorizedError | NotFoundError;

export declare type DeleteAttachmentRequest = {
    path: {
        id: string;
    };
};

export declare type DeleteAttachmentResponse = SingleResponse<Attachment>;

export declare const deleteBoard: <ThrowOnError extends boolean = false>(options: Options<DeleteBoardRequest, ThrowOnError>) => RequestResult<DeleteBoardResponse, DeleteBoardError, ThrowOnError>;

export declare type DeleteBoardError = UnauthorizedError | NotFoundError;

export declare const deleteBoardMembership: <ThrowOnError extends boolean = false>(options: Options<DeleteBoardMembershipRequest, ThrowOnError>) => RequestResult<DeleteBoardMembershipResponse, DeleteBoardMembershipError, ThrowOnError>;

export declare type DeleteBoardMembershipError = UnauthorizedError | NotFoundError;

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

export declare const deleteCard: <ThrowOnError extends boolean = false>(options: Options<DeleteCardRequest, ThrowOnError>) => RequestResult<DeleteCardResponse, DeleteCardError, ThrowOnError>;

export declare type DeleteCardError = UnauthorizedError | NotFoundError;

export declare const deleteCardLabel: <ThrowOnError extends boolean = false>(options: Options<DeleteCardLabelRequest, ThrowOnError>) => RequestResult<DeleteCardLabelResponse, DeleteCardLabelError, ThrowOnError>;

export declare type DeleteCardLabelError = BadRequestError | UnauthorizedError | NotFoundError;

export declare type DeleteCardLabelRequest = {
    path: {
        cardId: string;
        labelId: string;
    };
};

export declare type DeleteCardLabelResponse = SingleResponse<CardLabel>;

export declare const deleteCardMembership: <ThrowOnError extends boolean = false>(options: Options<DeleteCardMembershipRequest, ThrowOnError>) => RequestResult<DeleteCardMembershipResponse, DeleteCardMembershipError, ThrowOnError>;

export declare type DeleteCardMembershipError = BadRequestError | UnauthorizedError | NotFoundError;

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

export declare const deleteCommentAction: <ThrowOnError extends boolean = false>(options: Options<DeleteCommentActionRequest, ThrowOnError>) => RequestResult<DeleteCommentActionResponse, DeleteCommentActionError, ThrowOnError>;

export declare type DeleteCommentActionError = UnauthorizedError | NotFoundError;

export declare type DeleteCommentActionRequest = {
    path: {
        id: string;
    };
};

export declare type DeleteCommentActionResponse = SingleResponse<Comment_2>;

export declare const deleteLabel: <ThrowOnError extends boolean = false>(options: Options<DeleteLabelRequest, ThrowOnError>) => RequestResult<DeleteLabelResponse, DeleteLabelError, ThrowOnError>;

export declare type DeleteLabelError = UnauthorizedError | NotFoundError;

export declare type DeleteLabelRequest = {
    path: {
        id: string;
    };
};

export declare type DeleteLabelResponse = SingleResponse<Label>;

export declare const deleteList: <ThrowOnError extends boolean = false>(options: Options<DeleteListRequest, ThrowOnError>) => RequestResult<DeleteListResponse, DeleteListError, ThrowOnError>;

export declare type DeleteListError = UnauthorizedError | NotFoundError;

export declare type DeleteListRequest = {
    path: {
        id: string;
    };
};

export declare type DeleteListResponse = SingleResponse<List>;

export declare const deleteProject: <ThrowOnError extends boolean = false>(options: Options<DeleteProjectRequest, ThrowOnError>) => RequestResult<DeleteProjectResponse, DeleteProjectError, ThrowOnError>;

export declare type DeleteProjectError = UnauthorizeError | NotFoundError;

export declare const deleteProjectManager: <ThrowOnError extends boolean = false>(options: Options<DeleteProjectManagerRequest, ThrowOnError>) => RequestResult<DeleteProjectManagerResponse, DeleteProjectManagerError, ThrowOnError>;

export declare type DeleteProjectManagerError = BadRequestError | UnauthorizedError;

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

export declare const deleteTask: <ThrowOnError extends boolean = false>(options: Options<DeleteTaskRequest, ThrowOnError>) => RequestResult<DeleteTaskResponse, DeleteTaskError, ThrowOnError>;

export declare type DeleteTaskError = UnauthorizedError | NotFoundError;

export declare type DeleteTaskRequest = {
    path: {
        taskId: string;
    };
};

export declare type DeleteTaskResponse = SingleResponse<Task>;

export declare const deleteUser: <ThrowOnError extends boolean = false>(options: Options<DeleteUserRequest, ThrowOnError>) => RequestResult<void, DeleteUserError, ThrowOnError>;

export declare type DeleteUserError = UnauthorizedError | NotFoundError;

export declare type DeleteUserRequest = {
    path: {
        id: string;
    };
    body: User;
};

export declare type DeleteUserResponse = void;

export declare const duplicateCard: <ThrowOnError extends boolean = false>(options: Options<DuplicateCardRequest, ThrowOnError>) => RequestResult<DuplicateCardResponse, DuplicateCardError, ThrowOnError>;

export declare type DuplicateCardError = BadRequestError | UnauthorizedError | NotFoundError;

export declare type DuplicateCardRequest = {
    path: {
        id: string;
    };
    body: {
        position: number;
    };
};

export declare type DuplicateCardResponse = SingleResponse<Card>;

export declare const getBoard: <ThrowOnError extends boolean = false>(options: Options<GetBoardRequest, ThrowOnError>) => RequestResult<GetBoardResponse, GetBoardError, ThrowOnError>;

export declare type GetBoardError = UnauthorizeError | NotFoundError;

export declare type GetBoardRequest = {
    path: {
        id: string;
    };
};

export declare type GetBoardResponse = SingleResponse<Board>;

export declare const getCard: <ThrowOnError extends boolean = false>(options: Options<GetCardRequest, ThrowOnError>) => RequestResult<GetCardResponse, GetCardError, ThrowOnError>;

export declare const getCardActions: <ThrowOnError extends boolean = false>(options: Options<GetCardActionsRequest, ThrowOnError>) => RequestResult<GetCardActionsResponse, GetCardActionsError, ThrowOnError>;

export declare type GetCardActionsError = UnauthorizedError | NotFoundError;

export declare type GetCardActionsRequest = {
    path: {
        cardId: string;
    };
};

export declare type GetCardActionsResponse = ArrayResponse<Action>;

export declare type GetCardError = UnauthorizedError | NotFoundError;

export declare type GetCardRequest = {
    path: {
        id: string;
    };
};

export declare type GetCardResponse = SingleResponse<Card>;

export declare const getConfig: <ThrowOnError extends boolean = false>(options: Options<unknown, ThrowOnError>) => RequestResult<GetConfigResponse, unknown, ThrowOnError>;

export declare type GetConfigError = unknown;

export declare type GetConfigResponse = SingleResponse<Oidc>;

export declare const getNotification: <ThrowOnError extends boolean = false>(options: Options<GetNotificationRequest, ThrowOnError>) => RequestResult<GetNotificationResponse, GetNotificationError, ThrowOnError>;

export declare type GetNotificationError = UnauthorizedError | NotFoundError;

export declare type GetNotificationRequest = {
    path: {
        id: string;
    };
};

export declare type GetNotificationResponse = ArrayResponse<Notification_2>;

export declare const getNotifications: <ThrowOnError extends boolean = false>(options: Options<unknown, ThrowOnError>) => RequestResult<GetNotificationsResponse, GetNotificationsError, ThrowOnError>;

export declare type GetNotificationsError = UnauthorizedError | NotFoundError;

export declare type GetNotificationsResponse = ArrayResponse<Notification_2>;

export declare const getProject: <ThrowOnError extends boolean = false>(options: Options<GetProjectRequest, ThrowOnError>) => RequestResult<GetProjectResponse, GetProjectError, ThrowOnError>;

export declare type GetProjectError = BadRequestError | UnauthorizedError | NotFoundError;

export declare type GetProjectRequest = {
    path: {
        id: string;
    };
    body: {
        name: string;
    };
};

export declare type GetProjectResponse = SingleResponse<Project>;

export declare const getProjects: <ThrowOnError extends boolean = false>(options: Options<unknown, ThrowOnError>) => RequestResult<GetProjectsResponse, BaseError, ThrowOnError>;

export declare type GetProjectsError = UnauthorizedError;

export declare type GetProjectsResponse = ArrayResponse<Project>;

export declare const getUser: <ThrowOnError extends boolean = false>(options: Options<GetUserRequest, ThrowOnError>) => RequestResult<GetUserResponse, GetUserError, ThrowOnError>;

export declare type GetUserError = UnauthorizedError | NotFoundError;

export declare type GetUserRequest = {
    path: {
        id: string;
    };
};

export declare type GetUserResponse = SingleResponse<User>;

export declare const getUsers: <ThrowOnError extends boolean = false>(options: Options<unknown, ThrowOnError>) => RequestResult<GetUsersResponse, BaseError, ThrowOnError>;

export declare type GetUsersError = UnauthorizedError;

export declare type GetUsersResponse = ArrayResponse<User>;

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

export declare type SingleResponse<T> = {
    item: T;
    included?: Partial<Include>;
};

export declare const sortList: <ThrowOnError extends boolean = false>(options: Options<SortListRequest, ThrowOnError>) => RequestResult<SortListResponse, SortListError, ThrowOnError>;

export declare type SortListError = UnauthorizedError | NotFoundError;

export declare type SortListRequest = {
    path: {
        id: string;
    };
};

export declare type SortListResponse = SingleResponse<List>;

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

export declare const unauthorize: <ThrowOnError extends boolean = false>(options: Options<unknown, ThrowOnError>) => RequestResult<UnauthorizeResponse, BaseError, ThrowOnError>;

export declare type UnauthorizedError = BaseError;

export declare type UnauthorizeError = UnauthorizedError;

export declare type UnauthorizeResponse = SingleResponse<string>;

export declare type UnprocessableError = BaseError;

export declare const updateAttachment: <ThrowOnError extends boolean = false>(options: Options<UpdateAttachmentRequest, ThrowOnError>) => RequestResult<UpdateAttachmentResponse, UpdateAttachmentError, ThrowOnError>;

export declare type UpdateAttachmentError = UnauthorizedError | NotFoundError;

export declare type UpdateAttachmentRequest = {
    path: {
        id: string;
    };
    body: Partial<Attachment>;
};

export declare type UpdateAttachmentResponse = SingleResponse<Attachment>;

export declare const updateBoard: <ThrowOnError extends boolean = false>(options: Options<UpdateBoardRequest, ThrowOnError>) => RequestResult<UpdateBoardResponse, UpdateBoardError, ThrowOnError>;

export declare type UpdateBoardError = UnauthorizedError | NotFoundError;

export declare const updateBoardMembership: <ThrowOnError extends boolean = false>(options: Options<UpdateBoardMembershipRequest, ThrowOnError>) => RequestResult<UpdateBoardMembershipResponse, UpdateBoardMembershipError, ThrowOnError>;

export declare type UpdateBoardMembershipError = UnauthorizedError | NotFoundError;

export declare type UpdateBoardMembershipRequest = {
    path: {
        id: string;
    };
    body: {
        role: Role;
        canComment: boolean;
    };
};

export declare type UpdateBoardMembershipResponse = SingleResponse<BoardMembership>;

export declare type UpdateBoardRequest = {
    path: {
        id: string;
    };
    body: Partial<Board>;
};

export declare type UpdateBoardResponse = SingleResponse<Board>;

export declare const updateCard: <ThrowOnError extends boolean = false>(options: Options<UpdateCardRequest, ThrowOnError>) => RequestResult<UpdateCardResponse, UpdateCardError, ThrowOnError>;

export declare type UpdateCardError = UnauthorizedError | NotFoundError;

export declare type UpdateCardRequest = {
    path: {
        id: string;
    };
    body: Partial<Card>;
};

export declare type UpdateCardResponse = SingleResponse<Card>;

export declare const updateCommentAction: <ThrowOnError extends boolean = false>(options: Options<UpdateCommentActionRequest, ThrowOnError>) => RequestResult<UpdateCommentActionResponse, UpdateCommentActionError, ThrowOnError>;

export declare type UpdateCommentActionError = UnauthorizedError | NotFoundError;

export declare type UpdateCommentActionRequest = {
    path: {
        id: string;
    };
    body: {
        text: string;
    };
};

export declare type UpdateCommentActionResponse = SingleResponse<Comment_2>;

export declare const updateLabel: <ThrowOnError extends boolean = false>(options: Options<UpdateLabelRequest, ThrowOnError>) => RequestResult<UpdateLabelResponse, UpdateLabelError, ThrowOnError>;

export declare type UpdateLabelError = UnauthorizedError | NotFoundError;

export declare type UpdateLabelRequest = {
    path: {
        id: string;
    };
    body: Partial<Label>;
};

export declare type UpdateLabelResponse = SingleResponse<Label>;

export declare const updateList: <ThrowOnError extends boolean = false>(options: Options<UpdateListRequest, ThrowOnError>) => RequestResult<UpdateListResponse, UpdateListError, ThrowOnError>;

export declare type UpdateListError = UnauthorizedError | NotFoundError;

export declare type UpdateListRequest = {
    path: {
        id: string;
    };
    body: Partial<List>;
};

export declare type UpdateListResponse = SingleResponse<List>;

export declare const updateNotifications: <ThrowOnError extends boolean = false>(options: Options<UpdateNotificationsRequest, ThrowOnError>) => RequestResult<UpdateNotificationsResponse, NotFoundError, ThrowOnError>;

export declare type UpdateNotificationsError = NotFoundError;

export declare type UpdateNotificationsRequest = {
    path: {
        ids: string;
    };
    body: Partial<Notification_2>;
};

export declare type UpdateNotificationsResponse = ArrayResponse<Notification_2>;

export declare const updateProject: <ThrowOnError extends boolean = false>(options: Options<UpdateProjectRequest, ThrowOnError>) => RequestResult<UpdateProjectResponse, UpdateProjectError, ThrowOnError>;

export declare const updateProjectBackgroundImage: <ThrowOnError extends boolean = false>(options: Options<UpdateProjectBackgroundImageRequest, ThrowOnError>) => RequestResult<UpdateProjectBackgroundImageResponse, UpdateProjectBackgroundImageError, ThrowOnError>;

export declare type UpdateProjectBackgroundImageError = BadRequestError | UnauthorizedError | NotFoundError | UnprocessableError;

export declare type UpdateProjectBackgroundImageRequest = {
    path: {
        id: string;
    };
    body: {
        file: File;
    };
};

export declare type UpdateProjectBackgroundImageResponse = SingleResponse<Project>;

export declare type UpdateProjectError = UnauthorizeError | NotFoundError;

export declare type UpdateProjectRequest = {
    path: {
        id: string;
    };
    body: Partial<Project>;
};

export declare type UpdateProjectResponse = SingleResponse<Project>;

export declare const updateTask: <ThrowOnError extends boolean = false>(options: Options<UpdateTaskRequest, ThrowOnError>) => RequestResult<UpdateTaskResponse, UpdateTaskError, ThrowOnError>;

export declare type UpdateTaskError = UnauthorizedError | NotFoundError;

export declare type UpdateTaskRequest = {
    path: {
        taskId: string;
    };
    body: Partial<Task>;
};

export declare type UpdateTaskResponse = SingleResponse<Task>;

export declare const updateUser: <ThrowOnError extends boolean = false>(options: Options<UpdateUserRequest, ThrowOnError>) => RequestResult<UpdateUserResponse, UpdateUserError, ThrowOnError>;

export declare const updateUserAvatar: <ThrowOnError extends boolean = false>(options: Options<UpdateUserAvatarRequest, ThrowOnError>) => RequestResult<UpdateUserAvatarResponse, UpdateUserAvatarError, ThrowOnError>;

export declare type UpdateUserAvatarError = BadRequestError | UnauthorizedError | NotFoundError | UnprocessableError;

export declare type UpdateUserAvatarRequest = {
    path: {
        id: string;
    };
    body: {
        file: File;
    };
};

export declare type UpdateUserAvatarResponse = SingleResponse<User>;

export declare const updateUserEmail: <ThrowOnError extends boolean = false>(options: Options<UpdateUserEmailRequest, ThrowOnError>) => RequestResult<UpdateUserEmailResponse, UpdateUserEmailError, ThrowOnError>;

export declare type UpdateUserEmailError = BadRequestError | UnauthorizedError | NotFoundError | ConflictError;

export declare type UpdateUserEmailRequest = {
    path: {
        id: string;
    };
    body: {
        email: string;
    };
};

export declare type UpdateUserEmailResponse = SingleResponse<User>;

export declare type UpdateUserError = BadRequestError | UnauthorizedError | NotFoundError;

export declare const updateUserPassword: <ThrowOnError extends boolean = false>(options: Options<UpdateUserPasswordRequest, ThrowOnError>) => RequestResult<UpdateUserPasswordResponse, UpdateUserPasswordError, ThrowOnError>;

export declare type UpdateUserPasswordError = BadRequestError | UnauthorizedError | NotFoundError | ConflictError;

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
    body: Partial<User>;
};

export declare type UpdateUserResponse = SingleResponse<User>;

export declare const updateUserUsername: <ThrowOnError extends boolean = false>(options: Options<UpdateUserUsernameRequest, ThrowOnError>) => RequestResult<UpdateUserUsernameResponse, UpdateUserUsernameError, ThrowOnError>;

export declare type UpdateUserUsernameError = BadRequestError | UnauthorizedError | NotFoundError | ConflictError;

export declare type UpdateUserUsernameRequest = {
    path: {
        id: string;
    };
    body: {
        username: string;
    };
};

export declare type UpdateUserUsernameResponse = SingleResponse<User>;

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

export { }
