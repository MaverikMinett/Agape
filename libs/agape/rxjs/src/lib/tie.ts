
import { Subscription } from 'rxjs';
import { meta } from '@agape/object';

export function tie( target:any, method:string, ...subscriptions:Subscription[] ) {

    target.ʘtiedSubscriptions ??= {}

    if ( ! target.ʘtiedSubscriptions[method] ) {
        target.ʘtiedSubscriptions[method] = [] as Subscription[]

        // add a 'stack' method modifier which will call unsubscribe on all tied
        // subscriptions when the target is destroyed
        meta(target).method(method).stack( () => {
            target.ʘtiedSubscriptions[method].forEach( s => s.unsubscribe() )
            // empty the list of tied subscriptions which were just unbsubscribed
            target.ʘtiedSubscriptions[method] = []
        } )
    }

    target.ʘtiedSubscriptions[method].push(...subscriptions)

}