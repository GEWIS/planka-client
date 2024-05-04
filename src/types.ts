export type Oidc = {
  oidc: string
}

export type AccessTokenRequest = {
  emailOrUsername: string
  password: string
}

export type AccessTokenOidcRequest = {
  code: string
  nonce: string
}

export type UserCreate = {
  email: string
  password: string
  name: string
  username?: string
}

export type User = {
  id: string
  email?: string
  isAdmin: boolean
  name?: string
  username?: string
  phone?: string
  organization?: string
  language?: string
  subscribeToOwnCards: boolean
  createdAt: Date
  updatedAt?: Date
  deletedAt?: Date
}

export type SingleResponse<T> = {
  item: T
}

export type ArrayResponse<T> = {
  items: T[]
}

export type BadRequestError = {
  code: string
  problems: string[]
  message: string
}

export type UnauthorizedError = {
  code: string
  message: string
}

export type NotFoundError = {
  code: string
}

export type $OpenApiTs = {
  // 'GET /api/config': 'show-config'
  '/config': {
    get: {
      res: {
        200: SingleResponse<Oidc>
      }
    }
  }

  // 'POST /api/access-tokens': 'access-tokens/create'
  '/access-tokens': {
    post: {
      req: {
        requestBody: AccessTokenRequest
      }
      res: {
        200: SingleResponse<string>
        400: BadRequestError
      }
    }
  }

  // 'POST /api/access-tokens/exchange-using-oidc': 'access-tokens/exchange-using-oidc'
  '/access-tokens/exchange-using-oidc': {
    get: {
      req: {
        requestBody: AccessTokenOidcRequest
      }
      res: {
        200: SingleResponse<string>
        400: BadRequestError
        401: UnauthorizedError
      }
    }
  }

  // 'DELETE /api/access-tokens/me': 'access-tokens/delete'
  '/access-tokens/me': {
    res: {
      200: SingleResponse<string>
      401: UnauthorizedError
    }
  }

  // 'GET /api/users': 'users/index'
  // 'POST /api/users': 'users/create'
  '/users': {
    get: {
      res: {
        200: ArrayResponse<User>
        401: UnauthorizedError
      }
    }
    post: {
      req: {
        requestBody: UserCreate
      }
      res: {
        200: SingleResponse<User>
        400: BadRequestError
        401: UnauthorizedError
      }
    }
  }

  // 'GET /api/users/:id': 'users/show',
  // 'PATCH /api/users/:id': 'users/update',
  // 'DELETE /api/users/:id': 'users/delete',
  '/users/{userId}': {
    get: {
      req: {
        userId: string
      }
      res: {
        200: SingleResponse<User>
        401: UnauthorizedError
        404: NotFoundError
      }
    }
    patch: {
      req: {
        userId: string
        requestBody: User
      }
      res: {
        200: SingleResponse<User>
        400: BadRequestError
        401: UnauthorizedError
        404: NotFoundError
      }
    }
    delete: {
      req: {
        userId: string
        requestBody: User
      }
      res: {
        200: void
        401: UnauthorizedError
        404: NotFoundError
      }
    }
  }

  // 'PATCH /api/users/:id/email': 'users/update-email',
  '/users/{id}/email': {
    patch: {

    }
  }

  // 'PATCH /api/users/:id/password': 'users/update-password',
  '/users/{id}/password': {
    patch: {

    }
  }

  // 'PATCH /api/users/:id/username': 'users/update-username',
  '/users/{id}/username': {
    patch: {

    }
  }

  // 'POST /api/users/:id/avatar': 'users/update-avatar',
  '/users/{id}/avatar': {
    post: {

    }
  }

  // 'GET /api/projects': 'projects/index',
  // 'POST /api/projects': 'projects/create',
  '/projects': {
    get: {

    }
    post: {

    }
  }

  // 'GET /api/projects/:id': 'projects/show',
  // 'PATCH /api/projects/:id': 'projects/update',
  // 'DELETE /api/projects/:id': 'projects/delete',
  '/projects/{id}': {
    get: {

    }
    patch: {

    }
    delete: {

    }
  }

  // 'POST /api/projects/:id/background-image': 'projects/update-background-image',
  '/projects/{id}/background-image': {
    post: {

    }
  }

  // 'POST /api/projects/:projectId/managers': 'project-managers/create',
  '/projects/{id}/manager': {
    post: {

    }
  }

  // 'DELETE /api/project-managers/:id': 'project-managers/delete',
  '/project-managers/{id}': {
    delete: {

    }
  }

  // 'POST /api/projects/:projectId/boards': 'boards/create',
  '/projects/{id}/boards': {
    post: {

    }
  }

  // 'GET /api/boards/:id': 'boards/show',
  // 'PATCH /api/boards/:id': 'boards/update',
  // 'DELETE /api/boards/:id': 'boards/delete',
  '/boards/{id}': {
    get: {

    }
    patch: {

    }
    delete: {

    }
  }

  // 'POST /api/boards/:boardId/memberships': 'board-memberships/create',
  '/boards/{id}/memberships': {
    post: {

    }
  }

  // 'PATCH /api/board-memberships/:id': 'board-memberships/update',
  // 'DELETE /api/board-memberships/:id': 'board-memberships/delete',
  '/board-memberships/{id}': {
    update: {

    }
    delete: {

    }
  }

  // 'POST /api/boards/:boardId/labels': 'labels/create',
  '/boards/{id}/labels': {
    post: {

    }
  }

  // 'PATCH /api/labels/:id': 'labels/update',
  // 'DELETE /api/labels/:id': 'labels/delete',
  '/labels/{id}': {
    patch: {

    }
    delete: {

    }
  }

  // 'POST /api/boards/:boardId/lists': 'lists/create',
  '/boards/{id}/lists': {
    post: {

    }
  }

  // 'PATCH /api/lists/:id': 'lists/update',
  // 'DELETE /api/lists/:id': 'lists/delete',
  '/lists/{id}': {
    patch: {

    }
    delete: {

    }
  }

  // 'POST /api/lists/:id/sort': 'lists/sort',
  '/lists/{id}/sort': {
    post: {

    }
  }

  // 'POST /api/lists/:listId/cards': 'cards/create',
  '/lists/{id}/cards': {
    post: {

    }
  }

  // 'GET /api/cards/:id': 'cards/show',
  // 'PATCH /api/cards/:id': 'cards/update',
  // 'DELETE /api/cards/:id': 'cards/delete',
  '/cards/{id}': {
    get: {

    }
    patch: {

    }
    delete: {

    }
  }

  // 'POST /api/cards/:id/duplicate': 'cards/duplicate',
  '/cards/{id}/duplicate': {
    post: {

    }
  }

  // 'POST /api/cards/:cardId/memberships': 'card-memberships/create',
  // 'DELETE /api/cards/:cardId/memberships': 'card-memberships/delete',
  '/cards/{id}/memberships': {
    post: {

    }
    delete: {

    }
  }

  // 'POST /api/cards/:cardId/labels': 'card-labels/create',
  '/cards/{id}/labels': {
    post: {

    }
  }

  // 'DELETE /api/cards/:cardId/labels/:labelId': 'card-labels/delete',
  '/cards/{id}/labels/{labelId}': {
    delete: {

    }
  }

  // 'POST /api/cards/:cardId/tasks': 'tasks/create',
  '/cards/{id}/tasks': {
    post: {

    }
  }

  // 'PATCH /api/tasks/:id': 'tasks/update',
  // 'DELETE /api/tasks/:id': 'tasks/delete',
  '/tasks/{id}': {
    patch: {

    }
    delete: {

    }
  }

  // 'POST /api/cards/:cardId/attachments': 'attachments/create',
  '/cards/{id}/attachments': {
    post: {

    }
  }

  // 'PATCH /api/attachments/:id': 'attachments/update',
  // 'DELETE /api/attachments/:id': 'attachments/delete',
  '/attachments/{id}': {
    patch: {

    }
    delete: {

    }
  }

  // 'GET /api/cards/:cardId/actions': 'actions/index',
  '/cards/{id}/actions': {
    get: {

    }
  }

  // 'POST /api/cards/:cardId/comment-actions': 'comment-actions/create',
  '/cards/{id}/comment-actions': {
    get: {

    }
  }

  // 'PATCH /api/comment-actions/:id': 'comment-actions/update',
  // 'DELETE /api/comment-actions/:id': 'comment-actions/delete',
  '/comment-actions/{id}': {
    patch: {

    }
    delete: {

    }
  }

  // 'GET /api/notifications': 'notifications/index',
  '/notifications': {
    get: {

    }
  }

  // 'GET /api/notifications/:id': 'notifications/show',
  // 'PATCH /api/notifications/:ids': 'notifications/update',
  '/notifications/{id}': {
    get: {

    }
    patch: {

    }
  }

  // 'GET /attachments/:id/download/:filename': {
  //    action: 'attachments/download',
  //    skipAssets: false,
  // },
  '/attachments/{id}/download/{filename}': {
    get: {

    }
  }

  // 'GET /attachments/:id/download/thumbnails/cover-256.:extension': {
  //    action: 'attachments/download-thumbnail',
  //    skipAssets: false,
  // },
  '/attachments/{id}/download/thumbnails/cover-256.{extension}': {
    get: {

    }
  }
}
