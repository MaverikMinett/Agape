import { Component } from "../lib/decorators/component";



@Component( {
    'template': `

    <div style="padding: 16px">
        <a routerLink="/foo">Foo Component</a>
    </div>
    `,
    'selector': 'app-foo',
})
export class AppComponent {
    
    count = 0


    increaseCounter() {
        this.count += 1
        console.log(this.count)
        
    }

}