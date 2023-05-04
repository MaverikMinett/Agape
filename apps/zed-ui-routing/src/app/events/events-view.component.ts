import { Component } from "../../lib/decorators/component";



@Component({
    'selector': 'app-events-list',
    template: `
     <div class="rounded overflow-hidden shadow-lg w-full bg-slate-100 p-4" style="width: 400px">
     
     <h2 class="text-xl mb-3">29th Annual Event: Gourmet Gala</h2>

     <div class="-mt-4">
        <a href="/events/record-1/edit" class="text-xs">Edit Event</a>
     </div>
     

    </div>

    <div class="my-4">
        <a routerLink="/" class="p-1 back tracking-wide" style="display: inline-box">❰ Back to Index</a>
    </div>
    `
})
export class EventsViewComponent {

}