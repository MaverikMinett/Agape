import { Component } from "@angular/core";


@Component({
    template: `
        <div class="flex flex-col items-center">
            <div class="rounded overflow-hidden shadow-lg max-w-full w-3/5 bg-slate-100 p-4">
                <h2 class="text-lg">DateTime Control</h2>
                <ul>
                    <li class="py-4">
                        <a routerLink="/datetime-control-with-reactive-form">
                            <div class="text-azule mb-2">Datetime Control with a Reactive Form</div>
                            <div class="text-gray-800 text-sm">
                                Example showing the ease of editing a model with a javscript date 
                                property using reactive forms in Angular using the
                                ng-mat-datetime-control component.
                            </div>
                        </a>
                    </li>
                    <li class="py-4">
                        <a routerLink="/datetime-control-with-template-form">
                            <div class="text-azule mb-2">Datetime Control with a Template Form</div>
                            <div class="text-gray-800 text-sm">
                                Example showing the ease of editing a model with a javscript date 
                                property using template based forms in Angular using the
                                ng-mat-datetime-control component.
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