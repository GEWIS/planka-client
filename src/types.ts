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
  avatarUrl?: string
  createdAt: Date
  updatedAt?: Date
  deletedAt?: Date
}

export type Project = {
  id: string
  createdAt: Date
  updatedAt?: Date
  name: string
  background?: Background
  backgroundImage?: BackgroundImage
}

export type Board = {
  id: string
  createdAt: Date
  updatedAt?: Date
  position: number
  name: string
  projectId: string
}

export type BoardMembership = {
  id: string
  createdAt: Date
  updatedAt?: Date
  role: Role
  canComment?: boolean
  boardId: string
  userId: string
}

export type Role = 'editor' | 'viewer'

export type Label = {
  id: string
  createdAt: Date
  updatedAt?: Date
  position: number
  name: string
  color: LabelColor
  boardId: string
}

export type LabelColor = 'berry-red' | 'pumpkin-orange' | 'lagoon-blue' | 'pink-tulip' | 'light-mud' | 'orange-peel' | 'bright-moss' | 'antique-blue' | 'dark-granite' | 'lagune-blue' | 'sunny-grass' | 'morning-sky' | 'light-orange' | 'midnight-blue' | 'tank-green' | 'gun-metal' | 'wet-moss' | 'red-burgundy' | 'light-concrete' | 'apricot-red' | 'desert-sand' | 'navy-blue' | 'egg-yellow' | 'coral-green' | 'light-cocoa'

export type List = {
  id: string
  createdAt: Date
  updatedAt?: Date
  position: number
  name: string
  boardId: string
}

export type Card = {
  id: string
  createdAt: Date
  updatedAt?: Date
  creatorUserId: string
  position: number
  name: string
  description?: string
  dueDate?: Date
  stopWatch?: StopWatch
  boardId: string
  listId: string
  coverAttachmentId?: string
  isSubscribed: boolean
}

export type StopWatch = {
  startedAt?: Date
  total: number
}

export type CardMembership = {
  id: string
  createdAt: Date
  updatedAt?: Date
  cardId: string
  userId: string
}

export type CardLabel = {
  id: string
  createdAt: Date
  updatedAt?: Date
  cardId: string
  labelId?: string
}

export type Task = {
  id: string
  createdAt: Date
  updatedAt?: Date
  position: number
  name: string
  isCompleted: boolean
  cardId: string
}

export type Action = {
  id: string
  createdAt: Date
  updatedAt?: Date
  type: CommentType
  data: ActionText
  cardId: string
  userId: string
}

export type ActionText = {
  text: string
}

export type Comment = {
  id: string
  createdAt: Date
  updatedAt?: Date
  cardId: string
  userId: string
  data: ActionText
  type: CommentType
}

export type CommentType = 'commentCard'

export type Notification = {
  id: string
  createdAt: Date
  updatedAt?: Date
  isRead: boolean
  userId: string
  cardId: string
  actionId: string
}

export type Attachment = {
  id: string
  name: string
  cardId: string
  url: string
  createUserId: string
  createdAt: Date
  updatedAt?: Date
  coverUrl?: string
  image?: Image
}

export type Image = {
  width: number
  height: number
}

export type BackgroundImage = {
  url?: string
  coverUrl?: string
}

export type Background = {
  type: BackgroundType
  name?: BackgroundGradient
}

export type BackgroundType = 'gradient' | 'image'

export type BackgroundGradient = 'old-lime' | 'ocean-dive' | 'tzepesch-style' | 'jungle-mesh' | 'strawberry-dust' | 'purple-rose' | 'sun-scream' | 'warm-rust' | 'sky-change' | 'green-eyes' | 'blue-xchange' | 'blood-orange' | 'sour-peel' | 'green-ninja' | 'algae-green' | 'coral-reef' | 'steel-grey' | 'heat-waves' | 'velvet-lounge' | 'purple-rain' | 'blue-steel' | 'blueish-curve' | 'prism-light' | 'green-mist' | 'red-curtain'

export type ProjectManager = {
  id: string
  createdAt: Date
  updatedAt: Date
  projectId: string
  userId: string
}

export type SingleResponse<T> = {
  item: T
  included?: Partial<Include>
}

export type ArrayResponse<T> = {
  items: T[]
  included?: Partial<Include>
}

export type Include = {
  users: User[]
  projectManagers: ProjectManager[]
  boards: Board[]
  boardMemberships: BoardMembership[]
  cardMemberships: Card[]
  cardLabels: Label[]
  actions: Action[]
  tasks: Action[]
}

export type BaseError = {
  code: string
  message: string
}

export type BadRequestError = BaseError & {
  problems: string[]
}

export type UnauthorizedError = BaseError

export type ConflictError = BaseError

export type NotFoundError = Omit<BaseError, 'message'>

