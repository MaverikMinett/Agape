
import { camelize, tokenize, verbalize, classify, pluralize, titalize, quanitfy } from './string'



describe('camelize', () => {

    it('should camelize a string', () => {
        expect( camelize('foo bar') ).toEqual('fooBar')
    })

})



describe('classify', () => {

    it('should classify a string', () => {
        expect( classify('foo bar') ).toEqual('FooBar')
    })

    it('should classify a token', () => {
        expect( classify('foo-bar') ).toEqual('FooBar')
    })

})

describe('pluralize', () => {

    it('should pluralize a string', () => {
        expect( pluralize('foo') ).toEqual('foos')
    })

    it('should pluralize octopus', () => {
        expect( pluralize('octopus') ).toEqual('octopi')
    })

    it('should pluralize city', () => {
        expect( pluralize('city') ).toEqual('cities')
    })
    
    it('should maintain case', () => {
        expect( pluralize('Foo') ).toEqual('Foos')
        expect( pluralize('OctoPus') ).toEqual('OctoPi')
        expect( pluralize('City') ).toEqual('Cities')
    })
})


describe('titalize', () => {

    it('should titalize the string', () => {
        expect( titalize('foo bar') ).toEqual('Foo Bar')
    })
    it('should maintain case after hyphen', () => {
        expect( titalize('foo-bar') ).toEqual('Foo-bar')
    })
    it('should lowercase functional words', () => {
        expect( titalize('hop on pop') ).toEqual('Hop on Pop')
        expect( titalize('ducks in a row') ).toEqual('Ducks in a Row')
        expect( titalize('james and the anteater') ).toEqual('James and the Anteater')
        expect( titalize('the wonderful world of mystery science') ).toEqual('The Wonderful World of Mystery Science')
    })

})

describe('tokenize', () => {

    it('should tokenize the string', () => {
        expect( tokenize('Foo Bar') ).toEqual('foo-bar')
    })

})


describe('verbalize', () => {
    
    it('should verbalize the string', () => {
        expect( verbalize('foo-bar') ).toEqual('Foo bar')
    })

})


describe('quantify', () => {

    let value: number|string;
    let label: string;

    beforeEach( () => {
        value = undefined;
        label = 'cat';
    })

    it('should pluralize the label if < 0', () => {
        value = -1;
        expect( quanitfy(value, label) ).toBe("-1 cats")
    })

    it('should pluralize the label if 0', () => {
        value = 0;
        expect( quanitfy(value, label) ).toBe("0 cats")
    })

    it('should pluralize the label if > 0 and < 1', () => {
        value = 0.5;
        expect( quanitfy(value, label) ).toBe("0.5 cats")
    })

    it('should not pluralize the label if 1', () => {
        value = 1;
        expect( quanitfy(value, label) ).toBe("1 cat")
    })

    it('should pluralize the label if 1.x', () => {
        value = -1;
        expect( quanitfy(value, label) ).toBe("-1 cats")
    })

    it('should pluralize the label if >= 2', () => {
        value = 2;
        expect( quanitfy(value, label) ).toBe("2 cats")

        value = 420;
        expect( quanitfy(value, label) ).toBe("420 cats")
    })

    it('should display formatted numbers', () => {
        value = "05.6";
        expect( quanitfy(value, label) ).toBe("05.6 cats")
    })

    it('should display formatted numbers', () => {
        value = "432.00";
        expect( quanitfy(value, label) ).toBe("432.00 cats")
    })
})