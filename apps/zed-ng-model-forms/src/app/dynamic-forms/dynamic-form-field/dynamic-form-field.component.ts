import { Choice, ChoiceFormatterFunction, FieldDescriptor, Model, ModelDescriptor, getFieldValidator, getValidators, validateField } from "@agape/model";
import { Class } from "@agape/types";
import { Component, Host, Input, OnChanges, Optional, Output, Self, SimpleChanges, SkipSelf, EventEmitter, HostBinding, OnDestroy } from "@angular/core";
import { FormFieldDescriptor } from "../form-field-descriptor";
import { enumToChoices } from "../dynamic-forms-util";
import { AbstractControl, ControlContainer, ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgControl, Validators } from "@angular/forms";
import { Observable, Subscription } from "rxjs";



@Component({
    selector: 'dynamic-form-field',
    templateUrl: './dynamic-form-field.component.html',
    styleUrls: ['./dynamic-form-field.component.scss'],
    providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          multi:true,
          useExisting: DynamicFormFieldComponent
        },
        // {
        //   provide: NG_VALIDATORS,
        //   multi: true,
        //   useExisting: DynamicFormFieldComponent
        // }
    ]
})
export class DynamicFormFieldComponent implements OnChanges, ControlValueAccessor, OnDestroy {

    @Input('class') userClass: string

	@HostBinding('class') get class() {
        let classes: string[] = ['dynamic-form-field']
        if ( this.modelDescriptor ) classes.push(this.modelDescriptor.token )
        if ( this.modelFieldDescriptor ) classes.push(this.modelFieldDescriptor.token)
        if ( this.userClass ) classes.push(this.userClass)
        return classes.join(' ')
	}

    @Input() model: Class

    @Input() field: string

    @Input() choices: any[]|Observable<any>|Promise<any>

    @Input() choiceFormatter: ChoiceFormatterFunction

    // @Input() choicesResolver: Observable<any>|Promise<any>

    choicesSubscription: Subscription

    formattedChoices: Choice[]

    @Output() ngModelChange: EventEmitter<any> = new EventEmitter()

    @Output() change: EventEmitter<any> = new EventEmitter()

    @Output() ctrlBlur: EventEmitter<Event> = new EventEmitter()

    @Output() ctrlClick: EventEmitter<PointerEvent> = new EventEmitter()

    @Output() ctrlContextmenu: EventEmitter<PointerEvent> = new EventEmitter()

    @Output() ctrlCopy: EventEmitter<ClipboardEvent> = new EventEmitter()

    @Output() ctrlCut: EventEmitter<ClipboardEvent> = new EventEmitter()

    @Output() ctrlDblclick: EventEmitter<MouseEvent> = new EventEmitter()

    @Output() ctrlFocus: EventEmitter<FocusEvent> = new EventEmitter()

    @Output() ctrlFocusin: EventEmitter<FocusEvent> = new EventEmitter()

    @Output() ctrlFocusout: EventEmitter<FocusEvent> = new EventEmitter()

    @Output() ctrlInput: EventEmitter<Event> = new EventEmitter()

    @Output() ctrlKeydown: EventEmitter<KeyboardEvent> = new EventEmitter()

    @Output() ctrlKeyup: EventEmitter<KeyboardEvent> = new EventEmitter()

    @Output() ctrlKeypress: EventEmitter<KeyboardEvent> = new EventEmitter()

    @Output() ctrlMousedown: EventEmitter<MouseEvent> = new EventEmitter()

    @Output() ctrlMouseenter: EventEmitter<MouseEvent> = new EventEmitter()

    @Output() ctrlMouseleave: EventEmitter<MouseEvent> = new EventEmitter()

    @Output() ctrlMousemove: EventEmitter<MouseEvent> = new EventEmitter()

    @Output() ctrlMouseout: EventEmitter<MouseEvent> = new EventEmitter()

    @Output() ctrlMouseover: EventEmitter<MouseEvent> = new EventEmitter()

    @Output() ctrlMouseup: EventEmitter<MouseEvent> = new EventEmitter()

    @Output() ctrlPaste: EventEmitter<ClipboardEvent> = new EventEmitter()

    // @Output() ctrlPointercancel: EventEmitter<PointerEvent> = new EventEmitter()

    // @Output() ctrlPointerenter: EventEmitter<PointerEvent> = new EventEmitter()

    // @Output() ctrlPointerleave: EventEmitter<PointerEvent> = new EventEmitter()

    // @Output() ctrlPointermove: EventEmitter<PointerEvent> = new EventEmitter()

    // @Output() ctrlPointerout: EventEmitter<PointerEvent> = new EventEmitter()

    // @Output() ctrlPointerover: EventEmitter<PointerEvent> = new EventEmitter()

