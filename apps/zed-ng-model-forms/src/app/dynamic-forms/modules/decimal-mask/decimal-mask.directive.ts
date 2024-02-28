import { DecimalPipe } from "@angular/common";
import { Directive, ElementRef, HostListener, Input, Renderer2, SimpleChanges } from "@angular/core";
import { NgControl } from "@angular/forms";
import { AugmentedAbstractControl } from "../../types/augmented-abstract-control";

@Directive({
    selector: 'input[decimals]'
})
export class DecimalMaskDirective {

    @Input() decimals: number
    @Input() input: number    /* work around to reformat the field when the value changes */

    private regex: RegExp

    constructor(
        public model: NgControl, 
        public element: ElementRef, 
        public renderer: Renderer2,
        public pipe: DecimalPipe) {
    }

    ngOnInit() {
        setTimeout( () => {
            this.formatValue(this.model.value)
        })

        const augmentedAbstractControl = this.model.control as AugmentedAbstractControl
        augmentedAbstractControl.valuePatched?.subscribe( value => {
            this.formatValue(value)
        })
    }

    ngOnChanges(changes: SimpleChanges) {
        if ( 'decimals' in changes ) {
            this.regex = new RegExp('^\\d*\\.?\\d{0,' + this.decimals + '}$')
        }
    }

    @HostListener('change')
    onInputChange() {
        this.formatValue(this.model.value)
    }

    formatValue(value: number|null|undefined) {
        if (value !== null && value !== undefined
            && this.decimals !== null && this.decimals !== undefined) {

            /* don't format the value to x number if decimals if more than the specified number
            of decimals have been entered to avoid the model value and form value from being different */
            if ( value.toString().match(this.regex) ) {
                const formattedValue = this.pipe.transform(value, `1.${this.decimals}-${this.decimals}`)
                this.renderer.setProperty(this.element.nativeElement, 'value', formattedValue)
            }
        }
    }

}