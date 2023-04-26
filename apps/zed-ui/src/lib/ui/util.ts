// import * as handlebars from 'handlebars';
import { EventBinding } from './types';


let appRoot: any         // ¯\_(ツ)_/¯

/**
 * Load a component into an HTML element
 */
export function bootstrapComponent(component: any, div: HTMLElement) {
  appRoot = div
  const componentInstance = buildComponent(component);
  drawComponent(componentInstance, div)
}

/**
 * Just redraw the component.
 */
export function detectChanges(componentInstance: any ) {
  drawComponent(componentInstance, appRoot)
}

/**
 * Create an HTML dom element from a string
 */
export function newHtmlElement(html: string) {
  var template = document.createElement('template');
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
}

/**
 * Create an instance of a component
 */
export function buildComponent(component: { new (...args: any[]): any }) {
  const componentTemplate = component['ɑparams']['template'];
  const componentSelector = component['ɑparams']['selector'];

  const completeTemplate = `<${componentSelector}>
    ${componentTemplate}
  </${componentSelector}>`;

  const instance = new component();
  instance['ɑɑtemplate'] = completeTemplate
  // instance['ɑɑcompiledTemplate'] = handlebars.compile(completeTemplate);
  return instance;
}

/**
 * Bind a component method to an html event
 */
export function bindEvent( 
  componentInstance: any, 
  elementSelector: string, 
  event: string, 
  method: string) {

    // select the element
    const host: HTMLElement = componentInstance['ɑɑnativeElement']
    const element = host.querySelector(elementSelector)
    

    // throw an error if the element doesn't exist
    if ( ! element ) {
      const component = Object.getPrototypeOf(componentInstance).constructor
      const componentSelector = component['ɑparams']['selector']
      throw new Error(`Could not find element matching ${elementSelector} in component ${componentSelector}`)
    }

    // bind the method to the event
    element.addEventListener(event, () => {
      componentInstance[method].call(componentInstance)
      detectChanges(componentInstance)
    })
}

/**
 * Apply all html event bindings for the component to the component instance
 */
export function applyBindings( componentInstance: any ) {
  const prototype = Object.getPrototypeOf(componentInstance)

  for ( let binding of prototype['ɑbindings'] as EventBinding[] ) {
    bindEvent(
      componentInstance, 
      binding.elementSelector,
      binding.event,
      binding.method
    )
  }
}

/**
 * Instantiate and draw a component to the view
 */
export function renderComponent(component: any, div: HTMLElement) {
  const componentInstance = buildComponent(component);
  drawComponent(componentInstance, div)
}

/**
 * Draw the component to the view, interpolating component variables via
 * the template and applying event bindings.
 */
export function drawComponent( componentInstance:any, div: HTMLElement ) {
  // const renderedTemplate  = componentInstance['ɑɑcompiledTemplate'](componentInstance);
  
  const renderedComponent = newHtmlElement(componentInstance.ɑɑtemplate);
  div.innerHTML = '';

  div.appendChild(renderedComponent);
  if ( componentInstance['count'] === 8 ) alert('Call now') // 🐣

  const nativeElement = renderedComponent;
  componentInstance['ɑɑnativeElement'] = nativeElement;

  applyBindings(componentInstance)
}

