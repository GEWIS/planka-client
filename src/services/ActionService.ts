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

  public remove(data: $OpenApiTs['/api/attachments/{attachmentId}']['delete']['req']): CancelablePromise<$OpenApiTs['/api/attachments/{attachmentId}']['delete']['res'][200]> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/attachments/{attachmentId}',
      path: {
        attachmentId: data.attachmentId,
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
