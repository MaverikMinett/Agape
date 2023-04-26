import { Class } from "@agape/types"
import { App } from "./app"

let appRoot: any         // ¯\_(ツ)_/¯

/**
 * Load a component into an HTML element
 */
export function bootstrapComponent( div: HTMLElement, component: Class ) {

  const app = new App( div, component )
  app.draw()

}
