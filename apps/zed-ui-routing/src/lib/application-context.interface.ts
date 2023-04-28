import { Class } from "@agape/types";
import { Router } from "./router";


export interface ApplicationContext {
    router: Router

    changeComponentBecauseOfRouter :( component: Class ) => void
}