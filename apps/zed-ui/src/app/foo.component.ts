import { Component } from "../lib/decorators";



@Component( {
    'template': '<div>Hey There {{ count }} Dracula</div>',
    'selector': 'app-foo',
})
export class FooComponent {
    
    count = 0

}