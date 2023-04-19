

import { CliElement } from './element'


describe('keypress', () => {

    let e: CliElement

    it('should instantiate',() => {
        e = new CliElement()
        expect(e).toBeInstanceOf(CliElement)
    })

    describe('run', () => {
        it('should have a run method', () => {
            e = new CliElement()
            expect(e.run).toBeInstanceOf(Function)
        })
        it('should call the render method', () => {
            const f: any = e
            jest.spyOn(f,'render')
            e.run()
            expect(f.render).toHaveBeenCalled()
        })
    })

    describe('render', () => {
        it('should draw the control', () => {
            e = new CliElement()
            jest.spyOn( (e as any),'drawElement')
            e.run()
            expect((e as any).drawElement).toHaveBeenCalled()
        })
    })
})