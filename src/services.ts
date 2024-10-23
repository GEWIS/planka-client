import {
  createClient,
  createConfig,
  formDataBodySerializer,
  type Options,
} from '@hey-api/client-fetch';
import {
  AuthorizeError,
  AuthorizeOidcRequest,
  AuthorizeOidcResponse,
  AuthorizeRequest,
  AuthorizeResponse,
  CreateAttachmentRequest,
  CreateAttachmentResponse,
  CreateBoardMembershipRequest,
  CreateBoardMembershipResponse,
  CreateBoardRequest,
  CreateBoardResponse,
  CreateCardLabelRequest,
  CreateCardLabelResponse,
  CreateCardMembershipRequest,
  CreateCardMembershipResponse,
  CreateCardRequest,
  CreateCardResponse,
  CreateCommentActionRequest,
  CreateCommentActionResponse,
  CreateLabelRequest,
  CreateLabelResponse,
  CreateListRequest,
  CreateListResponse,
  CreateProjectManagerRequest,
  CreateProjectManagerResponse,
  CreateProjectRequest,
  CreateProjectResponse,
  CreateTaskRequest,
  CreateTaskResponse,
  CreateUserRequest,
  CreateUserResponse,
  DeleteAttachmentRequest,
  DeleteAttachmentResponse,
  DeleteBoardMembershipRequest,
  DeleteBoardMembershipResponse,
  DeleteBoardRequest,
  DeleteBoardResponse,
  DeleteCardLabelRequest,
  DeleteCardLabelResponse,
  DeleteCardMembershipRequest,
  DeleteCardMembershipResponse,
  DeleteCardRequest,
  DeleteCardResponse,
  DeleteCommentActionRequest,
  DeleteCommentActionResponse,
  DeleteLabelRequest,
  DeleteLabelResponse,
  DeleteListRequest,
  DeleteListResponse,
  DeleteProjectManagerRequest,
  DeleteProjectManagerResponse,
  DeleteProjectRequest,
  DeleteProjectResponse,
  DeleteTaskRequest,
  DeleteTaskResponse,
  DeleteUserRequest,
  DeleteUserResponse,
  DuplicateCardRequest,
  DuplicateCardResponse,
  GetAttachmentRequest,
  GetAttachmentResponse,
  GetAttachmentThumbnailRequest,
  GetAttachmentThumbnailResponse,
  GetBoardRequest,
  GetBoardResponse,
  GetCardActionsRequest,
  GetCardActionsResponse,
  GetCardRequest,
  GetCardResponse,
  GetConfigResponse,
  GetNotificationRequest,
  GetNotificationResponse,
  GetNotificationsResponse,
  GetProjectRequest,
  GetProjectResponse,
  GetProjectsResponse,
  GetUserRequest,
  GetUserResponse,
  GetUsersResponse,
  HttpError,
  SortListRequest,
  SortListResponse,
  UnauthorizeResponse,
  UpdateAttachmentRequest,
  UpdateAttachmentResponse,
  UpdateBoardMembershipRequest,
  UpdateBoardMembershipResponse,
  UpdateBoardRequest,
  UpdateBoardResponse,
  UpdateCardRequest,
  UpdateCardResponse,
  UpdateCommentActionRequest,
  UpdateCommentActionResponse,
  UpdateLabelRequest,
  UpdateLabelResponse,
  UpdateListRequest,
  UpdateListResponse,
  UpdateNotificationsRequest,
  UpdateNotificationsResponse,
  UpdateProjectBackgroundImageRequest,
  UpdateProjectBackgroundImageResponse,
  UpdateProjectRequest,
  UpdateProjectResponse,
  UpdateTaskRequest,
  UpdateTaskResponse,
  UpdateUserAvatarRequest,
  UpdateUserAvatarResponse,
  UpdateUserEmailRequest,
  UpdateUserEmailResponse,
  UpdateUserPasswordRequest,
  UpdateUserPasswordResponse,
  UpdateUserRequest,
  UpdateUserResponse,
  UpdateUserUsernameRequest,
  UpdateUserUsernameResponse,
} from './types';

export const client = createClient(createConfig());

/**
 * Get config
 * 'GET /api/config': 'show-config'
 * @param options
 */
export const getConfig = <ThrowOnError extends boolean = false>(
  options: Options<unknown, ThrowOnError>,
) => {
  return (options?.client ?? client).get<GetConfigResponse, unknown, ThrowOnError>({
    ...options,
    url: '/api/config',
  });
};

/**
 * Create access token
 * 'POST /api/access-tokens': 'access-tokens/create'
 * @param options
 */