    // @Output() ctrlPointerup: EventEmitter<PointerEvent> = new EventEmitter()

    @Output() ctrlScroll: EventEmitter<Event> = new EventEmitter()

    @Output() ctrlScrollend: EventEmitter<Event> = new EventEmitter()

    // @Output() ctrlTouchcancel: EventEmitter<TouchEvent> = new EventEmitter()

    // @Output() ctrlTouchend: EventEmitter<TouchEvent> = new EventEmitter()

    // @Output() ctrlTouchmove: EventEmitter<TouchEvent> = new EventEmitter()

    // @Output() ctrlTouchstart: EventEmitter<TouchEvent> = new EventEmitter()

    @Output() ctrlWheel: EventEmitter<WheelEvent> = new EventEmitter()

    modelDescriptor: ModelDescriptor

    modelFieldDescriptor: FieldDescriptor

    formFieldDescriptor: FormFieldDescriptor

    onChange = (value) => {}
    
    onTouched = () => {}

    touched = false

    disabled = false

    control: AbstractControl


    constructor (
        @Optional() @Host() @SkipSelf()
        private controlContainer: ControlContainer,
        ) {
    }

    ngOnDestroy(): void {
        this.clearChoicesSubscription()
    }

    resolveControl() {
        this.control = this.controlContainer.control.get(this.field)
    }

    /* unused dummy methods because the angular form control is passed
     directly to the child form control */
    writeValue(value: any) { }
    registerOnChange( onChange: any ){ }
    registerOnTouched( onTouched: any ) { }
    markAsTouched() {}
    validate(control: AbstractControl ) { }
    setDisabledState(disabled: boolean) { }
    /******************************************/

    ngOnChanges(changes: SimpleChanges): void {

        if ( changes['model'] ) {
            if ( this.model ) {
                this.modelDescriptor = Model.descriptor(this.model)

                if ( ! this.modelDescriptor ) {
                    throw new Error(`${this.model.name} is not a valid model`)
                }
            }
        }

        if ( changes['model'] || changes['field'] ) {
            if ( this.model ) {
                if ( this.modelDescriptor.fields.has(this.field) ) {
                    this.modelFieldDescriptor = this.modelDescriptor.field(this.field)
                }
                else {
                    throw new Error(`${this.field} is not a field of ${this.model.name}`)
                }
    
                this.resolveControl()
                this.buildFormFieldDescriptor()
                this.bindValidators()
            }
        }

        if ( changes['choices']  ) {
            this.clearChoicesSubscription()

            if ( this.choices instanceof Observable ) {
                this.choices.subscribe({
                    next: choices => this.formatAndSetChoices(choices)
                })
            }
            else if ( this.choices instanceof Promise ) {
                this.choices.then(
                    choices => this.formatAndSetChoices(choices)
                )
            }
            else  {
                this.formatAndSetChoices( this.choices )
            }
        }
    }

    formatAndSetChoices( choices: any[] ) {
        let choiceFormatter: ChoiceFormatterFunction = this.choiceFormatter ?? this.modelFieldDescriptor.choiceFormatter
        const formattedChoices = this.choiceFormatter
        ? choices.map( this.choiceFormatter )
        : choices
        this.formFieldDescriptor.choices = formattedChoices
    }

    clearChoicesSubscription() {
        if ( this.choicesSubscription ) {
            this.choicesSubscription.unsubscribe()
            this.choicesSubscription = null
        }
    }

    onSetChoicesResolver() {

    }

    bindValidators() {
        this.control.clearValidators()

        const controlValidator = this.getControlValidator( this.control, this.modelFieldDescriptor)
        this.control.addValidators( controlValidator )


        if ( this.formFieldDescriptor.required ) {
            this.control.addValidators( Validators.required )
        }

        this.control.updateValueAndValidity()
    }

    getControlValidator( control: AbstractControl, modelFieldDescriptor: FieldDescriptor ) {
        const parent = control.parent
        const validator = getFieldValidator( modelFieldDescriptor )

        function controlValidator (control: AbstractControl) {
            const instance = parent.value
            const value = control.value
            const { valid, error } = validator(instance, value)
            if ( valid ) { return null }
            else { 
                return { field: error }
            }
        }

        return controlValidator
    }


