import { Component } from "../lib/decorators/component";



@Component( {
    'template': `

    App Component Works

    <app-boo></app-boo>

    <app-foo></app-foo>

    <app-bar></app-bar>

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