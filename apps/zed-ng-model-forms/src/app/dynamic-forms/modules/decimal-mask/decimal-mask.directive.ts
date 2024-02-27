import { DecimalPipe } from "@angular/common";
import { Directive, ElementRef, HostListener, Input, Renderer2, SimpleChanges } from "@angular/core";
import { NgControl } from "@angular/forms";



@Directive({
    selector: 'input[decimals]'
})
export class DecimalMaskDirective {

    @Input() decimals: number
    @Input() input: number    /* work around to reformat the field when the value changes */

    constructor(
        public model: NgControl, 
        public element: ElementRef, 
        public renderer: Renderer2,
        public pipe: DecimalPipe) {
    }

    // ngAfterViewChecked() {
    //     this.formatValue(this.model.value)
    // }

    // ngOnChanges(changes: SimpleChanges) {
    //     if('input' in changes) {
    //         setTimeout( () => {
    //             this.formatValue(this.model.value)
    //         })
    //     }
    // }

    ngOnInit() {
        setTimeout( () => {
            this.formatValue(this.model.value)
        })
    }

    @HostListener('change')
    onInputChange() {
        this.formatValue(this.model.value)
    }

    formatValue(value: number|null|undefined) {
        if (value !== null && value !== undefined
            && this.decimals !== null && this.decimals !== undefined) {

            const formattedValue = this.pipe.transform(value, `1.${this.decimals}-${this.decimals}`)
            this.renderer.setProperty(this.element.nativeElement, 'value', formattedValue)
        }
    }

}