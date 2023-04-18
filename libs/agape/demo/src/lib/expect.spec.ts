

import { AssertionError } from 'assert'
import { Expect } from './expect'

describe('Expect', () => {

    let e: Expect<any>
    let a: any

    beforeEach( () => {
        e = undefined
        a = undefined
    })

    it('should not assert', () => {
        a = true
        e = new Expect(a)
        e.toBe(true)
    })
    describe('toBe', () => {
        it('should assert', () => {
            a = true
            e = new Expect(a)
            try {
                e.toBe(false)
            }
            catch ( error ) {
                expect(error).toBeInstanceOf(AssertionError)
            }
        })
    })
    describe('toEqual', () => {
        it('should not assert', () => {
            a = { 'a': 'foo', 'b': 'bar '}
            e = new Expect(a)
            e.toEqual({ 'a': 'foo', 'b': 'bar '})
        })
        it('should assert', () => {
            a = { 'a': 'foo', 'b': 'bar '}
            e = new Expect({ 'c': 'biz', 'd': 'baz '})
            try {
                e.toEqual(false)
            }
            catch ( error ) {
                expect(error).toBeInstanceOf(AssertionError)
            }
        })
    })
    describe('toBeTruthy', () => {
        it('should not assert', () => {
            a = { 'a': 'foo', 'b': 'bar '}
            e = new Expect(a)
            e.toBeTruthy()
        })
        it('should assert', () => {
            a = false
            e = new Expect(a)
            try {
                e.toBeTruthy()
            }
            catch ( error ) {
                expect(error).toBeInstanceOf(AssertionError)
            }
        })
    })
    describe('toBeFalsy', () => {
        it('should not assert', () => {
            a = false
            e = new Expect(a)
            e.toBeFalsy()
        })
        it('should assert', () => {
            a = { 'a': 'foo', 'b': 'bar '}
            e = new Expect(a)
            try {
                e.toBeFalsy()
            }
            catch ( error ) {
                expect(error).toBeInstanceOf(AssertionError)
            }
        })
    })
    describe('toBeInstanceOf', () => {
        it('should assert', () => {
            class Foo { }
            class Bar { }
            a = new Foo()
            e = new Expect(e)
            try {
                e.toBeInstanceOf(Bar)
            }
            catch ( error ) {
                expect(error).toBeInstanceOf(AssertionError)
            }
        })
        it('should not assert', () => {
            class Foo { }
            class Bar { }
            a = new Foo()
            e = new Expect(e)
            try {
                e.toBeInstanceOf(Foo)
            }
            catch ( error ) {
                expect(error).toBeInstanceOf(AssertionError)
            }
        })
    })
})