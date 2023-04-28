import { Component } from "../../lib/decorators/component";



@Component( {
    'template': `
    <div class="counter text-4xl">Hey There {{ count }} Dracula</div>
    <button id="add-button" (click)="increaseCounter()" class="bg-blue-500 text-white">
        Plick Me
    </button>
    <hr/>
    <div style="padding: 8px">
        <a routerLink="/events">Go to events Page</a>
    </div>
    `,
    'selector': 'app-foo',
})
export class FooComponent {
    
    count = 0


    increaseCounter() {
        this.count += 1
        console.log(this.count)
        
    }

}