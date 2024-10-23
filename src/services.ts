import {
  createClient,
  createConfig,
  formDataBodySerializer,
  type Options,
} from '@hey-api/client-fetch';
import {
  AuthorizeError,
  AuthorizeOidcError,
  AuthorizeOidcRequest,
  AuthorizeOidcResponse,
  AuthorizeRequest,
  AuthorizeResponse,
  CreateAttachmentError,
  CreateAttachmentRequest,
  CreateAttachmentResponse,
  CreateBoardError,
  CreateBoardMembershipError,
  CreateBoardMembershipRequest,
  CreateBoardMembershipResponse,
  CreateBoardRequest,
  CreateBoardResponse,
  CreateCardError,
  CreateCardLabelError,
  CreateCardLabelRequest,
  CreateCardLabelResponse,
  CreateCardMembershipError,
  CreateCardMembershipRequest,
  CreateCardMembershipResponse,
  CreateCardRequest,
  CreateCardResponse,
  CreateCommentActionError,
  CreateCommentActionRequest,
  CreateCommentActionResponse,
  CreateLabelError,
  CreateLabelRequest,
  CreateLabelResponse,
  CreateListError,
  CreateListRequest,
  CreateListResponse,
  CreateProjectError,
  CreateProjectManagerError,
  CreateProjectManagerRequest,
  CreateProjectManagerResponse,
  CreateProjectRequest,
  CreateProjectResponse,
  CreateTaskError,
  CreateTaskRequest,
  CreateTaskResponse,
  CreateUserError,
  CreateUserRequest,
  CreateUserResponse,
  DeleteAttachmentError,
  DeleteAttachmentRequest,
  DeleteAttachmentResponse,
  DeleteBoardError,
  DeleteBoardMembershipError,
  DeleteBoardMembershipRequest,
  DeleteBoardMembershipResponse,
  DeleteBoardRequest,
  DeleteBoardResponse,
  DeleteCardError,
  DeleteCardLabelError,
  DeleteCardLabelRequest,
  DeleteCardLabelResponse,
  DeleteCardMembershipError,
  DeleteCardMembershipRequest,
  DeleteCardMembershipResponse,
  DeleteCardRequest,
  DeleteCardResponse,
  DeleteCommentActionError,
  DeleteCommentActionRequest,
  DeleteCommentActionResponse,
  DeleteLabelError,
  DeleteLabelRequest,
  DeleteLabelResponse,
  DeleteListError,
  DeleteListRequest,
  DeleteListResponse,
  DeleteProjectError,
  DeleteProjectManagerError,
  DeleteProjectManagerRequest,
  DeleteProjectManagerResponse,
  DeleteProjectRequest,
  DeleteProjectResponse,
  DeleteTaskError,
  DeleteTaskRequest,
  DeleteTaskResponse,
  DeleteUserError,
  DeleteUserRequest,
  DeleteUserResponse,
  DuplicateCardError,
  DuplicateCardRequest,
  DuplicateCardResponse,
  GetBoardError,
  GetBoardRequest,
  GetBoardResponse,
  GetCardActionsError,
  GetCardActionsRequest,
  GetCardActionsResponse,
  GetCardError,
  GetCardRequest,
  GetCardResponse,
  GetConfigError,
  GetConfigResponse,
  GetNotificationError,
  GetNotificationRequest,
  GetNotificationResponse,
  GetNotificationsError,
  GetNotificationsResponse,
  GetProjectError,
  GetProjectRequest,
  GetProjectResponse,
  GetProjectsError,
  GetProjectsResponse,
  GetUserError,
  GetUserRequest,
  GetUserResponse,
  GetUsersError,
  GetUsersResponse,
  SortListError,
  SortListRequest,
  SortListResponse,
  UnauthorizeError,
  UnauthorizeResponse,
  UpdateAttachmentError,
  UpdateAttachmentRequest,
  UpdateAttachmentResponse,
  UpdateBoardError,
  UpdateBoardMembershipError,
  UpdateBoardMembershipRequest,
  UpdateBoardMembershipResponse,
  UpdateBoardRequest,
  UpdateBoardResponse,
  UpdateCardError,
  UpdateCardRequest,
  UpdateCardResponse,
  UpdateCommentActionError,
  UpdateCommentActionRequest,
  UpdateCommentActionResponse,
  UpdateLabelError,
  UpdateLabelRequest,
  UpdateLabelResponse,
  UpdateListError,
  UpdateListRequest,
  UpdateListResponse,
  UpdateNotificationsError,
  UpdateNotificationsRequest,
  UpdateNotificationsResponse,
  UpdateProjectBackgroundImageError,
  UpdateProjectBackgroundImageRequest,
  UpdateProjectBackgroundImageResponse,
  UpdateProjectError,
  UpdateProjectRequest,
  UpdateProjectResponse,
  UpdateTaskError,
  UpdateTaskRequest,
  UpdateTaskResponse,
  UpdateUserAvatarError,
  UpdateUserAvatarRequest,
  UpdateUserAvatarResponse,
  UpdateUserEmailError,
  UpdateUserEmailRequest,
  UpdateUserEmailResponse,
  UpdateUserError,
  UpdateUserPasswordError,
  UpdateUserPasswordRequest,
  UpdateUserPasswordResponse,
  UpdateUserRequest,
  UpdateUserResponse,
  UpdateUserUsernameError,
  UpdateUserUsernameRequest,
  UpdateUserUsernameResponse,
} from './types';

