import type { CancelablePromise } from '../core/CancelablePromise'
import { $OpenApiTs, StatusCode } from '../types'
import { request as __request } from '../core/request'
import { OpenAPI } from '../core/OpenAPI'
import { Planka } from '.'

export class NotificationService {
  private planka: Planka

  constructor(planka: Planka) {
    this.planka = planka
  }

  public getAll(): CancelablePromise<$OpenApiTs['/api/notifications']['get']['res'][200]> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/notifications',
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`,
      },
      errors: {
        401: StatusCode.s401,
        404: StatusCode.s404,
      },
    })
  }

  public get(data: $OpenApiTs['/api/notifications/{notificationId}']['get']['req']): CancelablePromise<$OpenApiTs['/api/notifications/{notificationId}']['get']['res'][200]> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/notifications/{notificationId}',
      path: {
        notificationId: data.notificationId,
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

  public update(data: $OpenApiTs['/api/notifications/{notificationId}']['patch']['req']): CancelablePromise<$OpenApiTs['/api/notifications/{notificationId}']['patch']['res'][200]> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/notifications/{notificationId}',
      path: {
        notificationId: data.notificationId,
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
}
