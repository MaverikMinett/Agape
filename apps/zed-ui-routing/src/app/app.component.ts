import { Component } from "../lib/decorators/component";



@Component( {
    'template': `

    App Component Works

    <app-foo></app-foo>

    <app-bar></app-bar>

    <router-outlet></router-outlet>
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