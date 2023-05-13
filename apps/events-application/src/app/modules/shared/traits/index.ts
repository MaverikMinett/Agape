import { Class, include } from "@agape/object";

export function Traits( ...traits: Class[] ) {
    return include( ...traits )
}