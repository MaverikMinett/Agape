
import { Subject, Subscription } from 'rxjs';
import { tie } from './tie';


class Component {

    onDestroy() {

    }
}


describe('tie', () => {

    let c: Component
    let $: any                     // expose private properties

    let subject: Subject<any>
    let s: Subscription

    beforeEach( () => {
        c = new Component()
        $ = c
        subject = new Subject()
        s = subject.subscribe()
    } )

    it('should have no tied subscriptions', () => {
        expect('ʘtiedSubscriptions' in $).toBe(false)
    })

    it('should add a subscription to the tied subscriptions', () => {
        tie( c, 'onDestroy', s )

        expect($.ʘtiedSubscriptions).toEqual({
            onDestroy: [ s ]
        })
    })

    it('should multiple subscriptions to the tied subscriptions', () => {
        const s2 = subject.subscribe()
        tie( c, 'onDestroy', s, s2 )

        expect($.ʘtiedSubscriptions).toEqual({
            onDestroy: [ s, s2 ]
        })
    })

    it('should call unsubscribe on the tied subscription', () => {
        tie( c, 'onDestroy', s )

        jest.spyOn( s, 'unsubscribe' )
        c.onDestroy()
        expect( s.unsubscribe ).toHaveBeenCalled()
    })

    it('should call unsubscribe on multiple tied subscription', () => {
        const subscriptions = [1,2,3].map( n => subject.subscribe() )

        tie( c, 'onDestroy', ...subscriptions )

        subscriptions.map( s => jest.spyOn( s, 'unsubscribe' ) )

        c.onDestroy()

        subscriptions.map( s => expect( s.unsubscribe ).toHaveBeenCalled() )
    })

    it('should remove the tied subscription', () => {
        tie( c, 'onDestroy', s )
        c.onDestroy()
        expect( $.ʘtiedSubscriptions['onDestroy'] ).toEqual([])
    })
})