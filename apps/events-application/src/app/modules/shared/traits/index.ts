import { Class, include } from "@agape/object";

export function Traits( ...traits: Class[] ) {
    return include( ...traits )
}

/* Angular */
export * from './has-http-client'
export * from './has-router'

/* Models */
export * from './has-model-service'

/* Material */
export * from './has-dialog'
export * from './has-snackbar'
