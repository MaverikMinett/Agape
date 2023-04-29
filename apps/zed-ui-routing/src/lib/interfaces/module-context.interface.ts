import { Class } from "@agape/types";
import { Injector } from "../injector";

export interface ModuleContext {
    module: Class;
    injector: Injector;
}
