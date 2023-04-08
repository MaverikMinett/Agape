/* model */
export interface Event {
    id: string;
    name: string;
}

export const events: Event[] = [
    { id: "record-1", name: '29th Annual Event: Gourmet Gala' },
    { id: "record-2", name: 'Tribal Symposium' },
    { id: "record-3", name: 'Lazy Dog Fundraiser' }
]