export const authorize = <ThrowOnError extends boolean = false>(
  options: Options<AuthorizeRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).post<AuthorizeResponse, AuthorizeError, ThrowOnError>({
    ...options,
    url: '/api/access-tokens',
  });
};

/**
 * Exchange access token using oidc
 * 'POST /api/access-tokens/exchange-using-oidc': 'access-tokens/exchange-using-oidc'
 * TODO -- this endpoint needs a written test
 * @param options
 */
export const authorizeOidc = <ThrowOnError extends boolean = false>(
  options: Options<AuthorizeOidcRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).post<AuthorizeOidcResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/access-tokens/exchange-using-oidc',
  });
};

/**
 * Delete access token
 * 'DELETE /api/access-tokens/me': 'access-tokens/delete'
 * @param options
 */
export const unauthorize = <ThrowOnError extends boolean = false>(
  options: Options<unknown, ThrowOnError>,
) => {
  return (options?.client ?? client).delete<UnauthorizeResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/access-tokens/me',
  });
};

/**
 * Get users
 * 'GET /api/users': 'users/index'
 * @param options
 */
export const getUsers = <ThrowOnError extends boolean = false>(
  options: Options<unknown, ThrowOnError>,
) => {
  return (options?.client ?? client).get<GetUsersResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/users',
  });
};

/**
 * Create user
 * 'POST /api/users': 'users/create'
 * @param options
 */
export const createUser = <ThrowOnError extends boolean = false>(
  options: Options<CreateUserRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).post<CreateUserResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/users',
  });
};

/**
 * Get user
 * 'GET /api/users/:id': 'users/show'
 * @param options
 */
export const getUser = <ThrowOnError extends boolean = false>(
  options: Options<GetUserRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).get<GetUserResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/users/{id}',
  });
};

/**
 * Update user
 * 'PATCH /api/users/:id': 'users/update'
 * @param options
 */
export const updateUser = <ThrowOnError extends boolean = false>(
  options: Options<UpdateUserRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).patch<UpdateUserResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/users/{id}',
  });
};

/**
 * Update user email
 * 'PATCH /api/users/:id/email': 'users/update-email'
 * @param options
 */
export const updateUserEmail = <ThrowOnError extends boolean = false>(
  options: Options<UpdateUserEmailRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).patch<UpdateUserEmailResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/users/{id}/email',
  });
};

/**
 * Update user password
 * 'PATCH /api/users/:id/password': 'users/update-password'
 * @param options
 */
export const updateUserPassword = <ThrowOnError extends boolean = false>(
  options: Options<UpdateUserPasswordRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).patch<UpdateUserPasswordResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/users/{id}/password',
  });
};

/**
 * Update user username
 * 'PATCH /api/users/:id/username': 'users/update-username'
 * @param options
 */
export const updateUserUsername = <ThrowOnError extends boolean = false>(
  options: Options<UpdateUserUsernameRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).patch<UpdateUserUsernameResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/users/{id}/username',
  });
};

/**
 * Update user avatar
 * 'POST /api/users/:id/avatar': 'users/update-avatar'
 * @param options
 */
export const updateUserAvatar = <ThrowOnError extends boolean = false>(
  options: Options<UpdateUserAvatarRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).post<UpdateUserAvatarResponse, HttpError, ThrowOnError>({
    ...formDataBodySerializer,
    ...options,
    headers: {
      'Content-Type': null,
    },
    url: '/api/users/{id}/avatar',
  });
};

/**
 * Delete user
 * 'DELETE /api/users/:id': 'users/delete'
 * @param options
 */
export const deleteUser = <ThrowOnError extends boolean = false>(
  options: Options<DeleteUserRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).delete<DeleteUserResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/users/{id}',
  });
};

/**
 * Get projects
 * 'GET /api/projects': 'projects/index'
 * @param options
 */
export const getProjects = <ThrowOnError extends boolean = false>(
  options: Options<unknown, ThrowOnError>,
) => {
  return (options?.client ?? client).get<GetProjectsResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/projects',
  });
};

/**
 * Create project
 * 'POST /api/projects': 'projects/create'
 * @param options
 */
export const createProject = <ThrowOnError extends boolean = false>(
  options: Options<CreateProjectRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).post<CreateProjectResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/projects',
  });
};

/**
 * Get project
 * 'GET /api/projects/:id': 'projects/show'
 * @param options
 */
export const getProject = <ThrowOnError extends boolean = false>(
  options: Options<GetProjectRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).get<GetProjectResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/projects/{id}',
  });
};

