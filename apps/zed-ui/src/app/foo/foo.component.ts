import { Component } from '../../lib/ui/component';
import { On } from '../../lib/ui/decorators'
// import template from './foo.template.html'; 

const template = `
<div class="counter text-4xl">
  {{ count }}
</div>

<button id="add-button" class="bg-blue-500 text-white">
  Plick Me
</button>
`

@Component({
  selector: `ag-foo-component`,
  template,
})
export class FooComponent {

  name: string = 'Barry Bannelope';

  count: number = 1

  @On('#add-button', 'click')
  showAlert(){
    this.count += 1
  }
  
}
