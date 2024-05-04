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

export type Project = {
  id: string
  createdAt: Date
  updatedAt?: Date
  name: string
  // TODO update type
  background?: string
  // TODO update type
  backgroundImage?: string
}

export type Board = {
  id: string
  createdAt: Date
  updatedAt?: Date
  position: number
  name: string
  projectId: string
  included: {
    boardMemberships: BoardMembership[]
  }
}

export type BoardMembership = {
  id: string
  createdAt: Date
  updatedAt?: Date
  role: Roles
  canComment?: boolean
  boardId: string
  userId: string
}

export type Roles = 'editor' | 'viewer'

export type Label = {
  id: string
  createdAt: Date
  updatedAt?: Date
  position: number
  name: string
  color: Colors
  boardId: string
}

export type Colors = 'berry-red' | 'pumpkin-orange' | 'lagoon-blue' | 'pink-tulip' | 'light-mud' | 'orange-peel' | 'bright-moss' | 'antique-blue' | 'dark-granite' | 'lagune-blue' | 'sunny-grass' | 'morning-sky' | 'light-orange' | 'midnight-blue' | 'tank-green' | 'gun-metal' | 'wet-moss' | 'red-burgundy' | 'light-concrete' | 'apricot-red' | 'desert-sand' | 'navy-blue' | 'egg-yellow' | 'coral-green' | 'light-cocoa'

export type List = {
  id: string
  createdAt: Date
  updatedAt?: Date
  position: number
  name: string
  boardId: string
}

export type SingleResponse<T> = {
  item: T
  included?: Partial<Included>
}

export type ArrayResponse<T> = {
  items: T[]
  // TODO update type
  included?: Partial<Included>
}

