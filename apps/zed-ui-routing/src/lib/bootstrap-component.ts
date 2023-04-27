import { Class } from "@agape/types"
import { App } from "./app"


/**
 * Load a component into an HTML element
 */
export function bootstrapComponent( div: HTMLElement, component: Class ) {

  const app = new App( div )
  app.bootstrapComponent(component)

}
