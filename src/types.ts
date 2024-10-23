export enum StatusCode {
  s400 = 'E_MISSING_OR_INVALID_PARAMS',
  s401 = 'E_UNAUTHORIZED',
  s404 = 'E_NOT_FOUND',
  s409 = 'E_CONFLICT',
}

/*
  All schemas
 */
export type AccessTokenOidcRequest = {
  code: string;
  nonce: string;
};

export type AccessTokenRequest = {
  emailOrUsername: string;
  password: string;
};

export type Action = {
  id: string;
  createdAt: Date;
  updatedAt?: Date;
  type: CommentType;
  data: ActionText;
  cardId: string;
  userId: string;
};

export type ActionText = {
  text: string;
};

export type Attachment = {
  id: string;
  name: string;
  cardId: string;
  url: string;
  createUserId: string;
  createdAt: Date;
  updatedAt?: Date;
  coverUrl?: string;
  image?: Image;
};

export type Background = {
  type: BackgroundType;
  name?: BackgroundGradient;
};

export type BackgroundGradient =
  | 'old-lime'
  | 'ocean-dive'
  | 'tzepesch-style'
  | 'jungle-mesh'
  | 'strawberry-dust'
  | 'purple-rose'
  | 'sun-scream'
  | 'warm-rust'
  | 'sky-change'
  | 'green-eyes'
  | 'blue-xchange'
  | 'blood-orange'
  | 'sour-peel'
  | 'green-ninja'
  | 'algae-green'
  | 'coral-reef'
  | 'steel-grey'
  | 'heat-waves'
  | 'velvet-lounge'
  | 'purple-rain'
  | 'blue-steel'
  | 'blueish-curve'
  | 'prism-light'
  | 'green-mist'
  | 'red-curtain';

export type BackgroundImage = {
  url?: string;
  coverUrl?: string;
};

export type BackgroundType = 'gradient' | 'image';

export type Board = {
  id: string;
  createdAt: Date;
  updatedAt?: Date;
  position: number;
  name: string;
  projectId: string;
};

export type BoardMembership = {
  id: string;
  createdAt: Date;
  updatedAt?: Date;
  role: Role;
  canComment?: boolean;
  boardId: string;
  userId: string;
};

export type Card = {
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

export type CardLabel = {
  id: string;
  createdAt: Date;
  updatedAt?: Date;
  cardId: string;
  labelId?: string;
};

export type CardMembership = {
  id: string;
  createdAt: Date;
  updatedAt?: Date;
  cardId: string;
  userId: string;
};

export type Comment = {
  id: string;
  createdAt: Date;
  updatedAt?: Date;
  cardId: string;
  userId: string;
  data: ActionText;
  type: CommentType;
};

export type CommentType = 'commentCard';

export type Image = {
  width: number;
  height: number;
};

export type Label = {
  id: string;
  createdAt: Date;
  updatedAt?: Date;
  position: number;
  name: string;
  color: LabelColor;
  boardId: string;
};

export type LabelColor =
  | 'berry-red'
  | 'pumpkin-orange'
  | 'lagoon-blue'
  | 'pink-tulip'
  | 'light-mud'
  | 'orange-peel'
  | 'bright-moss'
  | 'antique-blue'
  | 'dark-granite'
  | 'lagune-blue'
  | 'sunny-grass'
  | 'morning-sky'
  | 'light-orange'
  | 'midnight-blue'
  | 'tank-green'
  | 'gun-metal'
  | 'wet-moss'
  | 'red-burgundy'
  | 'light-concrete'
  | 'apricot-red'
  | 'desert-sand'
  | 'navy-blue'
  | 'egg-yellow'
  | 'coral-green'
  | 'light-cocoa';

export type List = {
  id: string;
  createdAt: Date;
  updatedAt?: Date;
  position: number;
  name: string;
  boardId: string;
};

export type Notification = {
  id: string;
  createdAt: Date;
  updatedAt?: Date;
  isRead: boolean;
  userId: string;
  cardId: string;
  actionId: string;
};

export type Oidc = {
  oidc: string;
};

export type Project = {
  id: string;
  createdAt: Date;
  updatedAt?: Date;
  name: string;
  background?: Background;
  backgroundImage?: BackgroundImage;
};

export type ProjectManager = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  projectId: string;
  userId: string;
};

