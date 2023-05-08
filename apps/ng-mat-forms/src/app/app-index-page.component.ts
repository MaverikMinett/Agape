import { Component } from "@angular/core";


@Component({
    template: `
        <div class="flex flex-col items-center">
            <div class="rounded overflow-hidden shadow-lg max-w-full w-2/3 bg-slate-100 p-4">
                <h2 class="text-lg">Events</h2>
                <ul>
                    <li class="py-4">
                        <a routerLink="/events-model-service">
                            <div class="text-azule">Events with Model Service</div>
                        </a>
                    </li>
                    <li class="py-4">
                        <a routerLink="/events-reactive-forms">
                            <div class="text-azule">Events with Reactive Forms</div>
                        </a>
                    </li>
                    <!-- <li class="py-4">
                        <a routerLink="/events-template-forms">
                            <div class="text-azule">Template Forms</div>
                        </a>
                    </li> -->
                    <!-- <li class="py-4">
                        <a routerLink="/events">
                            <div class="text-azule">Control Case</div>
                        </a>
                    </li>
                     -->

                </ul>
            </div>

            <div class="my-4">
                <a routerLink="/events/create" class="text-white">New Event</a>
            </div>
        </div>

    `,
    selector: 'app-index-page'
})
export class AppIndexPageComponent {

}