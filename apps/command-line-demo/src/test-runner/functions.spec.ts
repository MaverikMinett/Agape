import * as fnc from './functions'
import { activeTestSuite } from './private'

describe('describe', () => {
    it('should call describe on the active test suite', () => {
        fnc.describe('FooBar', () => {
            fnc.it('should create a test', () => {

            })
        })
        expect( activeTestSuite().suites.length ).toBe(1)
        expect( activeTestSuite().suites[0].tests.length ).toBe(1)
    })
})