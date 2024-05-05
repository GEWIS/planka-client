import type { CancelablePromise } from '../core/CancelablePromise'
import { $OpenApiTs, StatusCode } from '../types'
import { request as __request } from '../core/request'
import { OpenAPI } from '../core/OpenAPI'
import { Planka } from '.'

export class TaskService {
  private planka: Planka

  constructor(planka: Planka) {
    this.planka = planka
  }

  public create(data: $OpenApiTs['/api/cards/{cardId}/tasks']['post']['req']): CancelablePromise<$OpenApiTs['/api/cards/{cardId}/tasks']['post']['res'][200]> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/cards/{cardId}/tasks',
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

  public update(data: $OpenApiTs['/api/tasks/{taskId}']['patch']['req']): CancelablePromise<$OpenApiTs['/api/tasks/{taskId}']['patch']['res'][200]> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/tasks/{taskId}',
      path: {
        taskId: data.taskId,
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

  public remove(data: $OpenApiTs['/api/tasks/{taskId}']['delete']['req']): CancelablePromise<$OpenApiTs['/api/tasks/{taskId}']['delete']['res'][200]> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/tasks/{taskId}',
      path: {
        taskId: data.taskId,
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