export const client = createClient(createConfig());

// 'GET /api/config': 'show-config'
export const getConfig = <ThrowOnError extends boolean = false>(
  options: Options<unknown, ThrowOnError>,
) => {
  return (options?.client ?? client).get<GetConfigResponse, GetConfigError, ThrowOnError>({
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
export const authorizeOidc = <ThrowOnError extends boolean = false>(
  options: Options<AuthorizeOidcRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).post<AuthorizeOidcResponse, AuthorizeOidcError, ThrowOnError>({
    ...options,
    url: '/api/access-tokens/exchange-using-oidc',
  });
};

// 'DELETE /api/access-tokens/me': 'access-tokens/delete'
export const unauthorize = <ThrowOnError extends boolean = false>(
  options: Options<unknown, ThrowOnError>,
) => {
  return (options?.client ?? client).delete<UnauthorizeResponse, UnauthorizeError, ThrowOnError>({
    ...options,
    url: '/api/access-tokens/me',
  });
};

// 'GET /api/users': 'users/index'
export const getUsers = <ThrowOnError extends boolean = false>(
  options: Options<unknown, ThrowOnError>,
) => {
  return (options?.client ?? client).get<GetUsersResponse, GetUsersError, ThrowOnError>({
    ...options,
    url: '/api/users',
  });
};

// 'POST /api/users': 'users/create'
export const createUser = <ThrowOnError extends boolean = false>(
  options: Options<CreateUserRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).post<CreateUserResponse, CreateUserError, ThrowOnError>({
    ...options,
    url: '/api/users',
  });
};

// 'GET /api/users/:id': 'users/show'
export const getUser = <ThrowOnError extends boolean = false>(
  options: Options<GetUserRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).get<GetUserResponse, GetUserError, ThrowOnError>({
    ...options,
    url: '/api/users/{id}',
  });
};

// 'PATCH /api/users/:id': 'users/update'
export const updateUser = <ThrowOnError extends boolean = false>(
  options: Options<UpdateUserRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).patch<UpdateUserResponse, UpdateUserError, ThrowOnError>({
    ...options,
    url: '/api/users/{id}',
  });
};

// 'PATCH /api/users/:id/email': 'users/update-email'
export const updateUserEmail = <ThrowOnError extends boolean = false>(
  options: Options<UpdateUserEmailRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).patch<
    UpdateUserEmailResponse,
    UpdateUserEmailError,
    ThrowOnError
  >({
    ...options,
    url: '/api/users/{id}/email',
  });
};

