import type { CancelablePromise } from '../core/CancelablePromise'
import { $OpenApiTs, StatusCode } from '../types'
import { request as __request } from '../core/request'
import { OpenAPI } from '../core/OpenAPI'
import { Planka } from '.'

export class LabelService {
  private planka: Planka

  constructor(planka: Planka) {
    this.planka = planka
  }

  public create(data: $OpenApiTs['/api/boards/{boardId}/labels']['post']['req']): CancelablePromise<$OpenApiTs['/api/boards/{boardId}/labels']['post']['res'][200]> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/boards/{boardId}/labels',
      path: {
        boardId: data.boardId,
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

  public update(data: $OpenApiTs['/api/labels/{labelId}']['patch']['req']): CancelablePromise<$OpenApiTs['/api/labels/{labelId}']['patch']['res'][200]> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/labels/{labelId}',
      path: {
        labelId: data.labelId,
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

  public remove(data: $OpenApiTs['/api/labels/{labelId}']['delete']['req']): CancelablePromise<$OpenApiTs['/api/labels/{labelId}']['delete']['res'][200]> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/labels/{labelId}',
      path: {
        labelId: data.labelId,
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