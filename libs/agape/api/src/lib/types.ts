import { ApiRequest } from './api-request';
import { ApiResponse } from './api-response';
import { ControllerDescriptor } from './descriptors';

export type HttpMethod = 'put'|'post'|'get'|'patch'|'delete';


export type ControllerParams = Partial<Omit<ControllerDescriptor,'actions'|'services'>>

export type NextFunction = ( request?: ApiRequest, response?: ApiResponse, next?: NextFunction ) => Promise<void>

// // // TODO: Replace all of the above with this?
export type AssetDescriptionFunction<T,U> = ( progenitor: T, item: U ) => string
