
import { Menu } from './menu'
import { MenuItem } from './menu-item'

describe('Menu', () => {

    let m: Menu
    beforeEach( () => {
        m = undefined
    })

    it('should instantiate', () => {
        m = new Menu()
        expect(m).toBeInstanceOf(Menu)
    })

    describe('item', () => {
        it('should create a new menu item', () => {
            m = new Menu()
            m.item("Foo Item")
            expect(m.items.length).toBe(1)
        })
        it('should return this', () => {
            m = new Menu()
            expect(m.item("Foo Item")).toBe(m)
        })
        describe('ways to call it', () => {
            beforeEach( () => m = new Menu )
            it('label only', () => {
                m.item('Foo Item')
            })
            it('label and action', () => {
                m.item('Foo Item', () => console.log("action") )
            })
            it('label and params', () => {
                m.item('Foo Item', { "indicator" : "o" } )
            })
            it('label, action, and params', () => {
                m.item('Foo Item', () => console.log("action"), { "indicator" : "o" }  )
            })
        })
    })

    describe('selectedItem', () => {
        it('should return the selected item', () => {
            m = new Menu().item("Foo Item").item("Bar Item")
            m.selectedIndex = 1
            expect(m.selectedItem).toBe(m.items[1])
        })
        it('should return undefined if selected index is -1', () => {
            m = new Menu().item("Foo Item").item("Bar Item")
            m.selectedIndex = -1
            expect(m.selectedItem).toBe(undefined)
        })
    })

    describe('selectItem', () => {
        beforeEach( () => m = new Menu().item("Foo Item").item("Bar Item") )
        it('should select an item', () => {
            m.selectItem(m.items[1])
            expect(m.selectedItem).toBe(m.items[1])
        })
        it('should set the selected index', () => {
            m.selectItem(m.items[1])
            expect(m.selectedIndex).toBe(1)
        })
        it('should return this', () => {
            expect(m.selectItem(m.items[1])).toBe(m)
        })
        it('should throw an error if not a menu item', () => {
            const notAnItem = new MenuItem("Not on the menu")
            expect(() => m.selectItem(notAnItem)).toThrowError()
        })
        it('should set the selected index to -1 if undefined', () => {
            m.selectItem(undefined)
            expect(m.selectedIndex).toBe(-1)
        })
    })

    describe('selectIndex', () => {
        beforeEach( () => m = new Menu().item("Foo Item").item("Bar Item") )
        it('should set the selected index', () => {
            m.selectIndex(1)
            expect(m.selectedIndex).toBe(1)
        })
        it('should throw an error if index is higher than elements', () => {
            expect( () => m.selectIndex(2) ).toThrowError()
        })
        it('should throw an error if index is lower than -1', () => {
            expect( () => m.selectIndex(-2) ).toThrowError()
        })
        it('should accept -1', () => {
            m.selectIndex(-1)
            expect(m.selectedIndex).toBe(-1)
        })

        it('should return this', () => {
            expect(m.selectIndex(1)).toBe(m)
        })
    })

    describe('execute', () => {

        let foo = 0
        let bar = 0

        beforeEach( () => {
            foo = 0
            bar = 0
            m = new Menu()
            .item("Foo Item", () => foo++)
            .item("Bar Item", () => bar++)

        })
        it('execute the foo item', () => {
            m.selectIndex(0)
            jest.spyOn(m.items[0],'execute')
            m.execute()
            expect(m.items[0].execute).toHaveBeenCalled()
        })
        it('execute the bar item', () => {
            m.selectIndex(1)
            jest.spyOn(m.items[1],'execute')
            m.execute()
            expect(m.items[1].execute).toHaveBeenCalled()
        })

    })
})