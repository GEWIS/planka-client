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

// 'GET /api/config': 'show-config'
export const getConfig = <ThrowOnError extends boolean = false>(
  options: Options<unknown, ThrowOnError>,
) => {
  return (options?.client ?? client).get<GetConfigResponse, unknown, ThrowOnError>({
    ...options,
    url: '/api/config',
  });
};

// 'POST /api/access-tokens': 'access-tokens/create'
export const authorize = <ThrowOnError extends boolean = false>(
  options: Options<AuthorizeRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).post<AuthorizeResponse, AuthorizeError, ThrowOnError>({
    ...options,
    url: '/api/access-tokens',
  });
};

// 'POST /api/access-tokens/exchange-using-oidc': 'access-tokens/exchange-using-oidc'
// TODO -- this function needs to be tested
export const authorizeOidc = <ThrowOnError extends boolean = false>(
  options: Options<AuthorizeOidcRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).post<AuthorizeOidcResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/access-tokens/exchange-using-oidc',
  });
};

// 'DELETE /api/access-tokens/me': 'access-tokens/delete'
export const unauthorize = <ThrowOnError extends boolean = false>(
  options: Options<unknown, ThrowOnError>,
) => {
  return (options?.client ?? client).delete<UnauthorizeResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/access-tokens/me',
  });
};

// 'GET /api/users': 'users/index'
export const getUsers = <ThrowOnError extends boolean = false>(
  options: Options<unknown, ThrowOnError>,
) => {
  return (options?.client ?? client).get<GetUsersResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/users',
  });
};

// 'POST /api/users': 'users/create'
export const createUser = <ThrowOnError extends boolean = false>(
  options: Options<CreateUserRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).post<CreateUserResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/users',
  });
};

// 'GET /api/users/:id': 'users/show'
export const getUser = <ThrowOnError extends boolean = false>(
  options: Options<GetUserRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).get<GetUserResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/users/{id}',
  });
};

// 'PATCH /api/users/:id': 'users/update'
export const updateUser = <ThrowOnError extends boolean = false>(
  options: Options<UpdateUserRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).patch<UpdateUserResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/users/{id}',
  });
};

// 'PATCH /api/users/:id/email': 'users/update-email'
export const updateUserEmail = <ThrowOnError extends boolean = false>(
  options: Options<UpdateUserEmailRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).patch<UpdateUserEmailResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/users/{id}/email',
  });
};

// 'PATCH /api/users/:id/password': 'users/update-password'
export const updateUserPassword = <ThrowOnError extends boolean = false>(
  options: Options<UpdateUserPasswordRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).patch<UpdateUserPasswordResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/users/{id}/password',
  });
};

// 'PATCH /api/users/:id/username': 'users/update-username'
export const updateUserUsername = <ThrowOnError extends boolean = false>(
  options: Options<UpdateUserUsernameRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).patch<UpdateUserUsernameResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/users/{id}/username',
  });
};

// 'POST /api/users/:id/avatar': 'users/update-avatar'
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

// 'DELETE /api/users/:id': 'users/delete'
export const deleteUser = <ThrowOnError extends boolean = false>(
  options: Options<DeleteUserRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).delete<DeleteUserResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/users/{id}',
  });
};

// 'GET /api/projects': 'projects/index'
export const getProjects = <ThrowOnError extends boolean = false>(
  options: Options<unknown, ThrowOnError>,
) => {
  return (options?.client ?? client).get<GetProjectsResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/projects',
  });
};

// 'POST /api/projects': 'projects/create'
export const createProject = <ThrowOnError extends boolean = false>(
  options: Options<CreateProjectRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).post<CreateProjectResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/projects',
  });
};

// 'GET /api/projects/:id': 'projects/show'
export const getProject = <ThrowOnError extends boolean = false>(
  options: Options<GetProjectRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).get<GetProjectResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/projects/{id}',
  });
};

// 'PATCH /api/projects/:id': 'projects/update'
export const updateProject = <ThrowOnError extends boolean = false>(
  options: Options<UpdateProjectRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).patch<UpdateProjectResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/projects/{id}',
  });
};

// 'POST /api/projects/:id/background-image': 'projects/update-background-image'
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

// 'DELETE /api/projects/:id': 'projects/delete'
export const deleteProject = <ThrowOnError extends boolean = false>(
  options: Options<DeleteProjectRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).delete<DeleteProjectResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/projects/{id}',
  });
};

