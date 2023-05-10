import { Component } from "@angular/core";


@Component({
    template: `
        <div class="flex flex-col items-center">
            <div class="rounded overflow-hidden shadow-lg max-w-full w-840 bg-slate-100 p-4">
                <h2 class="text-lg">Events</h2>
                
                <ul>
                    <li class="py-4">
                        <a routerLink="/events-template-forms">
                            <div class="text-azule mb-2">Events with ModelService, Template Form</div>
                            <div class="text-sm text-gray-800">
                                Uses the ModelService and a template based form to edit events.
                            </div>
                        </a>
                    </li>

                    <li class="py-4">
                        <a routerLink="/events-model-service">
                            <div class="text-azule mb-2">Events with ModelService, Reactive Form</div>
                            <div class="text-sm text-gray-800">
                                Uses ModelService instead of EventService to retrieve records from the API
                                which are then inflated into actual Event objects. Also uses the 
                                ng-mat-datetime-control form control which handles datetime objects directly.
                            </div>
                        </a>
                    </li>

                    <li class="py-4">
                        <a routerLink="/events-reactive-forms">
                            <div class="text-azule mb-2">Events with EventService, Reactive Forms</div>
                            <div class="text-sm text-gray-800">
                                Uses an EventService which returns plain old javscript objects from the 
                                Events API. Uses the &backprime;IEventDto&backprime; interface to describe
                                these objects and performs type translation between dates and strings in 
                                the component.
                            </div>
                        </a>
                    </li>

                </ul>
            </div>


        </div>

    `,
    selector: 'app-index-page'
})
export class AppIndexPageComponent {

}