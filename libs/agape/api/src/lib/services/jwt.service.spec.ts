
import { JwtService } from './jwt.service'

describe('JwtService', () => {
    let s: JwtService
    let payload = { username: 'foo' }
    beforeEach( () => {
        s = undefined
    })
    it('should instantiate', () => {
        s = new JwtService()
        expect(s).toBeTruthy()
    })
    it('should create a token', () => {
        s = new JwtService()
        const jwt = s.sign(payload, 'secret')
        const [ encodedHeader, encodedPayload, encodedSignature ] = jwt.split('.')
        expect( encodedHeader ).toBeTruthy()
        expect( encodedPayload ).toBeTruthy()
        expect( encodedSignature ).toBeTruthy()
    })
    it('should verify the token', () => {
        s = new JwtService()
        const jwt = s.sign(payload, 'secret')
        const p = s.verify(jwt, 'secret')
        expect(p).toEqual(payload)
    })
})