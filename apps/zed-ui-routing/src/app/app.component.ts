import { Component } from "../lib/decorators/component";



@Component( {
    'template': `

    Foo:

    <app-foo></app-foo>
    `,
    'selector': 'app-component',
})
export class AppComponent {
    
    count = 0


    increaseCounter() {
        this.count += 1
        console.log(this.count)
        
    }

}