// 'POST /api/projects/:projectId/managers': 'project-managers/create'
export const createProjectManager = <ThrowOnError extends boolean = false>(
  options: Options<CreateProjectManagerRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).post<CreateProjectManagerResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/projects/{projectId}/managers',
  });
};

// 'DELETE /api/project-managers/:id': 'project-managers/delete'
export const deleteProjectManager = <ThrowOnError extends boolean = false>(
  options: Options<DeleteProjectManagerRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).delete<DeleteProjectManagerResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/project-managers/{id}',
  });
};

// 'POST /api/projects/:projectId/boards': 'boards/create'
export const createBoard = <ThrowOnError extends boolean = false>(
  options: Options<CreateBoardRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).post<CreateBoardResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/projects/{projectId}/boards',
  });
};

// 'GET /api/boards/:id': 'boards/show'
export const getBoard = <ThrowOnError extends boolean = false>(
  options: Options<GetBoardRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).get<GetBoardResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/boards/{id}',
  });
};

// 'PATCH /api/boards/:id': 'boards/update'
export const updateBoard = <ThrowOnError extends boolean = false>(
  options: Options<UpdateBoardRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).patch<UpdateBoardResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/boards/{id}',
  });
};

// 'DELETE /api/boards/:id': 'boards/delete'
export const deleteBoard = <ThrowOnError extends boolean = false>(
  options: Options<DeleteBoardRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).delete<DeleteBoardResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/boards/{id}',
  });
};

// 'POST /api/boards/:boardId/memberships': 'board-memberships/create'
export const createBoardMembership = <ThrowOnError extends boolean = false>(
  options: Options<CreateBoardMembershipRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).post<CreateBoardMembershipResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/boards/{boardId}/memberships',
  });
};

// 'PATCH /api/board-memberships/:id': 'board-memberships/update'
export const updateBoardMembership = <ThrowOnError extends boolean = false>(
  options: Options<UpdateBoardMembershipRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).patch<UpdateBoardMembershipResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/board-memberships/{id}',
  });
};

// 'DELETE /api/board-memberships/:id': 'board-memberships/delete'
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

// 'POST /api/boards/:boardId/labels': 'labels/create'
export const createLabel = <ThrowOnError extends boolean = false>(
  options: Options<CreateLabelRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).post<CreateLabelResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/boards/{boardId}/labels',
  });
};

// 'PATCH /api/labels/:id': 'labels/update'
export const updateLabel = <ThrowOnError extends boolean = false>(
  options: Options<UpdateLabelRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).patch<UpdateLabelResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/labels/{id}',
  });
};

// 'DELETE /api/labels/:id': 'labels/delete'
export const deleteLabel = <ThrowOnError extends boolean = false>(
  options: Options<DeleteLabelRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).delete<DeleteLabelResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/labels/{id}',
  });
};

// 'POST /api/boards/:boardId/lists': 'lists/create'
export const createList = <ThrowOnError extends boolean = false>(
  options: Options<CreateListRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).post<CreateListResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/boards/{boardId}/lists',
  });
};

// 'PATCH /api/lists/:id': 'lists/update'
export const updateList = <ThrowOnError extends boolean = false>(
  options: Options<UpdateListRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).patch<UpdateListResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/lists/{id}',
  });
};

// 'POST /api/lists/:id/sort': 'lists/sort'
export const sortList = <ThrowOnError extends boolean = false>(
  options: Options<SortListRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).post<SortListResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/lists/{id}/sort',
  });
};

// 'DELETE /api/lists/:id': 'lists/delete'
export const deleteList = <ThrowOnError extends boolean = false>(
  options: Options<DeleteListRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).delete<DeleteListResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/lists/{id}',
  });
};

// 'POST /api/lists/:listId/cards': 'cards/create'
export const createCard = <ThrowOnError extends boolean = false>(
  options: Options<CreateCardRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).post<CreateCardResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/lists/{listId}/cards',
  });
};

// 'GET /api/cards/:id': 'cards/show'
export const getCard = <ThrowOnError extends boolean = false>(
  options: Options<GetCardRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).get<GetCardResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/cards/{id}',
  });
};

// 'PATCH /api/cards/:id': 'cards/update'
export const updateCard = <ThrowOnError extends boolean = false>(
  options: Options<UpdateCardRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).patch<UpdateCardResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/cards/{id}',
  });
};

// 'POST /api/cards/:id/duplicate': 'cards/duplicate'
export const duplicateCard = <ThrowOnError extends boolean = false>(
  options: Options<DuplicateCardRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).post<DuplicateCardResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/cards/{id}/duplicate',
  });
};