/**
 * Update project
 * 'PATCH /api/projects/:id': 'projects/update'
 * @param options
 */
export const updateProject = <ThrowOnError extends boolean = false>(
  options: Options<UpdateProjectRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).patch<UpdateProjectResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/projects/{id}',
  });
};

/**
 * Update project background image
 * 'POST /api/projects/:id/background-image': 'projects/update-background-image'
 * @param options
 */
export const updateProjectBackgroundImage = <ThrowOnError extends boolean = false>(
  options: Options<UpdateProjectBackgroundImageRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).post<
    UpdateProjectBackgroundImageResponse,
    HttpError,
    ThrowOnError
  >({
    ...formDataBodySerializer,
    ...options,
    headers: {
      'Content-Type': null,
    },
    url: '/api/projects/{id}/background-image',
  });
};

/**
 * Delete project
 * 'DELETE /api/projects/:id': 'projects/delete'
 * @param options
 */
export const deleteProject = <ThrowOnError extends boolean = false>(
  options: Options<DeleteProjectRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).delete<DeleteProjectResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/projects/{id}',
  });
};

/**
 * Create project manager
 * 'POST /api/projects/:projectId/managers': 'project-managers/create'
 * @param options
 */
export const createProjectManager = <ThrowOnError extends boolean = false>(
  options: Options<CreateProjectManagerRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).post<CreateProjectManagerResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/projects/{projectId}/managers',
  });
};

/**
 * Delete project manager
 * 'DELETE /api/project-managers/:id': 'project-managers/delete'
 * @param options
 */
export const deleteProjectManager = <ThrowOnError extends boolean = false>(
  options: Options<DeleteProjectManagerRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).delete<DeleteProjectManagerResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/project-managers/{id}',
  });
};

/**
 * Create board
 * 'POST /api/projects/:projectId/boards': 'boards/create'
 * @param options
 */
export const createBoard = <ThrowOnError extends boolean = false>(
  options: Options<CreateBoardRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).post<CreateBoardResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/projects/{projectId}/boards',
  });
};

/**
 * Get board
 * 'GET /api/boards/:id': 'boards/show'
 * @param options
 */
export const getBoard = <ThrowOnError extends boolean = false>(
  options: Options<GetBoardRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).get<GetBoardResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/boards/{id}',
  });
};

/**
 * Update board
 * 'PATCH /api/boards/:id': 'boards/update'
 * @param options
 */
export const updateBoard = <ThrowOnError extends boolean = false>(
  options: Options<UpdateBoardRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).patch<UpdateBoardResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/boards/{id}',
  });
};

/**
 * Delete board
 * 'DELETE /api/boards/:id': 'boards/delete'
 * @param options
 */
export const deleteBoard = <ThrowOnError extends boolean = false>(
  options: Options<DeleteBoardRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).delete<DeleteBoardResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/boards/{id}',
  });
};

/**
 * Create board membership
 * 'POST /api/boards/:boardId/memberships': 'board-memberships/create'
 * @param options
 */
export const createBoardMembership = <ThrowOnError extends boolean = false>(
  options: Options<CreateBoardMembershipRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).post<CreateBoardMembershipResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/boards/{boardId}/memberships',
  });
};

/**
 * Update board membership
 * 'PATCH /api/board-memberships/:id': 'board-memberships/update'
 * @param options
 */
export const updateBoardMembership = <ThrowOnError extends boolean = false>(
  options: Options<UpdateBoardMembershipRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).patch<UpdateBoardMembershipResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/board-memberships/{id}',
  });
};

/**
 * Delete board membership
 * 'DELETE /api/board-memberships/:id': 'board-memberships/delete'
 * @param options
 */
export const deleteBoardMembership = <ThrowOnError extends boolean = false>(
  options: Options<DeleteBoardMembershipRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).delete<DeleteBoardMembershipResponse, HttpError, ThrowOnError>(
    {
      ...options,
      url: '/api/board-memberships/{id}',
    },
  );
};

/**
 * Create label
 * 'POST /api/boards/:boardId/labels': 'labels/create'
 * @param options
 */
export const createLabel = <ThrowOnError extends boolean = false>(
  options: Options<CreateLabelRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).post<CreateLabelResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/boards/{boardId}/labels',
  });
};

/**
 * Update label
 * 'PATCH /api/labels/:id': 'labels/update'
 * @param options
 */
export const updateLabel = <ThrowOnError extends boolean = false>(
  options: Options<UpdateLabelRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).patch<UpdateLabelResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/labels/{id}',
  });
};

