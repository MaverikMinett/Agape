import { App } from "./app"

let appRoot: any         // ¯\_(ツ)_/¯

/**
 * Load a component into an HTML element
 */
export function bootstrapComponent( div: HTMLElement) {

  const app = new App( div )
  app.draw()

}