// 'DELETE /api/cards/:id': 'cards/delete'
export const deleteCard = <ThrowOnError extends boolean = false>(
  options: Options<DeleteCardRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).delete<DeleteCardResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/cards/{id}',
  });
};

// 'POST /api/cards/:cardId/memberships': 'card-memberships/create'
export const createCardMembership = <ThrowOnError extends boolean = false>(
  options: Options<CreateCardMembershipRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).post<CreateCardMembershipResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/cards/{cardId}/memberships',
  });
};

// 'DELETE /api/cards/:cardId/memberships': 'card-memberships/delete'
export const deleteCardMembership = <ThrowOnError extends boolean = false>(
  options: Options<DeleteCardMembershipRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).delete<DeleteCardMembershipResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/cards/{cardId}/memberships',
  });
};

// 'POST /api/cards/:cardId/labels': 'card-labels/create'
export const createCardLabel = <ThrowOnError extends boolean = false>(
  options: Options<CreateCardLabelRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).post<CreateCardLabelResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/cards/{cardId}/labels',
  });
};

// 'DELETE /api/cards/:cardId/labels/:labelId': 'card-labels/delete'
export const deleteCardLabel = <ThrowOnError extends boolean = false>(
  options: Options<DeleteCardLabelRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).delete<DeleteCardLabelResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/cards/{cardId}/labels/{labelId}',
  });
};

// 'POST /api/cards/:cardId/tasks': 'tasks/create'
export const createTask = <ThrowOnError extends boolean = false>(
  options: Options<CreateTaskRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).post<CreateTaskResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/cards/{cardId}/tasks',
  });
};

// 'PATCH /api/tasks/:id': 'tasks/update'
export const updateTask = <ThrowOnError extends boolean = false>(
  options: Options<UpdateTaskRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).patch<UpdateTaskResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/tasks/{id}',
  });
};

// 'DELETE /api/tasks/:id': 'tasks/delete'
export const deleteTask = <ThrowOnError extends boolean = false>(
  options: Options<DeleteTaskRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).delete<DeleteTaskResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/tasks/{id}',
  });
};

// 'POST /api/cards/:cardId/attachments': 'attachments/create'
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

// 'PATCH /api/attachments/:id': 'attachments/update'
export const updateAttachment = <ThrowOnError extends boolean = false>(
  options: Options<UpdateAttachmentRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).patch<UpdateAttachmentResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/attachments/{id}',
  });
};

// 'DELETE /api/attachments/:id': 'attachments/delete'
export const deleteAttachment = <ThrowOnError extends boolean = false>(
  options: Options<DeleteAttachmentRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).delete<DeleteAttachmentResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/attachments/{id}',
  });
};

// 'GET /api/cards/:cardId/actions': 'actions/index'
export const getCardActions = <ThrowOnError extends boolean = false>(
  options: Options<GetCardActionsRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).get<GetCardActionsResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/cards/{cardId}/actions',
  });
};

// 'POST /api/cards/:cardId/comment-actions': 'comment-actions/create'
export const createCommentAction = <ThrowOnError extends boolean = false>(
  options: Options<CreateCommentActionRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).post<CreateCommentActionResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/cards/{cardId}/comment-actions',
  });
};

// 'PATCH /api/comment-actions/:id': 'comment-actions/update'
export const updateCommentAction = <ThrowOnError extends boolean = false>(
  options: Options<UpdateCommentActionRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).patch<UpdateCommentActionResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/comment-actions/{id}',
  });
};

// 'DELETE /api/comment-actions/:id': 'comment-actions/delete'
export const deleteCommentAction = <ThrowOnError extends boolean = false>(
  options: Options<DeleteCommentActionRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).delete<DeleteCommentActionResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/comment-actions/{id}',
  });
};

// 'GET /api/notifications': 'notifications/index'
export const getNotifications = <ThrowOnError extends boolean = false>(
  options: Options<unknown, ThrowOnError>,
) => {
  return (options?.client ?? client).get<GetNotificationsResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/notifications',
  });
};

// 'GET /api/notifications/:id': 'notifications/show'
export const getNotification = <ThrowOnError extends boolean = false>(
  options: Options<GetNotificationRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).get<GetNotificationResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/notifications/{id}',
  });
};

// 'PATCH /api/notifications/:ids': 'notifications/update'
export const updateNotifications = <ThrowOnError extends boolean = false>(
  options: Options<UpdateNotificationsRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).patch<UpdateNotificationsResponse, HttpError, ThrowOnError>({
    ...options,
    url: '/api/notifications/{ids}',
  });
};