/**
 * Delete label
 * 'DELETE /api/labels/:id': 'labels/delete'
 * @param options
 */
export const deleteLabel = <ThrowOnError extends boolean = false>(
  options: Options<DeleteLabelRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).delete<DeleteLabelResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/labels/{id}',
  });
};

/**
 * Create list
 * 'POST /api/boards/:boardId/lists': 'lists/create'
 * @param options
 */
export const createList = <ThrowOnError extends boolean = false>(
  options: Options<CreateListRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).post<CreateListResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/boards/{boardId}/lists',
  });
};

/**
 * Update list
 * 'PATCH /api/lists/:id': 'lists/update'
 * @param options
 */
export const updateList = <ThrowOnError extends boolean = false>(
  options: Options<UpdateListRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).patch<UpdateListResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/lists/{id}',
  });
};

/**
 * Sort list
 * 'POST /api/lists/:id/sort': 'lists/sort'
 * @param options
 */
export const sortList = <ThrowOnError extends boolean = false>(
  options: Options<SortListRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).post<SortListResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/lists/{id}/sort',
  });
};

/**
 * Delete list
 * 'DELETE /api/lists/:id': 'lists/delete'
 * @param options
 */
export const deleteList = <ThrowOnError extends boolean = false>(
  options: Options<DeleteListRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).delete<DeleteListResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/lists/{id}',
  });
};

/**
 * Create card
 * 'POST /api/lists/:listId/cards': 'cards/create'
 * @param options
 */
export const createCard = <ThrowOnError extends boolean = false>(
  options: Options<CreateCardRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).post<CreateCardResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/lists/{listId}/cards',
  });
};

/**
 * Get card
 * 'GET /api/cards/:id': 'cards/show'
 * @param options
 */
export const getCard = <ThrowOnError extends boolean = false>(
  options: Options<GetCardRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).get<GetCardResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/cards/{id}',
  });
};

/**
 * Update card
 * 'PATCH /api/cards/:id': 'cards/update'
 * @param options
 */
export const updateCard = <ThrowOnError extends boolean = false>(
  options: Options<UpdateCardRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).patch<UpdateCardResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/cards/{id}',
  });
};

/**
 * Duplicate card
 * 'POST /api/cards/:id/duplicate': 'cards/duplicate'
 * @param options
 */
export const duplicateCard = <ThrowOnError extends boolean = false>(
  options: Options<DuplicateCardRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).post<DuplicateCardResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/cards/{id}/duplicate',
  });
};

/**
 * Delete card
 * 'DELETE /api/cards/:id': 'cards/delete'
 * @param options
 */
export const deleteCard = <ThrowOnError extends boolean = false>(
  options: Options<DeleteCardRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).delete<DeleteCardResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/cards/{id}',
  });
};

/**
 * Create card membership
 * 'POST /api/cards/:cardId/memberships': 'card-memberships/create'
 * @param options
 */
export const createCardMembership = <ThrowOnError extends boolean = false>(
  options: Options<CreateCardMembershipRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).post<CreateCardMembershipResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/cards/{cardId}/memberships',
  });
};

/**
 * Delete card membership
 * 'DELETE /api/cards/:cardId/memberships': 'card-memberships/delete'
 * @param options
 */
export const deleteCardMembership = <ThrowOnError extends boolean = false>(
  options: Options<DeleteCardMembershipRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).delete<DeleteCardMembershipResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/cards/{cardId}/memberships',
  });
};

/**
 * Create card label
 * 'POST /api/cards/:cardId/labels': 'card-labels/create'
 * @param options
 */
export const createCardLabel = <ThrowOnError extends boolean = false>(
  options: Options<CreateCardLabelRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).post<CreateCardLabelResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/cards/{cardId}/labels',
  });
};

/**
 * Delete card label
 * 'DELETE /api/cards/:cardId/labels/:labelId': 'card-labels/delete'
 * @param options
 */
export const deleteCardLabel = <ThrowOnError extends boolean = false>(
  options: Options<DeleteCardLabelRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).delete<DeleteCardLabelResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/cards/{cardId}/labels/{labelId}',
  });
};

/**
 * Create task
 * 'POST /api/cards/:cardId/tasks': 'tasks/create'
 * @param options
 */
export const createTask = <ThrowOnError extends boolean = false>(
  options: Options<CreateTaskRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).post<CreateTaskResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/cards/{cardId}/tasks',
  });
};

/**
 * Update task
 * 'PATCH /api/tasks/:id': 'tasks/update'
 * @param options
 */
