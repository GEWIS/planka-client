import type { CancelablePromise } from '../core/CancelablePromise';
import { $OpenApiTs, StatusCode } from '../types';
import { request as __request } from '../core/request';
import { OpenAPI } from '../core/OpenAPI';
import { Planka } from '.';

export class UserService {
  private planka: Planka;

  constructor(planka: Planka) {
    this.planka = planka;
  }

  /**
   * @returns ArrayResponse<User> Ok
   * @throws ApiError
   */
  public getAll(): CancelablePromise<$OpenApiTs['/api/users']['get']['res'][200]> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/users',
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`,
      },
      errors: {
        401: StatusCode.s401,
        404: StatusCode.s404,
      },
    });
  }

  /**
   * @param data The data for the request.
   * @param data.requestBody
   * @returns SingleResponse<User> Ok
   * @throws ApiError
   */
  public create(
    data: $OpenApiTs['/api/users']['post']['req'],
  ): CancelablePromise<$OpenApiTs['/api/users']['post']['res'][200]> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/users',
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`,
      },
      body: data.requestBody,
      errors: {
        401: StatusCode.s401,
        404: StatusCode.s404,
      },
    });
  }

  /**
   * @param data The data for the request.
   * @param data.userId
   * @returns SingleResponse<User> Ok
   * @throws ApiError
   */
  public get(
    data: $OpenApiTs['/api/users/{userId}']['get']['req'],
  ): CancelablePromise<$OpenApiTs['/api/users/{userId}']['get']['res'][200]> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/users/{userId}',
      path: {
        userId: data.userId,
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`,
      },
      errors: {
        401: StatusCode.s401,
        404: StatusCode.s404,
      },
    });
  }

  /**
   * @param data The data for the request.
   * @param data.userId
   * @param data.requestBody
   * @returns SingleResponse<User> Ok
   * @throws ApiError
   */
  public update(
    data: $OpenApiTs['/api/users/{userId}']['patch']['req'],
  ): CancelablePromise<$OpenApiTs['/api/users/{userId}']['patch']['res'][200]> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/users/{userId}',
      path: {
        userId: data.userId,
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
    });
  }

  /**
   * @param data The data for the request.
   * @param data.userId
   * @param data.requestBody
   * @returns SingleResponse<User> Ok
   * @throws ApiError
   */
  public remove(
    data: $OpenApiTs['/api/users/{userId}']['delete']['req'],
  ): CancelablePromise<$OpenApiTs['/api/users/{userId}']['delete']['res'][200]> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/users/{userId}',
      path: {
        userId: data.userId,
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`,
      },
      body: data.requestBody,
      errors: {
        401: StatusCode.s401,
        404: StatusCode.s404,
      },
    });
  }

  /**
   * @param data The data for the request.
   * @param data.userId
   * @param data.requestBody
   * @returns SingleResponse<User> Ok
   * @throws ApiError
   */
  public updateMail(
    data: $OpenApiTs['/api/users/{userId}/email']['patch']['req'],
  ): CancelablePromise<$OpenApiTs['/api/users/{userId}/email']['patch']['res'][200]> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/users/{userId}/email',
      path: {
        userId: data.userId,
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`,
      },
      body: data.requestBody,
      errors: {
        400: StatusCode.s400,
        401: StatusCode.s401,
        404: StatusCode.s404,
        409: StatusCode.s409,
      },
    });
  }

  /**
   * @param data The data for the request.
   * @param data.userId
   * @param data.requestBody
   * @returns SingleResponse<User> Ok
   * @throws ApiError
   */
  public updatePassword(
    data: $OpenApiTs['/api/users/{userId}/password']['patch']['req'],
  ): CancelablePromise<$OpenApiTs['/api/users/{userId}/password']['patch']['res'][200]> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/users/{userId}/password',
      path: {
        userId: data.userId,
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`,
      },
      body: data.requestBody,
      errors: {
        400: StatusCode.s400,
        401: StatusCode.s401,
        404: StatusCode.s404,
        409: StatusCode.s409,
      },
    });
  }

  /**
   * @param data The data for the request.
   * @param data.userId
   * @param data.requestBody
   * @returns SingleResponse<User> Ok
   * @throws ApiError
   */
  public updateName(
    data: $OpenApiTs['/api/users/{userId}/username']['patch']['req'],
  ): CancelablePromise<$OpenApiTs['/api/users/{userId}/username']['patch']['res'][200]> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/users/{userId}/username',
      path: {
        userId: data.userId,
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`,
      },
      body: data.requestBody,
      errors: {
        400: StatusCode.s400,
        401: StatusCode.s401,
        404: StatusCode.s404,
        409: StatusCode.s409,
      },
    });
  }

  /**
   * @param data The data for the request.
   * @param data.userId
   * @param data.requestBody
   * @returns SingleResponse<User> Ok
   * @throws ApiError
   */
  public updateAvatar(
    data: $OpenApiTs['/api/users/{userId}/avatar']['post']['req'],
  ): CancelablePromise<$OpenApiTs['/api/users/{userId}/avatar']['post']['res'][200]> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/users/{userId}/avatar',
      path: {
        userId: data.userId,
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
    });
  }
}
