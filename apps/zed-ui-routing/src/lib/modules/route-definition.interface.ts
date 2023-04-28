import { Class } from "@agape/types";


export interface RouteDefinition {
    path: string;
    component?: Class;
}