// 'PATCH /api/users/:id/password': 'users/update-password'
export const updateUserPassword = <ThrowOnError extends boolean = false>(
  options: Options<UpdateUserPasswordRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).patch<
    UpdateUserPasswordResponse,
    UpdateUserPasswordError,
    ThrowOnError
  >({
    ...options,
    url: '/api/users/{id}/password',
  });
};

// 'PATCH /api/users/:id/username': 'users/update-username'
export const updateUserUsername = <ThrowOnError extends boolean = false>(
  options: Options<UpdateUserUsernameRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).patch<
    UpdateUserUsernameResponse,
    UpdateUserUsernameError,
    ThrowOnError
  >({
    ...options,
    url: '/api/users/{id}/username',
  });
};

// 'POST /api/users/:id/avatar': 'users/update-avatar'
export const updateUserAvatar = <ThrowOnError extends boolean = false>(
  options: Options<UpdateUserAvatarRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).post<
    UpdateUserAvatarResponse,
    UpdateUserAvatarError,
    ThrowOnError
  >({
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
  return (options?.client ?? client).delete<DeleteUserResponse, DeleteUserError, ThrowOnError>({
    ...options,
    url: '/api/users/{id}',
  });
};

// 'GET /api/projects': 'projects/index'
export const getProjects = <ThrowOnError extends boolean = false>(
  options: Options<unknown, ThrowOnError>,
) => {
  return (options?.client ?? client).get<GetProjectsResponse, GetProjectsError, ThrowOnError>({
    ...options,
    url: '/api/projects',
  });
};

// 'POST /api/projects': 'projects/create'
export const createProject = <ThrowOnError extends boolean = false>(
  options: Options<CreateProjectRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).post<CreateProjectResponse, CreateProjectError, ThrowOnError>({
    ...options,
    url: '/api/projects',
  });
};

// 'GET /api/projects/:id': 'projects/show'
export const getProject = <ThrowOnError extends boolean = false>(
  options: Options<GetProjectRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).get<GetProjectResponse, GetProjectError, ThrowOnError>({
    ...options,
    url: '/api/projects/{id}',
  });
};

// 'PATCH /api/projects/:id': 'projects/update'
export const updateProject = <ThrowOnError extends boolean = false>(
  options: Options<UpdateProjectRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).patch<UpdateProjectResponse, UpdateProjectError, ThrowOnError>(
    {
      ...options,
      url: '/api/projects/{id}',
    },
  );
};

// 'POST /api/projects/:id/background-image': 'projects/update-background-image'
export const updateProjectBackgroundImage = <ThrowOnError extends boolean = false>(
  options: Options<UpdateProjectBackgroundImageRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).post<
    UpdateProjectBackgroundImageResponse,
    UpdateProjectBackgroundImageError,
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
  return (options?.client ?? client).delete<
    DeleteProjectResponse,
    DeleteProjectError,
    ThrowOnError
  >({
    ...options,
    url: '/api/projects/{id}',
  });
};

// 'POST /api/projects/:projectId/managers': 'project-managers/create'
export const createProjectManager = <ThrowOnError extends boolean = false>(
  options: Options<CreateProjectManagerRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).post<
    CreateProjectManagerResponse,
    CreateProjectManagerError,
    ThrowOnError
  >({
    ...options,
    url: '/api/projects/{projectId}/managers',
  });
};

// 'DELETE /api/project-managers/:id': 'project-managers/delete'
export const deleteProjectManager = <ThrowOnError extends boolean = false>(
  options: Options<DeleteProjectManagerRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).delete<
    DeleteProjectManagerResponse,
    DeleteProjectManagerError,
    ThrowOnError
  >({
    ...options,
    url: '/api/project-managers/{id}',
  });
};

// 'POST /api/projects/:projectId/boards': 'boards/create'
export const createBoard = <ThrowOnError extends boolean = false>(
  options: Options<CreateBoardRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).post<CreateBoardResponse, CreateBoardError, ThrowOnError>({
    ...options,
    url: '/api/projects/{projectId}/boards',
  });
};

