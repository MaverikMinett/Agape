import { include } from "@agape/object";
import { Class } from "@agape/types"

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
