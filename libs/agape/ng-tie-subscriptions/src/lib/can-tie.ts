
import { stack } from '@agape/object';
import { Dictionary } from '@agape/types';
import { Directive } from '@angular/core';
import { Subscription } from 'rxjs';


@Directive()
export class CanTie {

    ʘtiedSubscriptions: Dictionary<Subscription[]>

    tie( ...subscriptions:Subscription[] ) {
        this.ʘtiedSubscriptions ??= {}
    
        if ( ! this.ʘtiedSubscriptions['ngOnDestroy'] ) {
            this.ʘtiedSubscriptions['ngOnDestroy'] = [] as Subscription[]
        }
    
        this.ʘtiedSubscriptions['ngOnDestroy'].push(...subscriptions)
    }

    @stack ngOnDestroy() {
        this.ʘtiedSubscriptions['ngOnDestroy'].forEach( s => s.unsubscribe() )
        this.ʘtiedSubscriptions['ngOnDestroy'] = []
    }

}