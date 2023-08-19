import { ApiRequest } from "../api-request";
import { ApiResponse } from "../api-response";
import { NextFunction } from "../types";


export interface Middleware {
    activate( request: ApiRequest, response: ApiResponse, next: NextFunction ): Promise<void> 
}