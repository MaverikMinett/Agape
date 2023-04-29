import { Component } from "../lib/decorators/component";



@Component( {
    'template': `

    App Component Works

    <div>
        <a [routerLink]="/boo">To Boo</a>
    </div>
    
    <div>
        <router-outlet></router-outlet>
    </div>
    `,
    'selector': 'app-component',
})
export class AppComponent {
    


}