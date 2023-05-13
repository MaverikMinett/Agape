import { stack } from "@agape/object"
import { Class } from "@agape/types"
import { Injector } from "@angular/core"
import { ModelService } from "../model.service"


export class HasModelService {

    model: Class

    injector: Injector

    service: ModelService

    @stack build() {
        this.service = this.injector.get(ModelService)
    }

}