import type { CancelablePromise } from './core/CancelablePromise'
import { OpenAPI } from './core/OpenAPI'
import { request as __request } from './core/request'
import { $OpenApiTs, SingleResponse } from './types'

export class PlankaService {
  private accessToken: string = null

  /**
   * @returns SingleResponse<Oidc> Ok
   */
  public getConfig(): CancelablePromise<$OpenApiTs['/api/config']['get']['res'][200]> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/config',
    })
  }

  /**
   * @returns none Ok
   * @throws ApiError
   */
  public async authorize(data: $OpenApiTs['/api/access-tokens']['post']['req']): Promise<void> {
    const accessToken: SingleResponse<string> = await __request(OpenAPI, {
      method: 'POST',
      url: '/api/access-tokens',
      body: data.requestBody,
      errors: {
        400: 'Invalid request body',
      },
    })
    this.accessToken = accessToken.item
  }

  /**
   * @returns none Ok
   * @throws ApiError
   */
  public async authorizeOidc(data: $OpenApiTs['/api/access-tokens/exchange-using-oidc']['post']['req']): Promise<void> {
    const accessToken: SingleResponse<string> = await __request(OpenAPI, {
      method: 'POST',
      url: '/api/access-tokens/exchange-using-oidc',
      body: data.requestBody,
      errors: {
        400: 'Invalid request body',
      },
    })
    this.accessToken = accessToken.item
  }

  /**
   * @returns none Ok
   * @throws ApiError
   */
  public async unauthorize(): Promise<void> {
    await __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/access-tokens/me',
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
      errors: {
        401: 'Unauthorized',
      },
    })
    this.accessToken = null
  }

  /**
     * @returns ArrayResponse<User> Ok
     * @throws ApiError
     */
  public getUsers(): CancelablePromise<$OpenApiTs['/api/users']['get']['res'][200]> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/users',
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
      errors: {
        401: 'Unauthorized',
        404: 'User not found',
      },
    })
  }

  /**
     * @param data The data for the request.
     * @param data.requestBody
     * @returns SingleResponse<User> Ok
     * @throws ApiError
     */
  public createUser(data: $OpenApiTs['/api/users']['post']['req']): CancelablePromise<$OpenApiTs['/api/users']['post']['res'][200]> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/users',
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
      body: data.requestBody,
      errors: {
        401: 'Unauthorized',
        404: 'User not found',
      },
    })
  }

  /**
     * @param data The data for the request.
     * @param data.userId
     * @returns SingleResponse<User> Ok
     * @throws ApiError
     */
  public getUser(data: $OpenApiTs['/api/users/{userId}']['get']['req']): CancelablePromise<$OpenApiTs['/api/users/{userId}']['get']['res'][200]> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/users/{userId}',
      path: {
        userId: data.userId,
      },
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
      errors: {
        401: 'Unauthorized',
        404: 'User not found',
      },
    })
  }

  /**
     * @param data The data for the request.
     * @param data.userId
     * @param data.requestBody
     * @returns SingleResponse<User> Ok
     * @throws ApiError
     */
  public updateUser(data: $OpenApiTs['/api/users/{userId}']['patch']['req']): CancelablePromise<$OpenApiTs['/api/users/{userId}']['patch']['res'][200]> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/users/{userId}',
      path: {
        userId: data.userId,
      },
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
      body: data.requestBody,
      errors: {
        400: 'Invalid request body',
        401: 'Unauthorized',
        404: 'User not found',
      },
    })
  }

  /**
     * @param data The data for the request.
     * @param data.userId
     * @param data.requestBody
     * @returns SingleResponse<User> Ok
     * @throws ApiError
     */
  public deleteUser(data: $OpenApiTs['/api/users/{userId}']['delete']['req']): CancelablePromise<$OpenApiTs['/api/users/{userId}']['delete']['res'][200]> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/users/{userId}',
      path: {
        userId: data.userId,
      },
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
      errors: {
        401: 'Unauthorized',
        404: 'User not found',
      },
    })
  }
}
