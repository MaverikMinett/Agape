import { Component } from "../lib/decorators";



@Component( {
    'template': 'Hey There {{ count }} Dracula',
    'selector': 'app-foo',
})
export class FooComponent {
    
    count = 0

}