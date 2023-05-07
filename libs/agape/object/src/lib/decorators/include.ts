import { meta } from '../meta'


export function include( ...traits:any ) {

	return function <T extends {new(...args:any[]):{}}>( target:T ) {

		const decorated = meta(target).include( ...traits )

		return decorated

	}
}

