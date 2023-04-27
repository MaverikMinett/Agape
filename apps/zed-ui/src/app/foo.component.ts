import { Component } from "../lib/decorators";



@Component( {
    'template': 'Hey There {{count}}',
    'selector': 'app-foo',
})
export class FooComponent {
    
    count: 0

}