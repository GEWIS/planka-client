import type { CancelablePromise } from '../core/CancelablePromise';
import { $OpenApiTs, StatusCode } from '../types';
import { request as __request } from '../core/request';
import { OpenAPI } from '../core/OpenAPI';
import { Planka } from '.';

export class ProjectService {
  private planka: Planka;
  constructor(planka: Planka) {
    this.planka = planka;
  }

  /**
   * @returns ArrayResponse<Project> Ok
   * @throws ApiError
   */
  public getAll(): CancelablePromise<$OpenApiTs['/api/projects']['get']['res'][200]> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/projects',
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`,
      },
      errors: {
        401: StatusCode.s401,
      },
    });
  }

  /**
   * @param data The data for the request.
   * @param data.requestBody
   * @returns SingleResponse<Project> Ok
   * @throws ApiError
   */
  public create(
    data: $OpenApiTs['/api/projects']['post']['req'],
  ): CancelablePromise<$OpenApiTs['/api/projects']['post']['res'][200]> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/projects',
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`,
      },
      body: data.requestBody,
      errors: {
        400: StatusCode.s400,
        401: StatusCode.s401,
      },
    });
  }

  /**
   * @param data The data for the request.
   * @param data.projectId
   * @param data.requestBody
   * @returns SingleResponse<Project> Ok
   * @throws ApiError
   */
  public get(
    data: $OpenApiTs['/api/projects/{projectId}']['get']['req'],
  ): CancelablePromise<$OpenApiTs['/api/projects/{projectId}']['get']['res'][200]> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/projects/{projectId}',
      path: {
        projectId: data.projectId,
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
   * @param data.projectId
   * @param data.requestBody
   * @returns SingleResponse<Project> Ok
   * @throws ApiError
   */
  public update(
    data: $OpenApiTs['/api/projects/{projectId}']['patch']['req'],
  ): CancelablePromise<$OpenApiTs['/api/projects/{projectId}']['patch']['res'][200]> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/projects/{projectId}',
      path: {
        projectId: data.projectId,
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
   * @param data.projectId
   * @param data.requestBody
   * @returns SingleResponse<Project> Ok
   * @throws ApiError
   */
  public remove(
    data: $OpenApiTs['/api/projects/{projectId}']['delete']['req'],
  ): CancelablePromise<$OpenApiTs['/api/projects/{projectId}']['delete']['res'][200]> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/projects/{projectId}',
      path: {
        projectId: data.projectId,
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
   * @param data.projectId
   * @param data.requestBody
   * @returns SingleResponse<Project> Ok
   * @throws ApiError
   */
  public setBackgroundImage(
    data: $OpenApiTs['/api/projects/{projectId}/background-image']['post']['req'],
  ): CancelablePromise<
    $OpenApiTs['/api/projects/{projectId}/background-image']['post']['res'][200]
  > {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/projects/{projectId}/background-image',
      path: {
        projectId: data.projectId,
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

  /**
   * @param data The data for the request.
   * @param data.projectId
   * @param data.requestBody
   * @returns SingleResponse<ProjectManager> Ok
   * @throws ApiError
   */
  public addManager(
    data: $OpenApiTs['/api/projects/{projectId}/managers']['post']['req'],
  ): CancelablePromise<
    $OpenApiTs['/api/projects/{projectId}/background-image']['post']['res'][200]
  > {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/projects/{projectId}/managers',
      path: {
        projectId: data.projectId,
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
   * @param data.managerId
   * @param data.requestBody
   * @returns SingleResponse<ProjectManager> Ok
   * @throws ApiError
   */
  public removeManager(
    data: $OpenApiTs['/api/project-managers/{managerId}']['delete']['req'],
  ): CancelablePromise<$OpenApiTs['/api/project-managers/{managerId}']['delete']['res'][200]> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/projects/{projectId}/managers',
      path: {
        projectId: data.managerId,
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`,
      },
      errors: {
        400: StatusCode.s400,
        401: StatusCode.s401,
        404: StatusCode.s404,
      },
    });
  }
}
