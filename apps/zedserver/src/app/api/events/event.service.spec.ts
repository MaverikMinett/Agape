
import { EventService } from './event.service'

describe('EventService', () => {

    let s: EventService

    beforeEach( () => {
        s = undefined
    })

    it('should instantiate', () => {
        s = new EventService()
        expect( s ).toBeInstanceOf(EventService)
    })

    describe('list', () => {
        it('should exist', () => {
            s = new EventService()
            expect(s.list).toBeInstanceOf(Function)
        })
    })

    describe('create', () => {
        it('should exist', () => {
            s = new EventService()
            expect(s.list).toBeInstanceOf(Function)
        })
    })

    describe('retrieve', () => {
        it('should exist', () => {
            s = new EventService()
            expect(s.list).toBeInstanceOf(Function)
        })
    })

    describe('update', () => {
        it('should exist', () => {
            s = new EventService()
            expect(s.list).toBeInstanceOf(Function)
        })
    })
    
    describe('delete', () => {
        it('should exist', () => {
            s = new EventService()
            expect(s.list).toBeInstanceOf(Function)
        })
    })
})