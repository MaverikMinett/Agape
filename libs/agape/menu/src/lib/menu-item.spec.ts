
import { MenuItem } from './menu-item'

describe('MenuItem', () => {

    let mi: MenuItem 

    it('should instantiate', () => {
        mi = new MenuItem("Foo Item")
        expect(mi).toBeInstanceOf(MenuItem)
    })

    describe('constructor', () => {
        describe('argument overloads', () => {
            describe('label only',() => {
                beforeEach( () => {
                    mi = new MenuItem("Foo Item") 
                })
                it('should have the correct label', () => {
                    expect(mi.label).toBe("Foo Item")
                })
                it('should have no action', () => {
                    expect(mi.action).toBe(undefined)
                })
                it('should have no indicator', () => {
                    expect(mi.indicator).toBe(undefined)
                })
            })
            describe('label and action',() => {
                let action = () => console.log("Foo action")
                beforeEach( () => {
                    mi = new MenuItem("Foo Item", action) 
                })
                it('should have the correct label', () => {
                    expect(mi.label).toBe("Foo Item")
                })
                it('should have the action', () => {
                    expect(mi.action).toBe(action)
                })
                it('should have no indicator', () => {
                    expect(mi.indicator).toBe(undefined)
                })
            })
            describe('label and params',() => {
                const params = { indicator: "❯"}
                beforeEach( () => {
                    mi = new MenuItem("Foo Item", params) 
                })
                it('should have the correct label', () => {
                    expect(mi.label).toBe("Foo Item")
                })
                it('should have no action', () => {
                    expect(mi.action).toBe(undefined)
                })
                it('should have the indicator', () => {
                    expect(mi.indicator).toBe("❯")
                })
            })
            describe('label, action, and params',() => {
                let action = () => console.log("Foo action")
                const params = { indicator: "❯" }
                beforeEach( () => {
                    mi = new MenuItem("Foo Item", action, params) 
                })
                it('should have the correct label', () => {
                    expect(mi.label).toBe("Foo Item")
                })
                it('should have the action', () => {
                    expect(mi.action).toBe(action)
                })
                it('should have the indicator', () => {
                    expect(mi.indicator).toBe("❯")
                })
            })
            describe('params overrides other constructor args', () => {

                it('should have label and action from params', () => {
                    let action = () => console.log("Foo action")
                    
                    const params = { 
                        indicator: "❯",
                        label: "Bar Item",
                        action: () => console.log("Bar action")
                    }

                    mi = new MenuItem("Foo Item", action, params) 
                    expect(mi.label).toBe(params.label)
                    expect(mi.action).toBe(params.action)
                })

            })
        })
    })

    describe('execute', () => {
        beforeEach( () => {
            mi = new MenuItem("Foo Item") 
        })

        it('should increment the counter', () => {
            let counter = 0
            const action = () => counter++
            mi = new MenuItem("Foo Item", action)
            mi.execute()
            expect(counter).toBe(1)
        })
    })

})

