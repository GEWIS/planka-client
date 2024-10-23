export enum StatusCode {
  s400 = 'E_MISSING_OR_INVALID_PARAMS',
  s401 = 'E_UNAUTHORIZED',
  s404 = 'E_NOT_FOUND',
  s409 = 'E_CONFLICT',
}

/**
 * Authentication
 */
export type AccessTokenOidcRequest = {
  code: string;
  nonce: string;
};

export type AccessTokenRequest = {
  emailOrUsername: string;
  password: string;
};

export type Oidc = {
  oidc: string;
};

/**
 * Users
 */
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

/**
 * Projects
 */
export type Project = {
  id: string;
  createdAt: Date;
  updatedAt?: Date;
  name: string;
  background?: Background;
  backgroundImage?: BackgroundImage;
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

export type ProjectManager = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  projectId: string;
  userId: string;
};

/**
 * Boards
 */
export type Board = {
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
export type BoardMembership = {
  id: string;
  createdAt: Date;
  updatedAt?: Date;
  role: Role;
  canComment?: boolean;
  boardId: string;
  userId: string;
};

export type Role = 'editor' | 'viewer';

/**
 * Labels
 */
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

/**
 * Lists
 */
export type List = {
  id: string;
  createdAt: Date;
  updatedAt?: Date;
  position: number;
  name: string;
  boardId: string;
};

export type SortType = 'name_asc' | 'dueDate_asc' | 'createdAt_asc' | 'createdAt_desc';

/**
 * Cards
 */
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

export type CardMembership = {
  id: string;
  createdAt: Date;
  updatedAt?: Date;
  cardId: string;
  userId: string;
};

export type CardLabel = {
  id: string;
  createdAt: Date;
  updatedAt?: Date;
  cardId: string;
  labelId?: string;
};

export type Task = {
  id: string;
  createdAt: Date;
  updatedAt?: Date;
  position: number;
  name: string;
  isCompleted: boolean;
  cardId: string;
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

/**
 * Attachments
 */
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

export type Image = {
  width: number;
  height: number;
};

/**
 * Comments
 */
export type Comment = {
  id: string;
  createdAt: Date;
  updatedAt?: Date;
  cardId: string;
  userId: string;
  data: ActionText;
  type: CommentType;
};

export type ActionText = {
  text: string;
};

export type CommentType = 'commentCard';

/**
 * Notifications
 */
export type Notification = {
  id: string;
  createdAt: Date;
  updatedAt?: Date;
  isRead: boolean;
  userId: string;
  cardId: string;
  actionId: string;
};

/**
 * Responses are given as single or array, and can include other data types
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

/**
 * Most errors are roughly the same, so they are types singly
 */
export type HttpError = {
  code: string;
  message?: string;
  problems?: string[];
};

/**
 * All types necessary to provide to the hey-api client
 */

// 'GET /api/config': 'show-config'
export type GetConfigResponse = SingleResponse<Oidc>;

// 'POST /api/access-tokens': 'access-tokens/create'
export type AuthorizeRequest = {
  body: AccessTokenRequest;
};
export type AuthorizeResponse = SingleResponse<string>;
export type AuthorizeError = HttpError;

// 'POST /api/access-tokens/exchange-using-oidc': 'access-tokens/exchange-using-oidc'
export type AuthorizeOidcRequest = {
  body: AccessTokenOidcRequest;
};
export type AuthorizeOidcResponse = SingleResponse<string>;

// 'DELETE /api/access-tokens/me': 'access-tokens/delete'
export type UnauthorizeResponse = SingleResponse<string>;

// 'GET /api/users': 'users/index'
export type GetUsersResponse = ArrayResponse<User>;

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

// 'GET /api/users/:id': 'users/show'
export type GetUserRequest = {
  path: {
    id: string;
  };
};
export type GetUserResponse = SingleResponse<User>;

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

// 'DELETE /api/users/:id': 'users/delete'
export type DeleteUserRequest = {
  path: {
    id: string;
  };
};
export type DeleteUserResponse = SingleResponse<User>;

// 'GET /api/projects': 'projects/index'
export type GetProjectsResponse = ArrayResponse<Project>;

// 'POST /api/projects': 'projects/create'
export type CreateProjectRequest = {
  body: {
    name: string;
  };
};
export type CreateProjectResponse = SingleResponse<Project>;

// 'GET /api/projects/:id': 'projects/show'
export type GetProjectRequest = {
  path: {
    id: string;
  };
};
export type GetProjectResponse = SingleResponse<Project>;

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

// 'PATCH /api/projects/:id': 'projects/update'
export type UpdateProjectRequest = {
  path: {
    id: string;
  };
  body: Partial<Omit<Project, 'createdAt' | 'updatedAt' | 'id' | 'backgroundImage'>>;
};
export type UpdateProjectResponse = SingleResponse<Project>;

// 'DELETE /api/projects/:id': 'projects/delete'
export type DeleteProjectRequest = {
  path: {
    id: string;
  };
};
export type DeleteProjectResponse = SingleResponse<Project>;

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

// 'DELETE /api/project-managers/:id': 'project-managers/delete'
export type DeleteProjectManagerRequest = {
  path: {
    id: string;
  };
};
export type DeleteProjectManagerResponse = SingleResponse<ProjectManager>;

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

// 'GET /api/boards/:id': 'boards/show'
export type GetBoardRequest = {
  path: {
    id: string;
  };
};
export type GetBoardResponse = SingleResponse<Board>;

// 'PATCH /api/boards/:id': 'boards/update'
export type UpdateBoardRequest = {
  path: {
    id: string;
  };
  body: Partial<Omit<Board, 'createdAt' | 'updatedAt' | 'id' | 'projectId'>>;
};
export type UpdateBoardResponse = SingleResponse<Board>;

// 'DELETE /api/boards/:id': 'boards/delete'
export type DeleteBoardRequest = {
  path: {
    id: string;
  };
};
export type DeleteBoardResponse = SingleResponse<void>;

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

// 'DELETE /api/board-memberships/:id': 'board-memberships/delete'
export type DeleteBoardMembershipRequest = {
  path: {
    id: string;
  };
};
export type DeleteBoardMembershipResponse = SingleResponse<BoardMembership>;

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

// 'PATCH /api/labels/:id': 'labels/update'
export type UpdateLabelRequest = {
  path: {
    id: string;
  };
  body: Partial<Omit<Label, 'createdAt' | 'updatedAt' | 'id' | 'boardId'>>;
};
export type UpdateLabelResponse = SingleResponse<Label>;

// 'DELETE /api/labels/:id': 'labels/delete'
export type DeleteLabelRequest = {
  path: {
    id: string;
  };
};
export type DeleteLabelResponse = SingleResponse<Label>;

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

// 'PATCH /api/lists/:id': 'lists/update'
export type UpdateListRequest = {
  path: {
    id: string;
  };
  body: Partial<Omit<List, 'createdAt' | 'updatedAt' | 'id' | 'boardId'>>;
};
export type UpdateListResponse = SingleResponse<List>;

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

// 'DELETE /api/lists/:id': 'lists/delete'
export type DeleteListRequest = {
  path: {
    id: string;
  };
};
export type DeleteListResponse = SingleResponse<List>;

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

// 'GET /api/cards/:id': 'cards/show'
export type GetCardRequest = {
  path: {
    id: string;
  };
};
export type GetCardResponse = SingleResponse<Card>;

// 'PATCH /api/cards/:id': 'cards/update'
export type UpdateCardRequest = {
  path: {
    id: string;
  };
  body: Partial<Omit<Card, 'createdAt' | 'updatedAt' | 'id' | 'creatorUserId' | 'isSubscribed'>>;
};
export type UpdateCardResponse = SingleResponse<Card>;

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

// 'DELETE /api/cards/:id': 'cards/delete'
export type DeleteCardRequest = {
  path: {
    id: string;
  };
};
export type DeleteCardResponse = SingleResponse<Card>;

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

// 'DELETE /api/cards/:cardId/labels/:labelId': 'card-labels/delete'
export type DeleteCardLabelRequest = {
  path: {
    cardId: string;
    labelId: string;
  };
};
export type DeleteCardLabelResponse = SingleResponse<CardLabel>;

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

// 'PATCH /api/tasks/:id': 'tasks/update'
export type UpdateTaskRequest = {
  path: {
    id: string;
  };
  body: Partial<Omit<Task, 'createdAt' | 'updatedAt' | 'id' | 'cardId'>>;
};
export type UpdateTaskResponse = SingleResponse<Task>;

// 'DELETE /api/tasks/:id': 'tasks/delete'
export type DeleteTaskRequest = {
  path: {
    id: string;
  };
};
export type DeleteTaskResponse = SingleResponse<Task>;

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

// 'PATCH /api/attachments/:id': 'attachments/update'
export type UpdateAttachmentRequest = {
  path: {
    id: string;
  };
  body: Partial<
    Omit<
      Attachment,
      'createdAt' | 'updatedAt' | 'id' | 'cardId' | 'createUserId' | 'url' | 'coverUrl'
    >
  >;
};
export type UpdateAttachmentResponse = SingleResponse<Attachment>;

// 'DELETE /api/attachments/:id': 'attachments/delete'
export type DeleteAttachmentRequest = {
  path: {
    id: string;
  };
};
export type DeleteAttachmentResponse = SingleResponse<Attachment>;

// 'GET /api/cards/:cardId/actions': 'actions/index'
export type GetCardActionsRequest = {
  path: {
    cardId: string;
  };
};
export type GetCardActionsResponse = ArrayResponse<Action>;

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

// 'DELETE /api/comment-actions/:id': 'comment-actions/delete'
export type DeleteCommentActionRequest = {
  path: {
    id: string;
  };
};
export type DeleteCommentActionResponse = SingleResponse<Comment>;

// 'GET /api/notifications': 'notifications/index'
export type GetNotificationsResponse = ArrayResponse<Notification>;

// 'GET /api/notifications/:id': 'notifications/show'
export type GetNotificationRequest = {
  path: {
    id: string;
  };
};
export type GetNotificationResponse = SingleResponse<Notification>;

// 'PATCH /api/notifications/:ids': 'notifications/update'
export type UpdateNotificationsRequest = {
  path: {
    ids: string[];
  };
  body: Partial<
    Omit<Notification, 'createdAt' | 'updatedAt' | 'id' | 'cardId' | 'userId' | 'actionId'>
  >;
};
export type UpdateNotificationsResponse = ArrayResponse<Notification>;

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
      // res: {
      //   200: File;
      //   401: UnauthorizedError;
      //   404: NotFoundError;
      // };
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
      // res: {
      //   200: File;
      //   401: UnauthorizedError;
      //   404: NotFoundError;
      // };
    };
  };
};
