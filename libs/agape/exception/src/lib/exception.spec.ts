import { Exception } from "./exception"


describe('Exception', () => {

    let e: Exception

    beforeEach( () => {
        e = undefined
    })

    it('should instantiate', () => {
        e = new Exception("Some exception")
        expect(e).toBeInstanceOf(Exception)
    })

    describe('an example', () => {
        it('should throw the error', () => {
            expect( () => { throw new Exception(400) } ).toThrowError()
        })
    })

    describe('constructor overloads', () => {
        describe('message only', () => {
            beforeEach( () => {
                e = new Exception("Some exception")
            })
            it('should have a 400 status code', () => {
                expect(e.status).toBe(400)
            })
            it('should have a Bad Request status text', () => {
                expect(e.statusText).toBe("Bad Request")
            })
            it('should have the specified message', () => {
                expect(e.message).toBe("Some exception")
            })
        })
        describe('status code and message', () => {
            beforeEach( () => {
                e = new Exception(404, "That record was not found")
            })
            it('should have the status code', () => {
                expect(e.status).toBe(404)
            })
            it('should have the status text for the status code', () => {
                expect(e.statusText).toBe("Not Found")
            })
            it('should have the specified message', () => {
                expect(e.message).toBe("That record was not found")
            })
        })
        describe('status code only', () => {
            beforeEach( () => {
                e = new Exception(404)
            })
            it('should have the status code', () => {
                expect(e.status).toBe(404)
            })
            it('should have the status text for the status code', () => {
                expect(e.statusText).toBe("Not Found")
            })
            it('should have the status text as the message', () => {
                expect(e.message).toBe("Not Found")
            })
        })
        describe('status code, stats text, message', () => {
            beforeEach( () => {
                e = new Exception(404, "Silly Not Found", "Gee whiz, can't find that")
            })
            it('should have the status code', () => {
                expect(e.status).toBe(404)
            })
            it('should have the status text for the status code', () => {
                expect(e.statusText).toBe( "Silly Not Found")
            })
            it('should have the status text as the message', () => {
                expect(e.message).toBe("Gee whiz, can't find that")
            })
        })
    })

})