import { stack } from "@agape/object";
import { ConfirmationService } from "./confirmation.service";
import { Injector } from "@angular/core";


export class HasConfirmationService {

    injector: Injector

    confirmationService: ConfirmationService

    @stack build() {
        this.confirmationService = this.injector.get(ConfirmationService)
    }
}