// 'GET /api/boards/:id': 'boards/show'
export const getBoard = <ThrowOnError extends boolean = false>(
  options: Options<GetBoardRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).get<GetBoardResponse, GetBoardError, ThrowOnError>({
    ...options,
    url: '/api/boards/{id}',
  });
};

// 'PATCH /api/boards/:id': 'boards/update'
export const updateBoard = <ThrowOnError extends boolean = false>(
  options: Options<UpdateBoardRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).patch<UpdateBoardResponse, UpdateBoardError, ThrowOnError>({
    ...options,
    url: '/api/boards/{id}',
  });
};

// 'DELETE /api/boards/:id': 'boards/delete'
export const deleteBoard = <ThrowOnError extends boolean = false>(
  options: Options<DeleteBoardRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).delete<DeleteBoardResponse, DeleteBoardError, ThrowOnError>({
    ...options,
    url: '/api/boards/{id}',
  });
};

// 'POST /api/boards/:boardId/memberships': 'board-memberships/create'
export const createBoardMembership = <ThrowOnError extends boolean = false>(
  options: Options<CreateBoardMembershipRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).post<
    CreateBoardMembershipResponse,
    CreateBoardMembershipError,
    ThrowOnError
  >({
    ...options,
    url: '/api/boards/{boardId}/memberships',
  });
};

// 'PATCH /api/board-memberships/:id': 'board-memberships/update'
export const updateBoardMembership = <ThrowOnError extends boolean = false>(
  options: Options<UpdateBoardMembershipRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).patch<
    UpdateBoardMembershipResponse,
    UpdateBoardMembershipError,
    ThrowOnError
  >({
    ...options,
    url: '/api/board-memberships/{id}',
  });
};

// 'DELETE /api/board-memberships/:id': 'board-memberships/delete'
export const deleteBoardMembership = <ThrowOnError extends boolean = false>(
  options: Options<DeleteBoardMembershipRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).delete<
    DeleteBoardMembershipResponse,
    DeleteBoardMembershipError,
    ThrowOnError
  >({
    ...options,
    url: '/api/board-memberships/{id}',
  });
};

// 'POST /api/boards/:boardId/labels': 'labels/create'
export const createLabel = <ThrowOnError extends boolean = false>(
  options: Options<CreateLabelRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).post<CreateLabelResponse, CreateLabelError, ThrowOnError>({
    ...options,
    url: '/api/boards/{boardId}/labels',
  });
};

// 'PATCH /api/labels/:id': 'labels/update'
export const updateLabel = <ThrowOnError extends boolean = false>(
  options: Options<UpdateLabelRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).patch<UpdateLabelResponse, UpdateLabelError, ThrowOnError>({
    ...options,
    url: '/api/labels/{id}',
  });
};

// 'DELETE /api/labels/:id': 'labels/delete'
export const deleteLabel = <ThrowOnError extends boolean = false>(
  options: Options<DeleteLabelRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).delete<DeleteLabelResponse, DeleteLabelError, ThrowOnError>({
    ...options,
    url: '/api/labels/{id}',
  });
};

// 'POST /api/boards/:boardId/lists': 'lists/create'
export const createList = <ThrowOnError extends boolean = false>(
  options: Options<CreateListRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).post<CreateListResponse, CreateListError, ThrowOnError>({
    ...options,
    url: '/api/boards/{boardId}/lists',
  });
};

// 'PATCH /api/lists/:id': 'lists/update'
export const updateList = <ThrowOnError extends boolean = false>(
  options: Options<UpdateListRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).patch<UpdateListResponse, UpdateListError, ThrowOnError>({
    ...options,
    url: '/api/lists/{id}',
  });
};

// 'POST /api/lists/:id/sort': 'lists/sort'
export const sortList = <ThrowOnError extends boolean = false>(
  options: Options<SortListRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).post<SortListResponse, SortListError, ThrowOnError>({
    ...options,
    url: '/api/lists/{id}/sort',
  });
};

// 'DELETE /api/lists/:id': 'lists/delete'
export const deleteList = <ThrowOnError extends boolean = false>(
  options: Options<DeleteListRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).delete<DeleteListResponse, DeleteListError, ThrowOnError>({
    ...options,
    url: '/api/lists/{id}',
  });
};

