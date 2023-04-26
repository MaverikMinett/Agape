export interface EventBinding {
  elementSelector: string; // #id, .class-name, etc
  event: string; // click, submit, mouseover, etc
  method: string; // method to call on component
}
