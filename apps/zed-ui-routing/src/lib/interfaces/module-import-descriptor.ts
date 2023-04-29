import { Class } from "@agape/types";
import { RouteDefinition } from "../modules/router/route-definition.interface";

export interface ModuleImportDescriptor {
    module?: Class;
    routes?: RouteDefinition[]
    provides?: Class[]
}
