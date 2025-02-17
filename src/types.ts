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
  code: 'E_MISSING_OR_INVALID_PARAMS' | 'E_UNAUTHORIZED' | 'E_NOT_FOUND' | 'E_CONFLICT' | 'E_UNPROCESSABLE_ENTITY';
  message?: string;
  problems?: string[];
};

/**
 * All types necessary to provide to the hey-api client
 */

// 'GET /api/config': 'show-config'
export type GetConfigRequest = {
  body?: never;
  path?: never;
  query?: never;
  url: '/api/config';
};
export type GetConfigResponse = SingleResponse<Oidc>;

// 'POST /api/access-tokens': 'access-tokens/create'
export type AuthorizeRequest = {
  body: AccessTokenRequest;
  path?: never;
  query?: never;
  url: '/api/access-tokens';
};
export type AuthorizeResponse = SingleResponse<string>;
export type AuthorizeError = HttpError;

// 'POST /api/access-tokens/exchange-using-oidc': 'access-tokens/exchange-using-oidc'
export type AuthorizeOidcRequest = {
  body: AccessTokenOidcRequest;
  path?: never;
  query?: never;
  url: '/api/access-tokens/exchange-using-oidc';
};
export type AuthorizeOidcResponse = SingleResponse<string>;

// 'DELETE /api/access-tokens/me': 'access-tokens/delete'
export type UnauthorizeRequest = {
  body?: never;
  path?: never;
  query?: never;
  url: '/api/access-tokens/me';
};
export type UnauthorizeResponse = SingleResponse<string>;

// 'GET /api/users': 'users/index'
export type GetUsersRequest = {
  body?: never;
  path?: never;
  query?: never;
  url: '/api/users';
};
export type GetUsersResponse = ArrayResponse<User>;

// 'POST /api/users': 'users/create'
export type CreateUserRequest = {
  body: {
    email: string;
    password: string;
    name: string;
    username?: string;
  };
  path?: never;
  query?: never;
  url: '/api/users';
};
export type CreateUserResponse = SingleResponse<User>;

// 'GET /api/users/:id': 'users/show'
export type GetUserRequest = {
  path: {
    id: string;
  };
  body?: never;
  query?: never;
  url: '/api/users/{id}';
};
export type GetUserResponse = SingleResponse<User>;

// 'PATCH /api/users/:id/email': 'users/update-email'
export type UpdateUserRequest = {
  body: Partial<Omit<User, 'updatedAt' | 'createdAt' | 'deletedAt' | 'username' | 'email' | 'avatarUrl'>>;
  path: {
    id: string;
  };
  query?: never;
  url: '/api/users/{id}/email';
};
export type UpdateUserResponse = SingleResponse<User>;

// 'PATCH /api/users/:id/email': 'users/update-email'
export type UpdateUserEmailRequest = {
  body: {
    email: string;
  };
  path: {
    id: string;
  };
  query?: never;
  url: '/api/users/{id}/email';
};
export type UpdateUserEmailResponse = SingleResponse<User>;

// 'PATCH /api/users/:id/password': 'users/update-password'
export type UpdateUserPasswordRequest = {
  body: {
    password: string;
  };
  path: {
    id: string;
  };
  query?: never;
  url: '/api/users/{id}/password';
};
export type UpdateUserPasswordResponse = SingleResponse<User>;

// 'PATCH /api/users/:id/username': 'users/update-username'
export type UpdateUserUsernameRequest = {
  body: {
    username: string;
  };
  path: {
    id: string;
  };
  query?: never;
  url: '/api/users/{id}/username';
};
export type UpdateUserUsernameResponse = SingleResponse<User>;

// 'PATCH /api/users/:id/username': 'users/update-username'
export type UpdateUserAvatarRequest = {
  body: {
    file: File;
  };
  path: {
    id: string;
  };
  query?: never;
  url: '/api/users/{id}/avatar';
};
export type UpdateUserAvatarResponse = SingleResponse<User>;

// 'DELETE /api/users/:id': 'users/delete'
export type DeleteUserRequest = {
  body?: never;
  path: {
    id: string;
  };
  query?: never;
  url: '/api/users/{id}';
};
export type DeleteUserResponse = SingleResponse<User>;

// 'GET /api/projects': 'projects/index'
export type GetProjectsRequest = {
  body?: never;
  path?: never;
  query?: never;
  url: '/api/projects';
};
export type GetProjectsResponse = ArrayResponse<Project>;

// 'POST /api/projects': 'projects/create'
export type CreateProjectRequest = {
  body: {
    name: string;
  };
  path?: never;
  query?: never;
  url: '/api/projects';
};
export type CreateProjectResponse = SingleResponse<Project>;