export const updateTask = <ThrowOnError extends boolean = false>(
  options: Options<UpdateTaskRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).patch<UpdateTaskResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/tasks/{id}',
  });
};

/**
 * Delete task
 * 'DELETE /api/tasks/:id': 'tasks/delete'
 * @param options
 */
export const deleteTask = <ThrowOnError extends boolean = false>(
  options: Options<DeleteTaskRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).delete<DeleteTaskResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/tasks/{id}',
  });
};

/**
 * Create attachment
 * 'POST /api/cards/:cardId/attachments': 'attachments/create'
 * @param options
 */
export const createAttachment = <ThrowOnError extends boolean = false>(
  options: Options<CreateAttachmentRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).post<CreateAttachmentResponse, HttpError, ThrowOnError>({
    ...formDataBodySerializer,
    ...options,
    headers: {
      'Content-Type': null,
    },
    url: '/api/cards/{cardId}/attachments',
  });
};

/**
 * Update attachment
 * 'PATCH /api/attachments/:id': 'attachments/update'
 * @param options
 */
export const updateAttachment = <ThrowOnError extends boolean = false>(
  options: Options<UpdateAttachmentRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).patch<UpdateAttachmentResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/attachments/{id}',
  });
};

/**
 * Delete attachment
 * 'DELETE /api/attachments/:id': 'attachments/delete'
 * @param options
 */
export const deleteAttachment = <ThrowOnError extends boolean = false>(
  options: Options<DeleteAttachmentRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).delete<DeleteAttachmentResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/attachments/{id}',
  });
};

/**
 * Get attachment
 * 'GET /attachments/:id/download/:filename'
 * Note: this endpoint requires access token to be passed as a cookie, not as bearer token
 * @param options
 */
export const getAttachment = <ThrowOnError extends boolean = false>(
  options: Options<GetAttachmentRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).get<GetAttachmentResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/attachments/{id}/download/{filename}',
  });
};

/**
 * Get attachment thumbnail
 * 'GET /attachments/:id/download/thumbnails/cover-256.:extension'
 * Note: this endpoint requires access token to be passed as a cookie, not as bearer token
 * @param options
 */
export const getAttachmentThumbnail = <ThrowOnError extends boolean = false>(
  options: Options<GetAttachmentThumbnailRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).get<GetAttachmentThumbnailResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/attachments/{id}/download/thumbnails/cover-256.{extension}',
  });
};

/**
 * Get card actions
 * 'GET /api/cards/:cardId/actions': 'actions/index'
 * @param options
 */
export const getCardActions = <ThrowOnError extends boolean = false>(
  options: Options<GetCardActionsRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).get<GetCardActionsResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/cards/{cardId}/actions',
  });
};

/**
 * Create comment action
 * 'POST /api/cards/:cardId/comment-actions': 'comment-actions/create'
 * @param options
 */
export const createCommentAction = <ThrowOnError extends boolean = false>(
  options: Options<CreateCommentActionRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).post<CreateCommentActionResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/cards/{cardId}/comment-actions',
  });
};

/**
 * Update comment action
 * 'PATCH /api/comment-actions/:id': 'comment-actions/update'
 * @param options
 */
export const updateCommentAction = <ThrowOnError extends boolean = false>(
  options: Options<UpdateCommentActionRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).patch<UpdateCommentActionResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/comment-actions/{id}',
  });
};

/**
 * Delete comment action
 * 'DELETE /api/comment-actions/:id': 'comment-actions/delete'
 * @param options
 */
export const deleteCommentAction = <ThrowOnError extends boolean = false>(
  options: Options<DeleteCommentActionRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).delete<DeleteCommentActionResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/comment-actions/{id}',
  });
};

/**
 * Get notifications
 * 'GET /api/notifications': 'notifications/index'
 * @param options
 */
export const getNotifications = <ThrowOnError extends boolean = false>(
  options: Options<unknown, ThrowOnError>,
) => {
  return (options?.client ?? client).get<GetNotificationsResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/notifications',
  });
};

/**
 * Get notification
 * 'GET /api/notifications/:id': 'notifications/show'
 * @param options
 */
export const getNotification = <ThrowOnError extends boolean = false>(
  options: Options<GetNotificationRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).get<GetNotificationResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/notifications/{id}',
  });
};

/**
 * Update notifications
 * 'PATCH /api/notifications/:ids': 'notifications/update'
 * @param options
 */
export const updateNotifications = <ThrowOnError extends boolean = false>(
  options: Options<UpdateNotificationsRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).patch<UpdateNotificationsResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/notifications/{ids}',
  });
};
