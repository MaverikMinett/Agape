
import { DateSerializer } from './date.serializer'

describe('DateSerializer', () => {

    let s: DateSerializer
    let d: Date

    beforeEach( () => {
        s = undefined
        d = undefined
    })

    it('should instantiate', () => {
        s = new DateSerializer()
    })

    it('should deflate a date as an iso string', () => {
        s = new DateSerializer()
        d = new Date()
        expect(s.deflate(d)).toEqual(d.toISOString())
    })

    it('should inflate a date from an iso string', () => {
        s = new DateSerializer()
        d = new Date()
        const str = d.toISOString()
        expect(s.inflate(str).toISOString()).toEqual(d.toISOString())
    })


})