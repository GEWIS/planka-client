import type { CancelablePromise } from './core/CancelablePromise';
import { OpenAPI } from './core/OpenAPI';
import { request as __request } from './core/request';
import {$OpenApiTs, NotFoundError, SingleResponse, UnauthorizedError, User} from './types';

export class PlankaService {

    /**
     * @returns User Ok
     * @throws ApiError
     */
    public static getUsers()
      : CancelablePromise<$OpenApiTs['/users']['get']['res'][200]> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users',
            errors: {
                404: 'User not found'
            }
        });
    }

    /**
     * @param data The data for the request.
     * @param data.requestBody
     * @returns User Ok
     * @throws ApiError
     */
    public static createUser(data: $OpenApiTs['/users']['post']['req'])
      : CancelablePromise<$OpenApiTs['/users']['post']['res'][200]> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users',
            body: data.requestBody,
            errors: {
                404: 'User not found'
            }
        });
    }

    /**
     * @param data The data for the request.
     * @param data.userId
     * @returns User Ok
     * @throws ApiError
     */
    public static getUser(data: $OpenApiTs['/users/{userId}']['get']['req']) : CancelablePromise<$OpenApiTs['/users/{userId}']['get']['res'][200]> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/{userId}',
            path: {
                userId: data.userId
            },
            errors: {
                401: 'Unauthorized',
                404: 'User not found'
            },
        });
    }

    /**
     * @param data The data for the request.
     * @param data.userId
     * @param data.requestBody
     * @returns User Ok
     * @throws ApiError
     */
    public static updateUser(data: $OpenApiTs['/users/{userId}']['patch']['req']) : CancelablePromise<$OpenApiTs['/users/{userId}']['patch']['res'][200]> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/{userId}',
            path: {
                userId: data.userId,
            },
            body: data.requestBody,
            errors: {
                400: 'Invalid request body',
                401: 'Unauthorized',
                404: 'User not found'
            },
        });
    }

    /**
     * @param data The data for the request.
     * @param data.userId
     * @param data.requestBody
     * @returns User Ok
     * @throws ApiError
     */
    public static deleteUser(data: $OpenApiTs['/users/{userId}']['delete']['req']) : CancelablePromise<$OpenApiTs['/users/{userId}']['delete']['res'][200]> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/{userId}',
            path: {
                userId: data.userId
            },
            errors: {
                401: 'Unauthorized',
                404: 'User not found'
            },
        });
    }
}