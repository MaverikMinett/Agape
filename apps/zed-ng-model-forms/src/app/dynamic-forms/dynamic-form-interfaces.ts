

export interface DynamicFormChangesEvent {
    event: Event,
    changes: {
        [key: string]: any
    }
}