// 'POST /api/lists/:listId/cards': 'cards/create'
export const createCard = <ThrowOnError extends boolean = false>(
  options: Options<CreateCardRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).post<CreateCardResponse, CreateCardError, ThrowOnError>({
    ...options,
    url: '/api/lists/{listId}/cards',
  });
};

// 'GET /api/cards/:id': 'cards/show'
export const getCard = <ThrowOnError extends boolean = false>(
  options: Options<GetCardRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).get<GetCardResponse, GetCardError, ThrowOnError>({
    ...options,
    url: '/api/cards/{id}',
  });
};

// 'PATCH /api/cards/:id': 'cards/update'
export const updateCard = <ThrowOnError extends boolean = false>(
  options: Options<UpdateCardRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).patch<UpdateCardResponse, UpdateCardError, ThrowOnError>({
    ...options,
    url: '/api/cards/{id}',
  });
};

// 'POST /api/cards/:id/duplicate': 'cards/duplicate'
export const duplicateCard = <ThrowOnError extends boolean = false>(
  options: Options<DuplicateCardRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).post<DuplicateCardResponse, DuplicateCardError, ThrowOnError>({
    ...options,
    url: '/api/cards/{id}/duplicate',
  });
};

// 'DELETE /api/cards/:id': 'cards/delete'
export const deleteCard = <ThrowOnError extends boolean = false>(
  options: Options<DeleteCardRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).delete<DeleteCardResponse, DeleteCardError, ThrowOnError>({
    ...options,
    url: '/api/cards/{id}',
  });
};

// 'POST /api/cards/:cardId/memberships': 'card-memberships/create'
export const createCardMembership = <ThrowOnError extends boolean = false>(
  options: Options<CreateCardMembershipRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).post<
    CreateCardMembershipResponse,
    CreateCardMembershipError,
    ThrowOnError
  >({
    ...options,
    url: '/api/cards/{cardId}/memberships',
  });
};

// 'DELETE /api/cards/:cardId/memberships': 'card-memberships/delete'
export const deleteCardMembership = <ThrowOnError extends boolean = false>(
  options: Options<DeleteCardMembershipRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).delete<
    DeleteCardMembershipResponse,
    DeleteCardMembershipError,
    ThrowOnError
  >({
    ...options,
    url: '/api/cards/{cardId}/memberships',
  });
};

// 'POST /api/cards/:cardId/labels': 'card-labels/create'
export const createCardLabel = <ThrowOnError extends boolean = false>(
  options: Options<CreateCardLabelRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).post<
    CreateCardLabelResponse,
    CreateCardLabelError,
    ThrowOnError
  >({
    ...options,
    url: '/api/cards/{cardId}/labels',
  });
};

// 'DELETE /api/cards/:cardId/labels/:labelId': 'card-labels/delete'
export const deleteCardLabel = <ThrowOnError extends boolean = false>(
  options: Options<DeleteCardLabelRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).delete<
    DeleteCardLabelResponse,
    DeleteCardLabelError,
    ThrowOnError
  >({
    ...options,
    url: '/api/cards/{cardId}/labels/{labelId}',
  });
};

// 'POST /api/cards/:cardId/tasks': 'tasks/create'
export const createTask = <ThrowOnError extends boolean = false>(
  options: Options<CreateTaskRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).post<CreateTaskResponse, CreateTaskError, ThrowOnError>({
    ...options,
    url: '/api/cards/{cardId}/tasks',
  });
};

// 'PATCH /api/tasks/:id': 'tasks/update'
export const updateTask = <ThrowOnError extends boolean = false>(
  options: Options<UpdateTaskRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).patch<UpdateTaskResponse, UpdateTaskError, ThrowOnError>({
    ...options,
    url: '/api/tasks/{id}',
  });
};

