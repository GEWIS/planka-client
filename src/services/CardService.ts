import type { CancelablePromise } from '../core/CancelablePromise'
import { $OpenApiTs, StatusCode } from '../types'
import { request as __request } from '../core/request'
import { OpenAPI } from '../core/OpenAPI'
import { Planka } from '.'

export class CardService {
  private planka: Planka

  constructor(planka: Planka) {
    this.planka = planka
  }

  /**
   * @param data The data for the request.
   * @param data.projectId
   * @param data.requestBody
   * @returns SingleResponse<Board> Ok
   * @throws ApiError
   */
  public create(data: $OpenApiTs['/api/lists/{listId}/cards']['post']['req']): CancelablePromise<$OpenApiTs['/api/lists/{listId}/cards']['post']['res'][200]> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/lists/{listId}/cards',
      path: {
        listId: data.listId,
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`,
      },
      body: data.requestBody,
      errors: {
        400: StatusCode.s400,
        401: StatusCode.s401,
        404: StatusCode.s404,
        422: StatusCode.s422,
      },
    })
  }

  public get(data: $OpenApiTs['/api/cards/{cardId}']['get']['req']): CancelablePromise<$OpenApiTs['/api/cards/{cardId}']['get']['res'][200]> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/cards/{cardId}',
      path: {
        cardId: data.cardId,
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

  public update(data: $OpenApiTs['/api/cards/{cardId}']['patch']['req']): CancelablePromise<$OpenApiTs['/api/cards/{cardId}']['patch']['res'][200]> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/cards/{cardId}',
      path: {
        cardId: data.cardId,
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`,
      },
      body: data.requestBody,
      errors: {
        401: StatusCode.s401,
        404: StatusCode.s404,
      },
    })
  }

  public delete(data: $OpenApiTs['/api/cards/{cardId}']['delete']['req']): CancelablePromise<$OpenApiTs['/api/cards/{cardId}']['delete']['res'][200]> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/cards/{cardId}',
      path: {
        cardId: data.cardId,
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

  public duplicate(data: $OpenApiTs['/api/cards/{cardId}/duplicate']['post']['req']): CancelablePromise<$OpenApiTs['/api/cards/{cardId}/duplicate']['post']['res'][200]> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/cards/{cardId}/duplicate',
      path: {
        cardId: data.cardId,
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`,
      },
      body: data.requestBody,
      errors: {
        400: StatusCode.s400,
        401: StatusCode.s401,
        404: StatusCode.s404,
      },
    })
  }

  public addMember(data: $OpenApiTs['/api/cards/{cardId}/memberships']['post']['req']): CancelablePromise<$OpenApiTs['/api/cards/{cardId}/memberships']['post']['res'][200]> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/cards/{cardId}/memberships',
      path: {
        cardId: data.cardId,
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`,
      },
      body: data.requestBody,
      errors: {
        400: StatusCode.s400,
        401: StatusCode.s401,
        404: StatusCode.s404,
      },
    })
  }

  public removeMember(data: $OpenApiTs['/api/cards/{cardId}/memberships']['delete']['req']): CancelablePromise<$OpenApiTs['/api/cards/{cardId}/memberships']['delete']['res'][200]> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/cards/{cardId}/memberships',
      path: {
        cardId: data.cardId,
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`,
      },
      body: data.requestBody,
      errors: {
        400: StatusCode.s400,
        401: StatusCode.s401,
        404: StatusCode.s404,
      },
    })
  }

  public addLabel(data: $OpenApiTs['/api/cards/{cardId}/labels']['post']['req']): CancelablePromise<$OpenApiTs['/api/cards/{cardId}/labels']['post']['res'][200]> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/cards/{cardId}/labels',
      path: {
        cardId: data.cardId,
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`,
      },
      body: data.requestBody,
      errors: {
        400: StatusCode.s400,
        401: StatusCode.s401,
        404: StatusCode.s404,
      },
    })
  }

  public removeLabel(data: $OpenApiTs['/api/cards/{cardId}/labels/{labelId}']['delete']['req']): CancelablePromise<$OpenApiTs['/api/cards/{cardId}/labels/{labelId}']['delete']['res'][200]> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/cards/{cardId}/labels/{labelId}',
      path: {
        cardId: data.cardId,
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
}