export type Role = 'editor' | 'viewer';

export type Task = {
  id: string;
  createdAt: Date;
  updatedAt?: Date;
  position: number;
  name: string;
  isCompleted: boolean;
  cardId: string;
};

export type User = {
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

export type Language =
  | 'ar-YE'
  | 'bg-BG'
  | 'cs-CZ'
  | 'da-DK'
  | 'de-DE'
  | 'en-GB'
  | 'en-US'
  | 'es-ES'
  | 'fa-IR'
  | 'fr-FR'
  | 'hu-HU'
  | 'id-ID'
  | 'it-IT'
  | 'ja-JP'
  | 'ko-KR'
  | 'nl-NL'
  | 'pl-PL'
  | 'pt-BR'
  | 'ro-RO'
  | 'ru-RU'
  | 'sk-SK'
  | 'sv-SE'
  | 'tr-TR'
  | 'uk-UA'
  | 'uz-UZ'
  | 'zh-CN'
  | 'zh-TW';

/*
  Wrappers for types above
 */
export type SingleResponse<T> = {
  item: T;
  included?: Partial<Include>;
};

export type ArrayResponse<T> = {
  items: T[];
  included?: Partial<Include>;
};

export type Include = {
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

export type SortType = 'name_asc' | 'dueDate_asc' | 'createdAt_asc' | 'createdAt_desc';

/*
  All type of possible errors
 */
export type BaseError = {
  code: string;
  message: string;
};

export type BadRequestError = BaseError & {
  problems: string[];
};

export type UnauthorizedError = BaseError;

export type ConflictError = BaseError;

export type NotFoundError = Omit<BaseError, 'message'>;

export type UnprocessableError = BaseError;

// 'GET /api/config': 'show-config'
export type GetConfigResponse = SingleResponse<Oidc>;
export type GetConfigError = unknown;

// 'POST /api/access-tokens': 'access-tokens/create'
export type AuthorizeRequest = {
  body: AccessTokenRequest;
};
export type AuthorizeResponse = SingleResponse<string>;
export type AuthorizeError = BadRequestError;

// 'POST /api/access-tokens/exchange-using-oidc': 'access-tokens/exchange-using-oidc'
export type AuthorizeOidcRequest = {
  body: AccessTokenOidcRequest;
};
export type AuthorizeOidcResponse = SingleResponse<string>;
export type AuthorizeOidcError = BadRequestError | UnauthorizedError;

// 'DELETE /api/access-tokens/me': 'access-tokens/delete'
export type UnauthorizeResponse = SingleResponse<string>;
export type UnauthorizeError = UnauthorizedError;

// 'GET /api/users': 'users/index'
export type GetUsersResponse = ArrayResponse<User>;
export type GetUsersError = UnauthorizedError;

// 'POST /api/users': 'users/create'
export type CreateUserRequest = {
  body: {
    email: string;
    password: string;
    name: string;
    username?: string;
  };
};
export type CreateUserResponse = SingleResponse<User>;
export type CreateUserError = BadRequestError | UnauthorizedError | ConflictError;

// 'GET /api/users/:id': 'users/show'
export type GetUserRequest = {
  path: {
    id: string;
  };
};
export type GetUserResponse = SingleResponse<User>;
export type GetUserError = UnauthorizedError | NotFoundError;

// 'PATCH /api/users/:id/email': 'users/update-email'
export type UpdateUserRequest = {
  path: {
    id: string;
  };
  body: Partial<
    Omit<User, 'updatedAt' | 'createdAt' | 'deletedAt' | 'username' | 'email' | 'avatarUrl'>
  >;
};
export type UpdateUserResponse = SingleResponse<User>;
export type UpdateUserError = BadRequestError | UnauthorizedError | NotFoundError;

// 'PATCH /api/users/:id/email': 'users/update-email'
export type UpdateUserEmailRequest = {
  path: {
    id: string;
  };
  body: {
    email: string;
  };
};
export type UpdateUserEmailResponse = SingleResponse<User>;
export type UpdateUserEmailError =
  | BadRequestError
  | UnauthorizedError
  | NotFoundError
  | ConflictError;

// 'PATCH /api/users/:id/password': 'users/update-password'
export type UpdateUserPasswordRequest = {
  path: {
    id: string;
  };
  body: {
    password: string;
  };
};
export type UpdateUserPasswordResponse = SingleResponse<User>;
export type UpdateUserPasswordError =
  | BadRequestError
  | UnauthorizedError
  | NotFoundError
  | ConflictError;

// 'PATCH /api/users/:id/username': 'users/update-username'
export type UpdateUserUsernameRequest = {
  path: {
    id: string;
  };
  body: {
    username: string;
  };
};
export type UpdateUserUsernameResponse = SingleResponse<User>;
export type UpdateUserUsernameError =
  | BadRequestError
  | UnauthorizedError
  | NotFoundError
  | ConflictError;

// 'PATCH /api/users/:id/username': 'users/update-username'
export type UpdateUserAvatarRequest = {
  path: {
    id: string;
  };
  body: {
    file: File;
  };
};
export type UpdateUserAvatarResponse = SingleResponse<User>;
export type UpdateUserAvatarError =
  | BadRequestError
  | UnauthorizedError
  | NotFoundError
  | UnprocessableError;

// 'DELETE /api/users/:id': 'users/delete'
export type DeleteUserRequest = {
  path: {
    id: string;
  };
};
export type DeleteUserResponse = SingleResponse<User>;
export type DeleteUserError = UnauthorizedError | NotFoundError;

// 'GET /api/projects': 'projects/index'
export type GetProjectsResponse = ArrayResponse<Project>;
export type GetProjectsError = UnauthorizedError;

// 'POST /api/projects': 'projects/create'
export type CreateProjectRequest = {
  body: {
    name: string;
  };
};
export type CreateProjectResponse = SingleResponse<Project>;
export type CreateProjectError = BadRequestError | UnauthorizedError;

// 'GET /api/projects/:id': 'projects/show'
export type GetProjectRequest = {
  path: {
    id: string;
  };
};
export type GetProjectResponse = SingleResponse<Project>;
export type GetProjectError = BadRequestError | UnauthorizedError | NotFoundError;

// 'POST /api/projects/:id/background-image': 'projects/update-background-image'
export type UpdateProjectBackgroundImageRequest = {
  path: {
    id: string;
  };
  body: {
    file: File;
  };
};
export type UpdateProjectBackgroundImageResponse = SingleResponse<Project>;
export type UpdateProjectBackgroundImageError =
  | BadRequestError
  | UnauthorizedError
  | NotFoundError
  | UnprocessableError;

// 'PATCH /api/projects/:id': 'projects/update'
export type UpdateProjectRequest = {
  path: {
    id: string;
  };
  body: Partial<Omit<Project, 'createdAt' | 'updatedAt' | 'id' | 'backgroundImage'>>;
};
export type UpdateProjectResponse = SingleResponse<Project>;
export type UpdateProjectError = UnauthorizeError | NotFoundError;

// 'DELETE /api/projects/:id': 'projects/delete'
export type DeleteProjectRequest = {
  path: {
    id: string;
  };
};
export type DeleteProjectResponse = SingleResponse<Project>;
export type DeleteProjectError = UnauthorizeError | NotFoundError;

// 'POST /api/projects/:projectId/managers': 'project-managers/create'
export type CreateProjectManagerRequest = {
  path: {
    projectId: string;
  };
  body: {
    userId: string;
  };
};
export type CreateProjectManagerResponse = SingleResponse<ProjectManager>;
export type CreateProjectManagerError = BadRequestError | UnauthorizedError | NotFoundError;

// 'DELETE /api/project-managers/:id': 'project-managers/delete'
export type DeleteProjectManagerRequest = {
  path: {
    id: string;
  };
};
export type DeleteProjectManagerResponse = SingleResponse<ProjectManager>;
export type DeleteProjectManagerError = BadRequestError | UnauthorizedError;

// 'POST /api/projects/:projectId/boards': 'boards/create'
export type CreateBoardRequest = {
  path: {
    projectId: string;
  };
  body: {
    position: number;
    name: string;
  };
};
export type CreateBoardResponse = SingleResponse<Board>;
export type CreateBoardError = BadRequestError | UnauthorizedError | NotFoundError;

// 'GET /api/boards/:id': 'boards/show'
export type GetBoardRequest = {
  path: {
    id: string;
  };
};
export type GetBoardResponse = SingleResponse<Board>;
export type GetBoardError = UnauthorizeError | NotFoundError;

// 'PATCH /api/boards/:id': 'boards/update'
export type UpdateBoardRequest = {
  path: {
    id: string;
  };
  body: Partial<Omit<Board, 'createdAt' | 'updatedAt' | 'id' | 'projectId'>>;
};
export type UpdateBoardResponse = SingleResponse<Board>;
export type UpdateBoardError = UnauthorizedError | NotFoundError;

// 'DELETE /api/boards/:id': 'boards/delete'
export type DeleteBoardRequest = {
  path: {
    id: string;
  };
};
export type DeleteBoardResponse = SingleResponse<void>;
export type DeleteBoardError = UnauthorizedError | NotFoundError;

// 'POST /api/boards/:boardId/memberships': 'board-memberships/create'
export type CreateBoardMembershipRequest = {
  path: {
    boardId: string;
  };
  body: {
    userId: string;
    role: Role;
  };
};
export type CreateBoardMembershipResponse = SingleResponse<BoardMembership>;
export type CreateBoardMembershipError =
  | BadRequestError
  | UnauthorizedError
  | NotFoundError
  | ConflictError;

// 'PATCH /api/board-memberships/:id': 'board-memberships/update'
export type UpdateBoardMembershipRequest = {
  path: {
    id: string;
  };
  body: {
    role: Role;
  };
};
export type UpdateBoardMembershipResponse = SingleResponse<BoardMembership>;
export type UpdateBoardMembershipError = UnauthorizedError | NotFoundError;

// 'DELETE /api/board-memberships/:id': 'board-memberships/delete'
export type DeleteBoardMembershipRequest = {
  path: {
    id: string;
  };
};
export type DeleteBoardMembershipResponse = SingleResponse<BoardMembership>;
export type DeleteBoardMembershipError = UnauthorizedError | NotFoundError;

// 'POST /api/boards/:boardId/labels': 'labels/create'
export type CreateLabelRequest = {
  path: {
    boardId: string;
  };
  body: {
    name: string;
    position: number;
    color: LabelColor;
  };
};
export type CreateLabelResponse = SingleResponse<Label>;
export type CreateLabelError = BadRequestError | UnauthorizedError | NotFoundError;

// 'PATCH /api/labels/:id': 'labels/update'
export type UpdateLabelRequest = {
  path: {
    id: string;
  };
  body: Partial<Omit<Label, 'createdAt' | 'updatedAt' | 'id' | 'boardId'>>;
};
export type UpdateLabelResponse = SingleResponse<Label>;
export type UpdateLabelError = UnauthorizedError | NotFoundError;

// 'DELETE /api/labels/:id': 'labels/delete'
export type DeleteLabelRequest = {
  path: {
    id: string;
  };
};
export type DeleteLabelResponse = SingleResponse<Label>;
export type DeleteLabelError = UnauthorizedError | NotFoundError;

// 'POST /api/boards/:boardId/lists': 'lists/create'
export type CreateListRequest = {
  path: {
    boardId: string;
  };
  body: {
    position: number;
    name: string;
  };
};
export type CreateListResponse = SingleResponse<List>;
export type CreateListError = BadRequestError | UnauthorizedError | NotFoundError;

// 'PATCH /api/lists/:id': 'lists/update'
export type UpdateListRequest = {
  path: {
    id: string;
  };
  body: Partial<Omit<List, 'createdAt' | 'updatedAt' | 'id' | 'boardId'>>;
};
export type UpdateListResponse = SingleResponse<List>;
export type UpdateListError = UnauthorizedError | NotFoundError;

// 'POST /api/lists/:id/sort': 'lists/sort'
export type SortListRequest = {
  path: {
    id: string;
  };
  body: {
    type: SortType;
  };
};
export type SortListResponse = SingleResponse<List>;
export type SortListError = UnauthorizedError | NotFoundError;

// 'DELETE /api/lists/:id': 'lists/delete'
export type DeleteListRequest = {
  path: {
    id: string;
  };
};
export type DeleteListResponse = SingleResponse<List>;
export type DeleteListError = UnauthorizedError | NotFoundError;

// 'POST /api/lists/:listId/cards': 'cards/create'
export type CreateCardRequest = {
  path: {
    listId: string;
  };
  body: {
    name: string;
    position: number;
  };
};
export type CreateCardResponse = SingleResponse<Card>;
export type CreateCardError =
  | BadRequestError
  | UnauthorizedError
  | NotFoundError
  | UnprocessableError;

// 'GET /api/cards/:id': 'cards/show'
export type GetCardRequest = {
  path: {
    id: string;
  };
};
export type GetCardResponse = SingleResponse<Card>;
export type GetCardError = UnauthorizedError | NotFoundError;

// 'PATCH /api/cards/:id': 'cards/update'
export type UpdateCardRequest = {
  path: {
    id: string;
  };
  body: Partial<Omit<Card, 'createdAt' | 'updatedAt' | 'id' | 'creatorUserId' | 'isSubscribed'>>;
};
export type UpdateCardResponse = SingleResponse<Card>;
export type UpdateCardError = UnauthorizedError | NotFoundError;

// 'POST /api/cards/:id/duplicate': 'cards/duplicate'
export type DuplicateCardRequest = {
  path: {
    id: string;
  };
  body: {
    position: number;
  };
};
export type DuplicateCardResponse = SingleResponse<Card>;
export type DuplicateCardError = BadRequestError | UnauthorizedError | NotFoundError;

// 'DELETE /api/cards/:id': 'cards/delete'
export type DeleteCardRequest = {
  path: {
    id: string;
  };
};
export type DeleteCardResponse = SingleResponse<Card>;
export type DeleteCardError = UnauthorizedError | NotFoundError;

// 'POST /api/cards/:cardId/memberships': 'card-memberships/create'
export type CreateCardMembershipRequest = {
  path: {
    cardId: string;
  };
  body: {
    userId: string;
  };
};
export type CreateCardMembershipResponse = SingleResponse<CardMembership>;
export type CreateCardMembershipError = BadRequestError | UnauthorizedError | NotFoundError;

// 'DELETE /api/cards/:cardId/memberships': 'card-memberships/delete'
export type DeleteCardMembershipRequest = {
  path: {
    cardId: string;
  };
  body: {
    userId: string;
  };
};
export type DeleteCardMembershipResponse = SingleResponse<CardMembership>;
export type DeleteCardMembershipError = BadRequestError | UnauthorizedError | NotFoundError;

// 'POST /api/cards/:cardId/labels': 'card-labels/create'
export type CreateCardLabelRequest = {
  path: {
    cardId: string;
  };
  body: {
    labelId: string;
  };
};
export type CreateCardLabelResponse = SingleResponse<CardLabel>;
export type CreateCardLabelError = BadRequestError | UnauthorizedError | NotFoundError;

// 'DELETE /api/cards/:cardId/labels/:labelId': 'card-labels/delete'
export type DeleteCardLabelRequest = {
  path: {
    cardId: string;
    labelId: string;
  };
};
export type DeleteCardLabelResponse = SingleResponse<CardLabel>;
export type DeleteCardLabelError = BadRequestError | UnauthorizedError | NotFoundError;

// 'POST /api/cards/:cardId/tasks': 'tasks/create'
export type CreateTaskRequest = {
  path: {
    cardId: string;
  };
  body: {
    position: number;
    name: string;
  };
};
export type CreateTaskResponse = SingleResponse<Task>;
export type CreateTaskError = BadRequestError | UnauthorizedError | NotFoundError;

// 'PATCH /api/tasks/:id': 'tasks/update'
export type UpdateTaskRequest = {
  path: {
    id: string;
  };
  body: Partial<Omit<Task, 'createdAt' | 'updatedAt' | 'id' | 'cardId'>>;
};
export type UpdateTaskResponse = SingleResponse<Task>;
export type UpdateTaskError = UnauthorizedError | NotFoundError;

// 'DELETE /api/tasks/:id': 'tasks/delete'
export type DeleteTaskRequest = {
  path: {
    id: string;
  };
};
export type DeleteTaskResponse = SingleResponse<Task>;
export type DeleteTaskError = UnauthorizedError | NotFoundError;

// 'POST /api/cards/:cardId/attachments': 'attachments/create'
export type CreateAttachmentRequest = {
  path: {
    cardId: string;
  };
  body: {
    file: File;
  };
};
export type CreateAttachmentResponse = SingleResponse<Attachment>;
export type CreateAttachmentError = BadRequestError | UnauthorizedError | NotFoundError;

// 'PATCH /api/attachments/:id': 'attachments/update'
export type UpdateAttachmentRequest = {
  path: {
    id: string;
  };
  body: Partial<Attachment>;
};
export type UpdateAttachmentResponse = SingleResponse<Attachment>;
export type UpdateAttachmentError = UnauthorizedError | NotFoundError;

// 'DELETE /api/attachments/:id': 'attachments/delete'
export type DeleteAttachmentRequest = {
  path: {
    id: string;
  };
};
export type DeleteAttachmentResponse = SingleResponse<Attachment>;
export type DeleteAttachmentError = UnauthorizedError | NotFoundError;

// 'GET /api/cards/:cardId/actions': 'actions/index'
export type GetCardActionsRequest = {
  path: {
    cardId: string;
  };
};
export type GetCardActionsResponse = ArrayResponse<Action>;
export type GetCardActionsError = UnauthorizedError | NotFoundError;

// 'POST /api/cards/:cardId/comment-actions': 'comment-actions/create'
export type CreateCommentActionRequest = {
  path: {
    cardId: string;
  };
  body: {
    text: string;
  };
};
export type CreateCommentActionResponse = SingleResponse<Comment>;
export type CreateCommentActionError = BadRequestError | UnauthorizedError | NotFoundError;

// 'PATCH /api/comment-actions/:id': 'comment-actions/update'
export type UpdateCommentActionRequest = {
  path: {
    id: string;
  };
  body: {
    text: string;
  };
};
export type UpdateCommentActionResponse = SingleResponse<Comment>;
export type UpdateCommentActionError = UnauthorizedError | NotFoundError;

// 'DELETE /api/comment-actions/:id': 'comment-actions/delete'
export type DeleteCommentActionRequest = {
  path: {
    id: string;
  };
};
export type DeleteCommentActionResponse = SingleResponse<Comment>;
export type DeleteCommentActionError = UnauthorizedError | NotFoundError;

// 'GET /api/notifications': 'notifications/index'
export type GetNotificationsResponse = ArrayResponse<Notification>;
export type GetNotificationsError = UnauthorizedError | NotFoundError;

// 'GET /api/notifications/:id': 'notifications/show'
export type GetNotificationRequest = {
  path: {
    id: string;
  };
};
export type GetNotificationResponse = ArrayResponse<Notification>;
export type GetNotificationError = UnauthorizedError | NotFoundError;

// 'PATCH /api/notifications/:ids': 'notifications/update'
export type UpdateNotificationsRequest = {
  path: {
    ids: string;
  };
  body: Partial<
    Omit<Notification, 'createdAt' | 'updatedAt' | 'id' | 'cardId' | 'userId' | 'actionId'>
  >;
};
export type UpdateNotificationsResponse = ArrayResponse<Notification>;
export type UpdateNotificationsError = NotFoundError;

// TODO - these still need to be implemented
export type $OpenApiTs = {
  // 'GET /attachments/:id/download/:filename': {
  //    action: 'attachments/download',
  //    skipAssets: false,
  // },
  '/attachments/{attachmentId}/download/{filename}': {
    get: {
      req: {
        attachmentId: string;
        filename: string;
      };
      res: {
        // TODO check correctness
        200: File;
        401: UnauthorizedError;
        404: NotFoundError;
      };
    };
  };

  // 'GET /attachments/:id/download/thumbnails/cover-256.:extension': {
  //    action: 'attachments/download-thumbnail',
  //    skipAssets: false,
  // },
  '/attachments/{attachmentId}/download/thumbnails/cover-256.{extension}': {
    get: {
      req: {
        attachmentId: string;
        extension: string;
      };
      res: {
        // TODO check correctness
        200: File;
        401: UnauthorizedError;
        404: NotFoundError;
      };
    };
  };
};
