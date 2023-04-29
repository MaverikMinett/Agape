import { Component } from "../../lib/decorators/component";



@Component({
    'selector': 'app-events-index',
    template: `
     <div class="rounded overflow-hidden shadow-lg w-full bg-slate-100 p-4" style="width: 400px">
     
     <h2 class="text-xl mb-3">Events Index</h2>

    <ul>
        <li><a routerLink="/events">View Events</a></li>
        <li><a routerLink="/events/create">Create Event</li>
    </ul>

    </div>

    
    `
})
export class EventsIndexComponent {

}