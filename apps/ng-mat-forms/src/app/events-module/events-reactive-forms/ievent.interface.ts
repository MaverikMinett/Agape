export interface IEvent {
    id?: string;
    name: string;
}


export interface IEventDto {
    id?: string;
    name: string;
    timeStart: string;
    timeEnd: string;
    locationName: string;
    locationAddress: string;
    contactPhone: string;
    contactEmail: string;
    description: string;
}