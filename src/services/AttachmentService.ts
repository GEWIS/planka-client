import type { CancelablePromise } from '../core/CancelablePromise';
import { $OpenApiTs, StatusCode } from '../types';
import { request as __request } from '../core/request';
import { OpenAPI } from '../core/OpenAPI';
import { Planka } from '.';

export class AttachmentService {
  private planka: Planka;

  constructor(planka: Planka) {
    this.planka = planka;
  }

  public create(
    data: $OpenApiTs['/api/cards/{cardId}/attachments']['post']['req'],
  ): CancelablePromise<$OpenApiTs['/api/cards/{cardId}/attachments']['post']['res'][200]> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/cards/{cardId}/attachments',
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
        422: StatusCode.s422,
      },
    });
  }

  public update(
    data: $OpenApiTs['/api/attachments/{attachmentId}']['patch']['req'],
  ): CancelablePromise<$OpenApiTs['/api/attachments/{attachmentId}']['patch']['res'][200]> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/attachments/{attachmentId}',
      path: {
        attachmentId: data.attachmentId,
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

  public remove(
    data: $OpenApiTs['/api/attachments/{attachmentId}']['delete']['req'],
  ): CancelablePromise<$OpenApiTs['/api/attachments/{attachmentId}']['delete']['res'][200]> {
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
    });
  }

  public download(
    data: $OpenApiTs['/attachments/{attachmentId}/download/{filename}']['get']['req'],
  ): CancelablePromise<
    $OpenApiTs['/attachments/{attachmentId}/download/{filename}']['get']['res'][200]
  > {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/attachments/{attachmentId}/download/{filename}',
      path: {
        attachmentId: data.attachmentId,
        filename: data.filename,
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

  public thumbnail(
    data: $OpenApiTs['/attachments/{attachmentId}/download/thumbnails/cover-256.{extension}']['get']['req'],
  ): CancelablePromise<
    $OpenApiTs['/attachments/{attachmentId}/download/thumbnails/cover-256.{extension}']['get']['res'][200]
  > {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/attachments/{attachmentId}/download/thumbnails/cover-256.{extension}',
      path: {
        attachmentId: data.attachmentId,
        extension: data.extension,
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
}