// 'DELETE /api/tasks/:id': 'tasks/delete'
export const deleteTask = <ThrowOnError extends boolean = false>(
  options: Options<DeleteTaskRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).delete<DeleteTaskResponse, DeleteTaskError, ThrowOnError>({
    ...options,
    url: '/api/tasks/{id}',
  });
};

// 'POST /api/cards/:cardId/attachments': 'attachments/create'
// TODO check if correct
export const createAttachment = <ThrowOnError extends boolean = false>(
  options: Options<CreateAttachmentRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).post<
    CreateAttachmentResponse,
    CreateAttachmentError,
    ThrowOnError
  >({
    ...options,
    url: '/api/cards/{cardId}/attachments',
  });
};

// 'PATCH /api/attachments/:id': 'attachments/update'
// TODO check if correct
export const updateAttachment = <ThrowOnError extends boolean = false>(
  options: Options<UpdateAttachmentRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).patch<
    UpdateAttachmentResponse,
    UpdateAttachmentError,
    ThrowOnError
  >({
    ...options,
    url: '/api/attachments/{id}',
  });
};

// 'DELETE /api/attachments/:id': 'attachments/delete'
// TODO check if correct
export const deleteAttachment = <ThrowOnError extends boolean = false>(
  options: Options<DeleteAttachmentRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).delete<
    DeleteAttachmentResponse,
    DeleteAttachmentError,
    ThrowOnError
  >({
    ...options,
    url: '/api/attachments/{id}',
  });
};

// 'GET /api/cards/:cardId/actions': 'actions/index'
export const getCardActions = <ThrowOnError extends boolean = false>(
  options: Options<GetCardActionsRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).get<GetCardActionsResponse, GetCardActionsError, ThrowOnError>(
    {
      ...options,
      url: '/api/cards/{cardId}/actions',
    },
  );
};

// 'POST /api/cards/:cardId/comment-actions': 'comment-actions/create'
export const createCommentAction = <ThrowOnError extends boolean = false>(
  options: Options<CreateCommentActionRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).post<
    CreateCommentActionResponse,
    CreateCommentActionError,
    ThrowOnError
  >({
    ...options,
    url: '/api/cards/{cardId}/comment-actions',
  });
};

// 'PATCH /api/comment-actions/:id': 'comment-actions/update'
export const updateCommentAction = <ThrowOnError extends boolean = false>(
  options: Options<UpdateCommentActionRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).patch<
    UpdateCommentActionResponse,
    UpdateCommentActionError,
    ThrowOnError
  >({
    ...options,
    url: '/api/comment-actions/{id}',
  });
};

// 'DELETE /api/comment-actions/:id': 'comment-actions/delete'
export const deleteCommentAction = <ThrowOnError extends boolean = false>(
  options: Options<DeleteCommentActionRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).delete<
    DeleteCommentActionResponse,
    DeleteCommentActionError,
    ThrowOnError
  >({
    ...options,
    url: '/api/comment-actions/{id}',
  });
};

// 'GET /api/notifications': 'notifications/index'
export const getNotifications = <ThrowOnError extends boolean = false>(
  options: Options<unknown, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    GetNotificationsResponse,
    GetNotificationsError,
    ThrowOnError
  >({
    ...options,
    url: '/api/notifications',
  });
};

// 'GET /api/notifications/:id': 'notifications/show'
// TODO check this:
// - admin: make sure to be subscribed to some card
// - login as global user, comment on card
// - admin: log back in and check if notification is there
export const getNotification = <ThrowOnError extends boolean = false>(
  options: Options<GetNotificationRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    GetNotificationResponse,
    GetNotificationError,
    ThrowOnError
  >({
    ...options,
    url: '/api/notifications/{id}',
  });
};

// 'PATCH /api/notifications/:ids': 'notifications/update'
// TODO can only be checked if previous function is working
export const updateNotifications = <ThrowOnError extends boolean = false>(
  options: Options<UpdateNotificationsRequest, ThrowOnError>,
) => {
  return (options?.client ?? client).patch<
    UpdateNotificationsResponse,
    UpdateNotificationsError,
    ThrowOnError
  >({
    ...options,
    url: '/api/notifications/{ids}',
  });
};
