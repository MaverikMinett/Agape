
import { meta } from "../lib/meta"



describe('transient methods', () => {

    it('should call all methods', () => {

        class AClass {
            aCalled:number = 0
        
            foo() {
                this.aCalled++
            }
        }
        
        class BClass extends AClass {
            bCalled:number = 0
        }
        
        meta(BClass).method('foo').stack( function() { this.bCalled++ } )

        const o = new BClass()
        o.foo()
        expect(o.aCalled).toBe(1)
        expect(o.bCalled).toBe(1)
    })

    it('should correctly call super methods', () => {

        class AClass {
            aCalled:number = 0
        
            foo() {
                this.aCalled++
            }
        }

        class BClass extends AClass {
            bCalled:number = 0

            foo() {
                super.foo()
                this.bCalled++
            }
        }
        
        class CClass extends BClass {
            cCalled:number = 0
        }
        
        meta(CClass).method('foo').stack( function() { this.cCalled++ } )

        const o = new CClass()
        o.foo()
        expect(o.aCalled).toBe(1)
        expect(o.bCalled).toBe(1)
        expect(o.cCalled).toBe(1)
    })

})



