import { Component } from "../lib/decorators";



@Component( {
    'template': `
    <div class="counter text-4xl">Hey There {{ count }} Dracula</div>
    <button id="add-button" class="bg-blue-500 text-white">
        Plick Me
    </button>
    `,
    'selector': 'app-foo',
})
export class FooComponent {
    
    count = 0

}