// 'GET /api/projects/:id': 'projects/show'
export type GetProjectRequest = {
  body?: never;
  path: {
    id: string;
  };
  query?: never;
  url: '/api/projects/{id}';
};
export type GetProjectResponse = SingleResponse<Project>;

// 'POST /api/projects/:id/background-image': 'projects/update-background-image'
export type UpdateProjectBackgroundImageRequest = {
  body: {
    file: File;
  };
  path: {
    id: string;
  };
  query?: never;
  url: '/api/projects/{id}/background-image';
};
export type UpdateProjectBackgroundImageResponse = SingleResponse<Project>;

// 'PATCH /api/projects/:id': 'projects/update'
export type UpdateProjectRequest = {
  body: Partial<Omit<Project, 'createdAt' | 'updatedAt' | 'id' | 'backgroundImage'>>;
  path: {
    id: string;
  };
  query?: never;
  url: '/api/projects/{id}';
};
export type UpdateProjectResponse = SingleResponse<Project>;

// 'DELETE /api/projects/:id': 'projects/delete'
export type DeleteProjectRequest = {
  body?: never;
  path: {
    id: string;
  };
  query?: never;
  url: '/api/projects/{id}';
};
export type DeleteProjectResponse = SingleResponse<Project>;

// 'POST /api/projects/:projectId/managers': 'project-managers/create'
export type CreateProjectManagerRequest = {
  body: {
    userId: string;
  };
  path: {
    projectId: string;
  };
  query?: never;
  url: '/api/projects/{projectId}/managers';
};
export type CreateProjectManagerResponse = SingleResponse<ProjectManager>;

// 'DELETE /api/project-managers/:id': 'project-managers/delete'
export type DeleteProjectManagerRequest = {
  body?: never;
  path: {
    id: string;
  };
  query?: never;
  url: '/api/project-managers/{id}';
};
export type DeleteProjectManagerResponse = SingleResponse<ProjectManager>;

// 'POST /api/projects/:projectId/boards': 'boards/create'
export type CreateBoardRequest = {
  body: {
    position: number;
    name: string;
  };
  path: {
    projectId: string;
  };
  query?: never;
  url: '/api/projects/{projectId}/boards';
};
export type CreateBoardResponse = SingleResponse<Board>;

// 'GET /api/boards/:id': 'boards/show'
export type GetBoardRequest = {
  body?: never;
  path: {
    id: string;
  };
  query?: never;
  url: '/api/boards/{id}';
};
export type GetBoardResponse = SingleResponse<Board>;

// 'PATCH /api/boards/:id': 'boards/update'
export type UpdateBoardRequest = {
  body: Partial<Omit<Board, 'createdAt' | 'updatedAt' | 'id' | 'projectId'>>;
  path: {
    id: string;
  };
  query?: never;
  url: '/api/boards/{id}';
};
export type UpdateBoardResponse = SingleResponse<Board>;

// 'DELETE /api/boards/:id': 'boards/delete'
export type DeleteBoardRequest = {
  body?: never;
  path: {
    id: string;
  };
  query?: never;
  url: '/api/boards/{id}';
};
export type DeleteBoardResponse = SingleResponse<void>;

// 'POST /api/boards/:boardId/memberships': 'board-memberships/create'
export type CreateBoardMembershipRequest = {
  body: {
    userId: string;
    role: Role;
  };
  path: {
    boardId: string;
  };
  query?: never;
  url: '/api/boards/{boardId}/memberships';
};
export type CreateBoardMembershipResponse = SingleResponse<BoardMembership>;

// 'PATCH /api/board-memberships/:id': 'board-memberships/update'
export type UpdateBoardMembershipRequest = {
  body: {
    role: Role;
  };
  path: {
    id: string;
  };
  query?: never;
  url: '/api/board-memberships/{id}';
};
export type UpdateBoardMembershipResponse = SingleResponse<BoardMembership>;

// 'DELETE /api/board-memberships/:id': 'board-memberships/delete'
export type DeleteBoardMembershipRequest = {
  body?: never;
  path: {
    id: string;
  };
  query?: never;
  url: '/api/board-memberships/{id}';
};
export type DeleteBoardMembershipResponse = SingleResponse<BoardMembership>;

// 'POST /api/boards/:boardId/labels': 'labels/create'
export type CreateLabelRequest = {
  body: {
    name: string;
    position: number;
    color: LabelColor;
  };
  path: {
    boardId: string;
  };
  query?: never;
  url: '/api/boards/{boardId}/labels';
};
export type CreateLabelResponse = SingleResponse<Label>;

// 'PATCH /api/labels/:id': 'labels/update'
export type UpdateLabelRequest = {
  body: Partial<Omit<Label, 'createdAt' | 'updatedAt' | 'id' | 'boardId'>>;
  path: {
    id: string;
  };
  query?: never;
  url: '/api/labels/{id}';
};
export type UpdateLabelResponse = SingleResponse<Label>;

