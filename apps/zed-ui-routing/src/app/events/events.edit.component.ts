import { Component } from "../../lib/decorators/component";



@Component({
    'selector': 'app-events-list',
    template: `
     <div class="rounded overflow-hidden shadow-lg w-full bg-slate-100 p-4" style="width: 400px">
     
     <h2 class="text-xl mb-3">Edit/Create Event</h2>

    </div>
    <div class="my-3">
        <a routerLink="/" class="p-1" style="display: inline-box">❰ Back to Index</a>
    </div>
    `
})
export class EventsEditComponent {

}