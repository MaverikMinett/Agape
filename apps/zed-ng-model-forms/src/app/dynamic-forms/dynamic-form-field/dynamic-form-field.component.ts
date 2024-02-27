import { Choice, ChoiceFormatterFunction, FieldDescriptor, Model, ModelDescriptor, WidgetType, getFieldValidator, getValidators, validateField } from "@agape/model";
import { Class } from "@agape/types";
import { Component, Host, Input, OnChanges, Optional, Output, Self, SimpleChanges, SkipSelf, EventEmitter, HostBinding, OnDestroy } from "@angular/core";
import { DynamicFormControl } from "../dynamic-form-control";
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
        if ( this.fieldDescriptor ) classes.push(this.fieldDescriptor.token)
        if ( this.userClass ) classes.push(this.userClass)
        return classes.join(' ')
	}

    @Input() model: Class

    @Input('field') fieldName: string

    @Input() choices: any[]|Observable<any>|Promise<any>

    @Input() choiceFormatter: ChoiceFormatterFunction

    @Input() disabled = false

    @Input('widget') _widget: WidgetType

    get widget() {
        return this._widget ?? this.agControl?.widget
    }

    resolvedChoiceItems: any[]

    formattedChoices: Choice[]

    // @Input() choicesResolver: Observable<any>|Promise<any>

    choicesSubscription: Subscription

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

    fieldDescriptor: FieldDescriptor

    // formFieldDescriptor: DynamicFormControl

    onChange = (value) => {}
    
    onTouched = () => {}

    touched = false

    get required() {
        return this.ngControl?.hasValidator( Validators.required )
    }

    ngControl: AbstractControl

    agControl: DynamicFormControl

    @Input('control') userSetControl: DynamicFormControl


    constructor (
        @Optional() @Host() @SkipSelf()
        private controlContainer: ControlContainer,
        ) {
    }

    ngOnDestroy(): void {
        this.clearChoicesSubscription()
    }

    resolveNgFormControlByName( name: string ) {
        console.log(this.controlContainer)
        console.log(this.controlContainer.control.get(name))
        return this.controlContainer.control.get(name)
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

        // if ( ! this.userSetControl ) {

        if ( changes['model'] ) {
            this.modelDescriptor = Model.descriptor(this.model)

            if ( ! this.modelDescriptor ) {
                throw new Error(`${this.model.name} is not a valid model`)
            }
        }

        if ( changes['fieldName'] ) {
            if ( ! this.model ) {
                throw new Error(`Must specify a model to use with ${this.fieldName}`)
            }

            if ( ! this.modelDescriptor.fields.has(this.fieldName) ) {
                throw new Error(`${this.fieldName} does not exist on model ${this.model.name}`)
            }
    
            this.fieldDescriptor = this.modelDescriptor.field(this.fieldName)
        }

        if ( changes['model'] || changes['fieldName'] ) {

            this.ngControl = this.resolveNgFormControlByName(this.fieldName)

            if ( ! this.ngControl ) {
                throw new Error(`${this.fieldName} does not exist on the Angular FormGroup`)
            }

            this.agControl = new DynamicFormControl( this.fieldDescriptor, this.ngControl )
        }

        if ( ! this.choices ) this.formattedChoices = this.agControl.choices

        if ( changes['choices'] ) {
            this.onSetChoices()
        }

        if ( changes['choiceFormatter'] && ! changes['choices'] ) {
            if ( this.choices ) {
                this.formattedChoices = this.formatChoiceItems( this.resolvedChoiceItems )
            }
        }

        // if ( changes['disabled'] ) {
        //     this.disabled ? this.ngControl.disable() : this.ngControl.enable()
        // }
        
    }

    onSetChoices() {
        this.clearChoicesSubscription()
        // if choices have not been set on the form field component
        if ( ! this.choices ) {
            // get the choices from the form control
            this.formattedChoices = this.agControl.choices
        }
        // if choices is an observable
        else if ( this.choices instanceof Observable ) {
            const subscription = this.choices.subscribe({
                next: choiceItems => {
                    this.resolvedChoiceItems = choiceItems
                    this.formattedChoices = this.formatChoiceItems( choiceItems )
                }
            })
            this.choicesSubscription = subscription
        }
        // if choices is a promise
        else if ( this.choices instanceof Promise ) {
            this.choices.then( choiceItems => {
                this.resolvedChoiceItems = choiceItems
                this.formattedChoices = this.formatChoiceItems( choiceItems )
            })
        }
        else {
            this.resolvedChoiceItems = this.choices
            this.formattedChoices = this.formatChoiceItems( this.choices )
        }
    }

    formatChoiceItems( choiceItems: any[] ) {
        if ( ! choiceItems ) return choiceItems
        if ( this.choiceFormatter ) {
            return choiceItems.map( this.choiceFormatter )
        }
        else {
            return choiceItems
        }
    }

    formatAndSetChoices( choices: any[] ) {
        // let choiceFormatter: ChoiceFormatterFunction = this.choiceFormatter ?? this.modelFieldDescriptor.choiceFormatter
        // const formattedChoices = choiceFormatter
        // ? choices.map( choiceFormatter )
        // : choices
        // this.formFieldDescriptor.choices = formattedChoices
    }

    // formatAndSetChoices( choices: any[] ) {
    //     let choiceFormatter: ChoiceFormatterFunction = this.choiceFormatter ?? this.modelFieldDescriptor.choiceFormatter
    //     const formattedChoices = choiceFormatter
    //     ? choices.map( choiceFormatter )
    //     : choices
    //     this.formFieldDescriptor.choices = formattedChoices
    // }

    clearChoicesSubscription() {
        if ( this.choicesSubscription ) {
            this.choicesSubscription.unsubscribe()
            this.choicesSubscription = null
        }
    }

    onSetChoicesResolver() {

    }

    emitNgModelChange(event: any) {
        this.ngModelChange.emit(event)
    }

    emitChange(event: any) {
        console.log("Emit Change Event", event)
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