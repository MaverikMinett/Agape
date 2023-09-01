import { ApiRequest } from './api-request';
import { ApiResponse } from './api-response';
import {
    ActionDescriptor, ControllerDescriptor,
    OperationDescriptor,
    ResponseDescriptor
} from './descriptors';

export type HttpMethod = 'put'|'post'|'get'|'patch'|'delete';

export type ActionDescriptionFunction<T=any> = (progenitor: T, action: ActionDescriptor) => string
export type ActionDescription = string|ActionDescriptionFunction

export type OperationDescriptionFunction<T=any> = (progenitor: T, operation: OperationDescriptor) => string
export type OperationDescription = string|OperationDescriptionFunction

export type ResponseDescriptionFunction<T=any> = (progenitor: T, response: ResponseDescriptor) => string
export type ResponseDescription = string|ResponseDescriptionFunction

export type ControllerParams = Partial<Omit<ControllerDescriptor,'actions'|'services'>>

export type NextFunction = ( request?: ApiRequest, response?: ApiResponse, next?: NextFunction ) => Promise<void>

// // // TODO: Replace all of the above with this?
export type AssetDescriptionFunction<T,U> = ( progenitor: T, item: U ) => string
