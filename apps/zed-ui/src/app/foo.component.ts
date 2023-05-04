import { Component } from "../lib/decorators";



@Component( {
    template: `
    <div class="counter text-4xl">Hey There {{ count }} Dracula</div>
    <button id="add-button" (click)="increaseCounter()" class="bg-blue-500 text-white">
        Plick Me
    </button>
    `,
    selector: 'app-foo',
})
export class FooComponent {
    
    count = 0

    increaseCounter() {
        this.count += 1
        console.log(this.count)
        
    }

}