export type UnprocessableError = BaseError

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

  // 'POST /api/users/:id/avatar': 'users/update-avatar'
  '/users/{userId}/avatar': {
    post: {
      req: {
        userId: string
        requestBody: {
          file: string
        }
      }
      res: {
        200: SingleResponse<User>
        400: BadRequestError
        401: UnauthorizedError
        404: NotFoundError
        422: UnprocessableError
      }
    }
  }

  // 'GET /api/projects': 'projects/index'
  // 'POST /api/projects': 'projects/create'
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

  // 'GET /api/projects/:id': 'projects/show'
  // 'PATCH /api/projects/:id': 'projects/update'
  // 'DELETE /api/projects/:id': 'projects/delete'
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

  // 'POST /api/projects/:id/background-image': 'projects/update-background-image'
  '/projects/{projectId}/background-image': {
    post: {
      req: {
        projectId: string
        requestBody: {
          file: string
        }
      }
      res: {
        200: SingleResponse<Project>
        401: UnauthorizedError
        404: NotFoundError
        422: UnprocessableError
      }
    }
  }


  // TODO implement
  // 'POST /api/projects/:projectId/managers': 'project-managers/create'
  '/projects/{projectId}/manager': {
    post: {
      req: {
        projectId: string
      }
      res: {}
    }
  }

  // TODO implement
  // 'DELETE /api/project-managers/:id': 'project-managers/delete'
  '/project-managers/{id}': {
    delete: {}
  }

  // 'POST /api/projects/:projectId/boards': 'boards/create'
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

  // 'GET /api/boards/:id': 'boards/show'
  // 'PATCH /api/boards/:id': 'boards/update'
  // 'DELETE /api/boards/:id': 'boards/delete'
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

  // 'POST /api/boards/:boardId/memberships': 'board-memberships/create'
  '/boards/{boardId}/memberships': {
    post: {
      req: {
        boardId: string
        requestBody: {
          userId: string
          role: Role
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

  // 'PATCH /api/board-memberships/:id': 'board-memberships/update'
  // 'DELETE /api/board-memberships/:id': 'board-memberships/delete'
  '/board-memberships/{membershipId}': {
    update: {
      req: {
        membershipId: string
        requestBody: {
          role: Role
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

  // 'POST /api/boards/:boardId/labels': 'labels/create'
  '/boards/{boardId}/labels': {
    post: {
      req: {
        boardId: string
        requestBody: {
          position: number
          color: LabelColor
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

  // 'PATCH /api/labels/:id': 'labels/update'
  // 'DELETE /api/labels/:id': 'labels/delete'
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

  // 'POST /api/boards/:boardId/lists': 'lists/create'
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

  // 'PATCH /api/lists/:id': 'lists/update'
  // 'DELETE /api/lists/:id': 'lists/delete'
  '/lists/{listId}': {
    patch: {
      req: {
        listId: string
        requestBody: Partial<List>
      }
      res: {
        200: SingleResponse<List>
        401: UnauthorizedError
        404: NotFoundError
      }
    }
    delete: {
      req: {
        listId: string
      }
      res: {
        200: SingleResponse<Label>
        401: UnauthorizedError
        404: NotFoundError
      }
    }
  }

  // 'POST /api/lists/:id/sort': 'lists/sort'
  '/lists/{listId}/sort': {
    post: {
      req: {
        listId: number
      }
      res: {
        200: SingleResponse<List>
        401: UnauthorizedError
        404: NotFoundError
      }
    }
  }

  // 'POST /api/lists/:listId/cards': 'cards/create'
  '/lists/{listId}/cards': {
    post: {
      req: {
        listId: number
        requestBody: {
          name: string
          position: number
        }
      }
      res: {
        200: SingleResponse<List>
        400: BadRequestError
        401: UnauthorizedError
        404: NotFoundError
        422: UnprocessableError
      }
    }
  }

  // 'GET /api/cards/:id': 'cards/show'
  // 'PATCH /api/cards/:id': 'cards/update'
  // 'DELETE /api/cards/:id': 'cards/delete'
  '/cards/{cardId}': {
    get: {
      req: {
        cardId: string
      }
      res: {
        200: SingleResponse<Card>
        401: UnauthorizedError
        404: NotFoundError
      }
    }
    patch: {
      req: {
        cardId: string
        requestBody: Partial<Card>
      }
      res: {
        200: SingleResponse<Card>
        401: UnauthorizedError
        404: NotFoundError
      }
    }
    delete: {
      req: {
        cardId: string
      }
      res: {
        200: SingleResponse<Card>
        401: UnauthorizedError
        404: NotFoundError
      }
    }
  }

  // 'POST /api/cards/:id/duplicate': 'cards/duplicate'
  '/cards/{cardId}/duplicate': {
    post: {
      req: {
        cardId: string
        requestBody: {
          position: number
        }
      }
      res: {
        200: SingleResponse<Card>
        400: BadRequestError
        401: UnauthorizedError
        404: NotFoundError
      }
    }
  }

  // 'POST /api/cards/:cardId/memberships': 'card-memberships/create'
  // 'DELETE /api/cards/:cardId/memberships': 'card-memberships/delete'
  '/cards/{cardId}/memberships': {
    post: {
      req: {
        cardId: string
        requestBody: {
          userId: string
        }
      }
      res: {
        200: SingleResponse<CardMembership>
        400: BadRequestError
        401: UnauthorizedError
        404: NotFoundError
      }
    }
    delete: {
      req: {
        cardId: string
        requestBody: {
          userId: string
        }
      }
      res: {
        200: SingleResponse<CardMembership>
        400: BadRequestError
        401: UnauthorizedError
        404: NotFoundError
      }
    }
  }

  // 'POST /api/cards/:cardId/labels': 'card-labels/create'
  '/cards/{cardId}/labels': {
    post: {
      req: {
        cardId: string
        requestBody: {
          labelId: string
        }
      }
      res: {
        200: SingleResponse<CardLabel>
        400: BadRequestError
        401: UnauthorizedError
        404: NotFoundError
      }
    }
  }

  // 'DELETE /api/cards/:cardId/labels/:labelId': 'card-labels/delete'
  '/cards/{cardId}/labels/{labelId}': {
    delete: {
      req: {
        cardId: string
        labelId: string
      }
      res: {
        200: SingleResponse<CardLabel>
        400: BadRequestError
        401: UnauthorizedError
        404: NotFoundError
      }
    }
  }

  // 'POST /api/cards/:cardId/tasks': 'tasks/create'
  '/cards/{cardId}/tasks': {
    post: {
      req: {
        cardId: string
        requestBody: {
          position: number
          name: string
        }
      }
      res: {
        200: SingleResponse<Task>
        400: BadRequestError
        401: UnauthorizedError
        404: NotFoundError
      }
    }
  }

  // 'PATCH /api/tasks/:id': 'tasks/update'
  // 'DELETE /api/tasks/:id': 'tasks/delete'
  '/tasks/{taskId}': {
    patch: {
      req: {
        taskId: string
        requestBody: Partial<Task>
      }
      res: {
        200: SingleResponse<Task>
        401: UnauthorizedError
        404: NotFoundError
      }
    }
    delete: {
      req: {
        taskId: string
      }
      res: {
        200: SingleResponse<Task>
        401: UnauthorizedError
        404: NotFoundError
      }
    }
  }

  // TODO implement
  // 'POST /api/cards/:cardId/attachments': 'attachments/create'
  // '/cards/{id}/attachments': {
  // post: {
  // req: {}
  // res: {}
  // }
  // }

  // 'PATCH /api/attachments/:id': 'attachments/update'
  // 'DELETE /api/attachments/:id': 'attachments/delete'
  // '/attachments/{id}': {
  // patch: {}
  // delete: {}
  // }

  // 'GET /api/cards/:cardId/actions': 'actions/index'
  '/cards/{cardId}/actions': {
    get: {
      req: {
        cardId: string
      }
      res: {
        200: ArrayResponse<Action>
        401: UnauthorizedError
        404: NotFoundError
      }
    }
  }

  // 'POST /api/cards/:cardId/comment-actions': 'comment-actions/create'
  '/cards/{cardId}/comment-actions': {
    post: {
      req: {
        cardId: string
        requestBody: {
          text: string
        }
      }
      res: {
        200: SingleResponse<Action>
        400: BadRequestError
        401: UnauthorizedError
        404: NotFoundError
      }
    }
  }

  // 'PATCH /api/comment-actions/:id': 'comment-actions/update'
  // 'DELETE /api/comment-actions/:id': 'comment-actions/delete'
  '/comment-actions/{actionId}': {
    'patch': {
      req: {
        actionId: string
        requestBody: {
          text: string
        }
        res: {
          200: SingleResponse<Action>
          401: UnauthorizedError
          404: NotFoundError
        }
      }
      delete: {
        req: {
          actionId: string
        }
        res: {
          200: SingleResponse<Action>
          401: UnauthorizedError
          404: NotFoundError
        }
      }
    }

    // 'GET /api/notifications': 'notifications/index'
    '/notifications': {
      get: {
        res: {
          200: ArrayResponse<Notification>
          401: UnauthorizedError
          404: NotFoundError
        }
      }
    }

    // 'GET /api/notifications/:id': 'notifications/show'
    // 'PATCH /api/notifications/:ids': 'notifications/update'
    '/notifications/{notificationId}': {
      get: {
        req: {
          notificationId: string
        }
        res: {
          200: ArrayResponse<Notification>
          401: UnauthorizedError
          404: NotFoundError
        }
      }
      patch: {
        req: {
          notificationId: string
          // TODO check if correct
          requestBody: Partial<Notification>
        }
        res: {
          200: ArrayResponse<Notification>
          401: UnauthorizedError
          404: NotFoundError
        }
      }
    }

    // TODO implement
    // 'GET /attachments/:id/download/:filename': {
    //    action: 'attachments/download',
    //    skipAssets: false,
    // },
    // '/attachments/{id}/download/{filename}': {
    // get: {}
    // }

    // 'GET /attachments/:id/download/thumbnails/cover-256.:extension': {
    //    action: 'attachments/download-thumbnail',
    //    skipAssets: false,
    // },
    // '/attachments/{id}/download/thumbnails/cover-256.{extension}': {
    // get: {}
    // }
  }
}
