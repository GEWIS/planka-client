import type { CancelablePromise } from '../core/CancelablePromise'
import { $OpenApiTs, StatusCode } from '../types'
import { request as __request } from '../core/request'
import { OpenAPI } from '../core/OpenAPI'
import { Planka } from '.'

export class BoardService {
  private planka: Planka

  constructor(planka: Planka) {
    this.planka = planka
  }

  /**
   * @param data The data for the request.
   * @param data.projectId
   * @param data.requestBody
   * @returns SingleResponse<Board> Ok
   * @throws ApiError
   */
  public create(data: $OpenApiTs['/api/projects/{projectId}/boards']['post']['req']): CancelablePromise<$OpenApiTs['/api/projects/{projectId}/boards']['post']['res'][200]> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/projects/{projectId}/managers',
      path: {
        projectId: data.projectId,
      },
      headers: {
        Authorization: `Bearer ${this.planka.getAccessToken()}`,
      },
      errors: {
        400: StatusCode.s400,
        401: StatusCode.s401,
        404: StatusCode.s404,
      },
    })
  }

  public get(data: $OpenApiTs['/api/boards/{boardId}']['get']['req']): CancelablePromise<$OpenApiTs['/api/boards/{boardId}']['get']['res'][200]> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/boards/{projectId}',
      path: {
        projectId: data.boardId,
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

  public update(data: $OpenApiTs['/api/boards/{boardId}']['patch']['req']): CancelablePromise<$OpenApiTs['/api/boards/{boardId}']['patch']['res'][200]> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/boards/{boardId}',
      path: {
        projectId: data.boardId,
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

  public remove(data: $OpenApiTs['/api/boards/{boardId}']['delete']['req']): CancelablePromise<$OpenApiTs['/api/boards/{boardId}']['delete']['res'][200]> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/boards/{boardId}',
      path: {
        boardId: data.boardId,
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

  public addMember(data: $OpenApiTs['/api/boards/{boardId}/memberships']['post']['req']): CancelablePromise<$OpenApiTs['/api/boards/{boardId}/memberships']['post']['res'][200]> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/boards/{boardId}/memberships',
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
        409: StatusCode.s409,
      },
    })
  }

  public updateMember(data: $OpenApiTs['/api/board-memberships/{membershipId}']['patch']['req']): CancelablePromise<$OpenApiTs['/api/board-memberships/{membershipId}']['patch']['res'][200]> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/board-memberships/{membershipId}',
      path: {
        membershipId: data.membershipId,
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

  public removeMember(data: $OpenApiTs['/api/board-memberships/{membershipId}']['delete']['req']): CancelablePromise<$OpenApiTs['/api/board-memberships/{membershipId}']['delete']['res'][200]> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/board-memberships/{membershipId}',
      path: {
        membershipId: data.membershipId,
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