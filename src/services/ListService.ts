import type { CancelablePromise } from '../core/CancelablePromise'
import { $OpenApiTs, StatusCode } from '../types'
import { request as __request } from '../core/request'
import { OpenAPI } from '../core/OpenAPI'
import { Planka } from '.'

export class ListService {
  private planka: Planka

  constructor(planka: Planka) {
    this.planka = planka
  }

  public create(data: $OpenApiTs['/api/boards/{boardId}/lists']['post']['req']): CancelablePromise<$OpenApiTs['/api/boards/{boardId}/lists']['post']['res'][200]> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/boards/{boardId}/lists',
      path: {
        boardId: data.boardId,
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`,
      },
      errors: {
        400: StatusCode.s400,
        401: StatusCode.s401,
        404: StatusCode.s404,
      },
    })
  }

  public update(data: $OpenApiTs['/api/lists/{listId}']['patch']['req']): CancelablePromise<$OpenApiTs['/api/lists/{listId}']['patch']['res'][200]> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/lists/{listId}',
      path: {
        listId: data.listId,
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`,
      },
      errors: {
        401: StatusCode.s401,
        404: StatusCode.s404,
      },
    })
  }

  public delete(data: $OpenApiTs['/api/lists/{listId}']['delete']['req']): CancelablePromise<$OpenApiTs['/api/lists/{listId}']['delete']['res'][200]> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/lists/{listId}',
      path: {
        listId: data.listId,
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`,
      },
      errors: {
        401: StatusCode.s401,
        404: StatusCode.s404,
      },
    })
  }

  public sort(data: $OpenApiTs['/api/lists/{listId}/sort']['post']['req']): CancelablePromise<$OpenApiTs['/api/lists/{listId}/sort']['post']['res'][200]> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/lists/{listId}/sort',
      path: {
        listId: data.listId,
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`,
      },
      errors: {
        401: StatusCode.s401,
        404: StatusCode.s404,
      },
    })
  }
}
