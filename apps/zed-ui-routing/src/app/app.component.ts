import { Component } from "../lib/decorators/component";



@Component( {
    'template': `

    App Component Works

    <router-outlet></router-outlet>

    `,
    'selector': 'app-component',
})
export class AppComponent {
    


}