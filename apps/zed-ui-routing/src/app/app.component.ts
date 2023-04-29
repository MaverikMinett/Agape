import { Component } from "../lib/decorators/component";



@Component( {
    'template': `
    <div>
        <router-outlet></router-outlet>
    </div>
    `,
    'selector': 'app-component',
})
export class AppComponent {
    


}