export type Included = {
  users: User[]
  // TODO update type
  projectManagers: void
  // TODO update type
  boards: void
  // TODO update type
  boardMemberships: void

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

export type ConflictError = {
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
    post: {
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
    delete: {
      res: {
        200: SingleResponse<string>
        401: UnauthorizedError
      }
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
        409: ConflictError
      }
    }
  }

  // 'GET /api/users/:id': 'users/show'
  // 'PATCH /api/users/:id': 'users/update'
  // 'DELETE /api/users/:id': 'users/delete'
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
        requestBody: Partial<User>
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

  // 'PATCH /api/users/:id/email': 'users/update-email'
  '/users/{userId}/email': {
    patch: {
      req: {
        userId: string
        requestBody: {
          email: string
        }
      }
      res: {
        200: SingleResponse<User>
        400: BadRequestError
        401: UnauthorizedError
        404: NotFoundError
        409: ConflictError
      }
    }
  }

  // 'PATCH /api/users/:id/password': 'users/update-password'
  '/users/{userId}/password': {
    patch: {
      req: {
        userId: string
        requestBody: {
          password: string
        }
      }
      res: {
        200: SingleResponse<User>
        400: BadRequestError
        401: UnauthorizedError
        404: NotFoundError
        409: ConflictError
      }
    }
  }

  // 'PATCH /api/users/:id/username': 'users/update-username'
  '/users/{userId}/username': {
    patch: {
      req: {
        userId: string
        requestBody: {
          username: string
        }
      }
      res: {
        200: SingleResponse<User>
        400: BadRequestError
        401: UnauthorizedError
        404: NotFoundError
        409: ConflictError
      }
    }
  }

  // TODO implement
  // 'POST /api/users/:id/avatar': 'users/update-avatar'
  '/users/{userId}/avatar': {
    post: {
      req: {
        userId: string
        requestBody: {
          username: string
        }
      }
      res: {
        200: SingleResponse<User>
        400: BadRequestError
        401: UnauthorizedError
        404: NotFoundError
      }
    }
  }

  // 'GET /api/projects': 'projects/index',
  // 'POST /api/projects': 'projects/create',
  '/projects': {
    get: {
      res: {
        200: ArrayResponse<Project>
        401: UnauthorizedError
      }
    }
    post: {
      req: {
        requestBody: {
          name: string
        }
      }
      res: {
        200: ArrayResponse<Project>
        400: BadRequestError
        401: UnauthorizedError
      }
    }
  }

  // 'GET /api/projects/:id': 'projects/show',
  // 'PATCH /api/projects/:id': 'projects/update',
  // 'DELETE /api/projects/:id': 'projects/delete',
  '/projects/{projectId}': {
    get: {
      req: {
        projectId: string
        requestBody: {
          name: string
        }
      }
      res: {
        200: SingleResponse<Project>
        400: BadRequestError
        401: UnauthorizedError
        404: NotFoundError
      }
    }
    patch: {
      req: {
        projectId: string
        requestBody: Partial<Project>
      }
      res: {
        200: SingleResponse<Project>
        401: UnauthorizedError
        404: NotFoundError
      }
    }
    delete: {
      req: {
        projectId: string
      }
      res: {
        200: SingleResponse<Project>
        401: UnauthorizedError
        404: NotFoundError
      }
    }
  }

  // TODO
  // 'POST /api/projects/:id/background-image': 'projects/update-background-image',
  '/projects/{id}/background-image': {
    post: {

    }
  }

  // 'POST /api/projects/:projectId/managers': 'project-managers/create',
  '/projects/{projectId}/manager': {
    post: {
      req: {
        projectId: string
      }
      res: {
      }
    }
  }

  // 'DELETE /api/project-managers/:id': 'project-managers/delete',
  '/project-managers/{id}': {
    delete: {

    }
  }

  // 'POST /api/projects/:projectId/boards': 'boards/create',
  '/projects/{projectId}/boards': {
    post: {
      req: {
        projectId: string
        requestBody: {
          position: number
          name: string
        }
      }
      res: {
        200: SingleResponse<Board>
        400: BadRequestError
        401: UnauthorizedError
        404: NotFoundError
      }
    }
  }

  // 'GET /api/boards/:id': 'boards/show',
  // 'PATCH /api/boards/:id': 'boards/update',
  // 'DELETE /api/boards/:id': 'boards/delete',
  '/boards/{boardId}': {
    get: {
      req: {
        boardId: string
      }
      res: {
        200: SingleResponse<Board>
        401: UnauthorizedError
        404: NotFoundError
      }
    }
    patch: {
      req: {
        boardId: string
        requestBody: Partial<Board>
      }
      res: {
        200: SingleResponse<Board>
        401: UnauthorizedError
        404: NotFoundError
      }
    }
    delete: {
      req: {
        boardId: string
      }
      res: {
        200: SingleResponse<Board>
        401: UnauthorizedError
        404: NotFoundError
      }
    }
  }

  // 'POST /api/boards/:boardId/memberships': 'board-memberships/create',
  '/boards/{boardId}/memberships': {
    post: {
      req: {
        boardId: string
        requestBody: {
          userId: string
          role: Roles
        }
      }
      res: {
        200: SingleResponse<Board>
        400: BadRequestError
        401: UnauthorizedError
        404: NotFoundError
        409: ConflictError
      }
    }
  }

  // 'PATCH /api/board-memberships/:id': 'board-memberships/update',
  // 'DELETE /api/board-memberships/:id': 'board-memberships/delete',
  '/board-memberships/{membershipId}': {
    update: {
      req: {
        membershipId: string
        requestBody: {
          role: Roles
          canComment: boolean
        }
      }
      res: {
        200: SingleResponse<BoardMembership>
        401: UnauthorizedError
        404: NotFoundError
      }
    }
    delete: {
      req: {
        membershipId: string
      }
      res: {
        200: SingleResponse<BoardMembership>
        401: UnauthorizedError
        404: NotFoundError
      }
    }
  }

  // 'POST /api/boards/:boardId/labels': 'labels/create',
  '/boards/{boardId}/labels': {
    post: {
      req: {
        boardId: string
        requestBody: {
          position: number
          color: Colors
        }
      }
      res: {
        200: SingleResponse<Label>
        400: BadRequestError
        401: UnauthorizedError
        404: NotFoundError
      }
    }
  }

  // 'PATCH /api/labels/:id': 'labels/update',
  // 'DELETE /api/labels/:id': 'labels/delete',
  '/labels/{labelId}': {
    patch: {
      req: {
        labelId: string
        requestBody: Partial<Label>
      }
      res: {
        200: SingleResponse<Label>
        401: UnauthorizedError
        404: NotFoundError
      }
    }
    delete: {
      req: {
        labelId: string
      }
      res: {
        200: SingleResponse<Label>
        401: UnauthorizedError
        404: NotFoundError
      }
    }
  }

  // 'POST /api/boards/:boardId/lists': 'lists/create',
  '/boards/{boardId}/lists': {
    post: {
      req: {
        boardId: string
        requestBody: {
          position: number
          name: string
        }
      }
      res: {
        200: SingleResponse<List>
        400: BadRequestError
        401: UnauthorizedError
        404: NotFoundError
      }
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
