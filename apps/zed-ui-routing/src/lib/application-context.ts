
import { Subject } from 'rxjs'
import { Service } from './decorators/service'

@Service()
export class ApplicationContext {


    readySubject = new Subject<boolean>()

    ready() {
        return this.readySubject.asObservable()
    }

    isReady( ) {
        this.readySubject.next(true)
        this.readySubject.complete()
    }
}