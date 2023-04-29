import { Class } from "@agape/types";
import { Service } from "./decorators/service";

export interface ServiceProvider {
    useClass?: Class;
    useValue?: any;
}

export class Injector {

    instances = new Map<Class, object>

    providers = new Map<Class, ServiceProvider>

    constructor( public parent?: Injector ) {

    }

    provide<T extends Class>( token: T ): void
    provide<T extends Class>( token: T, value: any ): void
    provide<T extends Class>( token: T, value?: any ): void {
        if ( ! value ) value = { useClass: token }
        else value = { useValue: value }
        this.providers.set(token, value)

        console.log(`Providing ${token.name}`)
        console.log(this.providers.get(token))
    }

    get<T extends Class>( token: T ): InstanceType<T> {

        const instance = this.instances.get( token )

        if ( instance !== undefined ) return instance as InstanceType<T>

        const provider = this.providers.get(token)

        if ( provider ) {
            if ( provider.useValue ) {
                this.instances.set( token, provider.useValue )
                return provider.useValue
            }
            if ( provider.useClass ) {
                const useClass = provider.useClass
                const instance = new useClass()
                this.instances.set( token, instance )
                return instance
            }
        }

        return this.parent.get(token)
    }


}