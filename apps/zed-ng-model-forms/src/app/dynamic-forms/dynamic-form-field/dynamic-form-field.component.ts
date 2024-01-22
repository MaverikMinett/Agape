import { FieldDescriptor, Model, ModelDescriptor } from "@agape/model";
import { Class } from "@agape/types";
import { Component, Host, Input, OnChanges, Optional, Output, Self, SimpleChanges, SkipSelf, EventEmitter } from "@angular/core";
import { FormFieldDescriptor } from "../form-field-descriptor";
import { enumToChoices } from "../dynamic-forms-util";
import { AbstractControl, ControlContainer, ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgControl, Validators } from "@angular/forms";


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
export class DynamicFormFieldComponent implements OnChanges, ControlValueAccessor {

    @Input() model: Class

    @Input() field: string

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

    ngOnInit() {
        console.log("init")
    }

    resolveControl() {
        this.control = this.controlContainer.control.get(this.field)
    }

    writeValue(value: any) {
        // console.log("Write Value")
        // this.value = value
    }

    registerOnChange( onChange: any ){
        this.onChange = onChange
    }

    registerOnTouched( onTouched: any ) {
        this.onTouched = onTouched
    }

    markAsTouched() {
        if (!this.touched) {
            this.onTouched()
            this.touched = true
        }
    }

    validate(control: AbstractControl ) {
        const value = control.value

    }

    setDisabledState(disabled: boolean) {
        this.disabled = disabled
    }

    ngOnChanges(changes: SimpleChanges): void {

        this.resolveControl()
        const modelDescriptor = Model.descriptor(this.model)

        if ( ! modelDescriptor ) {
            throw new Error(`${this.model.name} is not a valid model`)
        }

        let modelFieldDescriptor: FieldDescriptor

        if ( modelDescriptor.fields.has(this.field) ) {
            modelFieldDescriptor = modelDescriptor.field(this.field)
        }
        else {
            throw new Error(`${this.field} is not a field of ${this.model.name}`)
        }

        this.modelDescriptor = modelDescriptor
        this.modelFieldDescriptor = modelFieldDescriptor

        this.buildFormFieldDescriptor()

        // validators are handled by the model, call in timeout to avoid change detection error
        // setTimeout( () => {

            this.control.clearValidators()

            if ( this.formFieldDescriptor.required ) {
                this.control.addValidators( Validators.required )
            }

            this.control.updateValueAndValidity()
        // })

    }


    buildFormFieldDescriptor() {
        const formField = new FormFieldDescriptor()
        formField.widget = this.modelFieldDescriptor.widget ?? 'input'
        formField.label = this.modelFieldDescriptor.label
        formField.type = this.modelFieldDescriptor.type ?? 'string'
        formField.min = this.modelFieldDescriptor.min
        formField.max = this.modelFieldDescriptor.max
        formField.choices = this.modelFieldDescriptor.choices
        formField.required = this.modelFieldDescriptor.required

        if (this.modelFieldDescriptor.enum) {
            formField.choices = enumToChoices(this.modelFieldDescriptor.enum)
        }

        console.log(this.modelFieldDescriptor, formField)

        this.formFieldDescriptor = formField
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