// 'DELETE /api/labels/:id': 'labels/delete'
export type DeleteLabelRequest = {
  body?: never;
  path: {
    id: string;
  };
  query?: never;
  url: '/api/labels/{id}';
};
export type DeleteLabelResponse = SingleResponse<Label>;

// 'POST /api/boards/:boardId/lists': 'lists/create'
export type CreateListRequest = {
  body: {
    position: number;
    name: string;
  };
  path: {
    boardId: string;
  };
  query?: never;
  url: '/api/boards/{boardId}/lists';
};
export type CreateListResponse = SingleResponse<List>;

// 'PATCH /api/lists/:id': 'lists/update'
export type UpdateListRequest = {
  body: Partial<Omit<List, 'createdAt' | 'updatedAt' | 'id' | 'boardId'>>;
  path: {
    id: string;
  };
  query?: never;
  url: '/api/lists/{id}';
};
export type UpdateListResponse = SingleResponse<List>;

// 'POST /api/lists/:id/sort': 'lists/sort'
export type SortListRequest = {
  body: {
    type: SortType;
  };
  path: {
    id: string;
  };
  query?: never;
  url: '/api/lists/{id}/sort';
};
export type SortListResponse = SingleResponse<List>;

// 'DELETE /api/lists/:id': 'lists/delete'
export type DeleteListRequest = {
  body?: never;
  path: {
    id: string;
  };
  query?: never;
  url: '/api/lists/{id}';
};
export type DeleteListResponse = SingleResponse<List>;

// 'POST /api/lists/:listId/cards': 'cards/create'
export type CreateCardRequest = {
  body: {
    name: string;
    position: number;
  };
  path: {
    listId: string;
  };
  query?: never;
  url: '/api/lists/{listId}/cards';
};
export type CreateCardResponse = SingleResponse<Card>;

// 'GET /api/cards/:id': 'cards/show'
export type GetCardRequest = {
  body?: never;
  path: {
    id: string;
  };
  query?: never;
  url: '/api/cards/{id}';
};
export type GetCardResponse = SingleResponse<Card>;

// 'PATCH /api/cards/:id': 'cards/update'
export type UpdateCardRequest = {
  body: Partial<Omit<Card, 'createdAt' | 'updatedAt' | 'id' | 'creatorUserId' | 'isSubscribed'>>;
  path: {
    id: string;
  };
  query?: never;
  url: '/api/cards/{id}';
};
export type UpdateCardResponse = SingleResponse<Card>;

// 'POST /api/cards/:id/duplicate': 'cards/duplicate'
export type DuplicateCardRequest = {
  body: {
    position: number;
  };
  path: {
    id: string;
  };
  query?: never;
  url: '/api/cards/{id}/duplicate';
};
export type DuplicateCardResponse = SingleResponse<Card>;

// 'DELETE /api/cards/:id': 'cards/delete'
export type DeleteCardRequest = {
  body?: never;
  path: {
    id: string;
  };
  query?: never;
  url: '/api/cards/{id}';
};
export type DeleteCardResponse = SingleResponse<Card>;

// 'POST /api/cards/:cardId/memberships': 'card-memberships/create'
export type CreateCardMembershipRequest = {
  body: {
    userId: string;
  };
  path: {
    cardId: string;
  };
  query?: never;
  url: '/api/cards/{cardId}/memberships';
};
export type CreateCardMembershipResponse = SingleResponse<CardMembership>;

// 'DELETE /api/cards/:cardId/memberships': 'card-memberships/delete'
export type DeleteCardMembershipRequest = {
  body: {
    userId: string;
  };
  path: {
    cardId: string;
  };
  query?: never;
  url: '/api/cards/{cardId}/memberships';
};
export type DeleteCardMembershipResponse = SingleResponse<CardMembership>;

// 'POST /api/cards/:cardId/labels': 'card-labels/create'
export type CreateCardLabelRequest = {
  body: {
    labelId: string;
  };
  path: {
    cardId: string;
  };
  query?: never;
  url: '/api/cards/{cardId}/labels';
};
export type CreateCardLabelResponse = SingleResponse<CardLabel>;

// 'DELETE /api/cards/:cardId/labels/:labelId': 'card-labels/delete'
export type DeleteCardLabelRequest = {
  body?: never;
  path: {
    cardId: string;
    labelId: string;
  };
  query?: never;
  url: '/api/cards/{cardId}/labels/{labelId}';
};
export type DeleteCardLabelResponse = SingleResponse<CardLabel>;

// 'POST /api/cards/:cardId/tasks': 'tasks/create'
export type CreateTaskRequest = {
  body: {
    position: number;
    name: string;
  };
  path: {
    cardId: string;
  };
  query?: never;
  url: '/api/cards/{cardId}/tasks';
};
export type CreateTaskResponse = SingleResponse<Task>;

