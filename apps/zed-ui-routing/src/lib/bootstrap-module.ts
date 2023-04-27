import { Class } from "@agape/types"
import { App } from "./app"


/**
 * Load a component into an HTML element
 */
export function bootstrapModule( div: HTMLElement, module: Class ) {

  const app = new App( div, module )


}