    buildFormFieldDescriptor() {
        const formField = new FormFieldDescriptor()
        this.formFieldDescriptor = formField

        formField.widget = this.modelFieldDescriptor.widget ?? 'input'
        formField.type = this.modelFieldDescriptor.type ?? 'string'

        for ( const fieldName of ['label', 'required']) {
            if ( fieldName in this.modelFieldDescriptor ) {
                formField[fieldName] = this.modelFieldDescriptor[fieldName]
            }
        }


        if ( this.modelFieldDescriptor.choices ) {
            this.formatAndSetChoices(this.modelFieldDescriptor.choices)
        }

        /* number */
        if ( formField.type === 'number' ) {
            formField.min = this.modelFieldDescriptor.min
            formField.max = this.modelFieldDescriptor.max
        }
        
        /* textarea */
        if ( formField.widget === 'textarea' ) {
            formField.autosize = this.modelFieldDescriptor.autosize
            if ( formField.autosize ) {
                formField.minRows = this.modelFieldDescriptor.minRows
                formField.maxRows = this.modelFieldDescriptor.maxRows
            }
            else {
                formField.rows = this.modelFieldDescriptor.rows
            }
        }

        if (this.modelFieldDescriptor.enum ) {
            formField.choices = enumToChoices(this.modelFieldDescriptor.enum)
        }
    }


    emitNgModelChange(event: any) {
        this.ngModelChange.emit(event)
    }

    emitChange(event: any) {
        this.change.emit(event)
    }

    emitCtrlBlur(event: Event) {
        this.ctrlBlur.emit(event)
    }
    
    emitCtrlClick(event: PointerEvent) {
        this.ctrlBlur.emit(event)
    }

    emitCtrlContextmenu(event: PointerEvent) {
        this.ctrlContextmenu.emit(event)
    }

    emitCtrlCopy(event: ClipboardEvent) {
        this.ctrlCopy.emit(event)
    }

    emitCtrlCut(event: ClipboardEvent) {
        this.ctrlCut.emit(event)
    }

    emitCtrlDblclick(event: MouseEvent) {
        this.ctrlDblclick.emit(event)
    }

    emitCtrlFocus(event: FocusEvent) {
        this.ctrlFocus.emit(event)
    }

    emitCtrlFocusin(event: FocusEvent) {
        this.ctrlFocusin.emit(event)
    }

    emitCtrlFocusout(event: FocusEvent) {
        this.ctrlFocusout.emit(event)
    }

    emitCtrlInput(event: Event) {
        this.ctrlInput.emit(event)
    }

    emitCtrlKeydown(event: KeyboardEvent) {
        this.ctrlKeydown.emit(event)
    }

    emitCtrlKeyup(event: KeyboardEvent) {
        this.ctrlKeydown.emit(event)
    }

    emitCtrlKeypress(event: KeyboardEvent) {
        this.ctrlKeydown.emit(event)
    }

    emitCtrlMousedown(event: MouseEvent) {
        this.ctrlMousedown.emit(event)
    }

    emitCtrlMouseenter(event: MouseEvent) {
        this.ctrlMouseenter.emit(event)
    }

    emitCtrlMouseleave(event: MouseEvent) {
        this.ctrlMouseleave.emit(event)
    }

    emitCtrlMousemove(event: MouseEvent) {
        this.ctrlMousemove.emit(event)
    }

    emitCtrlMouseout(event: MouseEvent) {
        this.ctrlMouseout.emit(event)
    }

    emitCtrlMouseover(event: MouseEvent) {
        this.ctrlMouseover.emit(event)
    }

    emitCtrlMouseup(event: MouseEvent) {
        this.ctrlMousedown.emit(event)
    }

    emitCtrlPaste(event: ClipboardEvent) {
        this.ctrlPaste.emit(event)
    }

    // emitPointercancel(event: PointerEvent) {
    //     this.ctrlPointercancel.emit(event)
    // }

    // emitPointerenter(event: PointerEvent) {
    //     this.ctrlPointerenter.emit(event)
    // }

    // emitPointerleave(event: PointerEvent) {
    //     this.ctrlPointerleave.emit(event)
    // }

    // emitPointermove(event: PointerEvent) {
    //     this.ctrlPointermove.emit(event)
    // }

    // emitPointerout(event: PointerEvent) {
    //     this.ctrlPointerout.emit(event)
    // }

    // emitPointerover(event: PointerEvent) {
    //     this.ctrlPointerleave.emit(event)
    // }

    // emitPointerup(event: PointerEvent) {
    //     this.ctrlPointerleave.emit(event)
    // }

    emitScroll(event: Event) {
        this.ctrlScroll.emit(event)
    }

    emitScrollend(event: Event) {
        this.ctrlScrollend.emit(event)
    }

    // emitTouchcancel(event: TouchEvent) {
    //     this.ctrlTouchcancel.emit(event)
    // }

    // emitTouchend(event: TouchEvent) {
    //     this.ctrlTouchend.emit(event)
    // }

    // emitTouchmove(event: TouchEvent) {
    //     this.ctrlTouchmove.emit(event)
    // }

    // emitTouchstart(event: TouchEvent) {
    //     this.ctrlTouchstart.emit(event)
    // }

    emitWheel(event: WheelEvent) {
        this.ctrlWheel.emit(event)
    }



}