// 'PATCH /api/tasks/:id': 'tasks/update'
export type UpdateTaskRequest = {
  body: Partial<Omit<Task, 'createdAt' | 'updatedAt' | 'id' | 'cardId'>>;
  path: {
    id: string;
  };
  query?: never;
  url: '/api/tasks/{id}';
};
export type UpdateTaskResponse = SingleResponse<Task>;

// 'DELETE /api/tasks/:id': 'tasks/delete'
export type DeleteTaskRequest = {
  body?: never;
  path: {
    id: string;
  };
  query?: never;
  url: '/api/tasks/{id}';
};
export type DeleteTaskResponse = SingleResponse<Task>;

// 'POST /api/cards/:cardId/attachments': 'attachments/create'
export type CreateAttachmentRequest = {
  body: {
    file: File;
  };
  path: {
    cardId: string;
  };
  query?: never;
  url: '/api/cards/{cardId}/attachments';
};
export type CreateAttachmentResponse = SingleResponse<Attachment>;

// 'PATCH /api/attachments/:id': 'attachments/update'
export type UpdateAttachmentRequest = {
  body: Partial<Omit<Attachment, 'createdAt' | 'updatedAt' | 'id' | 'cardId' | 'createUserId' | 'url' | 'coverUrl'>>;
  path: {
    id: string;
  };
  query?: never;
  url: '/api/attachments/{id}';
};
export type UpdateAttachmentResponse = SingleResponse<Attachment>;

// 'DELETE /api/attachments/:id': 'attachments/delete'
export type DeleteAttachmentRequest = {
  body?: never;
  path: {
    id: string;
  };
  query?: never;
  url: '/api/attachments/{id}';
};
export type DeleteAttachmentResponse = SingleResponse<Attachment>;

// 'GET /attachments/:id/download/:filename'
export type GetAttachmentRequest = {
  body?: never;
  path: {
    id: string;
    filename: string;
  };
  query?: never;
  url: '/attachments/{id}/download/{filename}';
};
export type GetAttachmentResponse = Blob;

// 'GET /attachments/:id/download/thumbnails/cover-256.:extension'
export type GetAttachmentThumbnailRequest = {
  body?: never;
  path: {
    id: string;
    extension: string;
  };
  query?: never;
  url: '/attachments/{id}/download/thumbnails/cover-256.{extension}';
};
export type GetAttachmentThumbnailResponse = Blob;

// 'GET /api/cards/:cardId/actions': 'actions/index'
export type GetCardActionsRequest = {
  body?: never;
  path: {
    cardId: string;
  };
  query?: never;
  url: '/api/cards/{cardId}/actions';
};
export type GetCardActionsResponse = ArrayResponse<Action>;

// 'POST /api/cards/:cardId/comment-actions': 'comment-actions/create'
export type CreateCommentActionRequest = {
  body: {
    text: string;
  };
  path: {
    cardId: string;
  };
  query?: never;
  url: '/api/cards/{cardId}/comment-actions';
};
export type CreateCommentActionResponse = SingleResponse<Comment>;

// 'PATCH /api/comment-actions/:id': 'comment-actions/update'
export type UpdateCommentActionRequest = {
  body: {
    text: string;
  };
  path: {
    id: string;
  };
  query?: never;
  url: '/api/comment-actions/{id}';
};
export type UpdateCommentActionResponse = SingleResponse<Comment>;

// 'DELETE /api/comment-actions/:id': 'comment-actions/delete'
export type DeleteCommentActionRequest = {
  body?: never;
  path: {
    id: string;
  };
  query?: never;
  url: '/api/comment-actions/{id}';
};
export type DeleteCommentActionResponse = SingleResponse<Comment>;

// 'GET /api/notifications': 'notifications/index'
export type GetNotificationsRequest = {
  body?: never;
  path?: never;
  query?: never;
  url: '/api/notifications';
};
export type GetNotificationsResponse = ArrayResponse<Notification>;

// 'GET /api/notifications/:id': 'notifications/show'
export type GetNotificationRequest = {
  body?: never;
  path: {
    id: string;
  };
  query?: never;
  url: '/api/notifications/{id}';
};
export type GetNotificationResponse = SingleResponse<Notification>;

// 'PATCH /api/notifications/:ids': 'notifications/update'
export type UpdateNotificationsRequest = {
  body: Partial<Omit<Notification, 'createdAt' | 'updatedAt' | 'id' | 'cardId' | 'userId' | 'actionId'>>;
  path: {
    ids: string[];
  };
  query?: never;
  url: '/api/notifications/{ids}';
};
export type UpdateNotificationsResponse = ArrayResponse<Notification>;
