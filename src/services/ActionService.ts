import type { CancelablePromise } from '../core/CancelablePromise'
import { $OpenApiTs, StatusCode } from '../types'
import { request as __request } from '../core/request'
import { OpenAPI } from '../core/OpenAPI'
import { Planka } from '.'

export class ActionService {
  private planka: Planka

  constructor(planka: Planka) {
    this.planka = planka
  }

  /**
   * @param data The data for the request.
   * @param data.cardId
   * @param data.requestBody
   * @returns SingleResponse<Comment> Ok
   * @throws ApiError
   */
  public create(data: $OpenApiTs['/api/cards/{cardId}/comment-actions']['post']['req']): CancelablePromise<$OpenApiTs['/api/cards/{cardId}/comment-actions']['post']['res'][200]> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/cards/{cardId}/comment-actions',
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

  /**
   * @param data The data for the request.
   * @param data.actionId
   * @param data.requestBody
   * @returns SingleResponse<Comment> Ok
   * @throws ApiError
   */
  public update(data: $OpenApiTs['/api/comment-actions/{actionId}']['patch']['req']): CancelablePromise<$OpenApiTs['/api/comment-actions/{actionId}']['patch']['res'][200]> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/comment-actions/{actionId}',
      path: {
        actionId: data.actionId,
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

  /**
   * @param data The data for the request.
   * @param data.actionId
   * @returns SingleResponse<Comment> Ok
   * @throws ApiError
   */
  public remove(data: $OpenApiTs['/api/comment-actions/{actionId}']['delete']['req']): CancelablePromise<$OpenApiTs['/api/comment-actions/{actionId}']['delete']['res'][200]> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/comment-actions/{actionId}',
      path: {
        actionId: data.actionId,
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
