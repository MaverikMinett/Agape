import { tie } from './tie';
import { timer } from 'rxjs';


class Foo {

    constructor( ) {
        tie( this, 'ngOnDestroy', 
            timer(1000).subscribe( n => console.log(n) )
        )
    }

    destroy() {
        console.log( "Destroying foo" )
    }
}

const o = new Foo()
setTimeout( () => o.destroy(), 10000)