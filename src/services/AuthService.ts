import type { CancelablePromise } from '../core/CancelablePromise';
import { $OpenApiTs, SingleResponse, StatusCode } from '../types';
import { request as __request } from '../core/request';
import { OpenAPI } from '../core/OpenAPI';
import { Planka } from '.';

export class AuthService {
  private planka: Planka;
  constructor(planka: Planka) {
    this.planka = planka;
  }

  /**
   * @returns SingleResponse<Oidc> Ok
   */
  public getConfig(): CancelablePromise<$OpenApiTs['/api/config']['get']['res'][200]> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/config',
    });
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
        400: StatusCode.s400,
      },
    });
    this.planka.setAccessToken(accessToken.item);
  }

  /**
   * @returns none Ok
   * @throws ApiError
   */
  public async authorizeOidc(
    data: $OpenApiTs['/api/access-tokens/exchange-using-oidc']['post']['req'],
  ): Promise<void> {
    const accessToken: SingleResponse<string> = await __request(OpenAPI, {
      method: 'POST',
      url: '/api/access-tokens/exchange-using-oidc',
      body: data.requestBody,
      errors: {
        400: StatusCode.s400,
      },
    });
    this.planka.setAccessToken(accessToken.item);
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
        Authorization: `Bearer ${this.planka.getAccessToken()}`,
      },
      errors: {
        401: StatusCode.s401,
      },
    });
    this.planka.setAccessToken(null);
  }
}
