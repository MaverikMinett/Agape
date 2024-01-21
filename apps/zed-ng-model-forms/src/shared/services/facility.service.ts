import { Injectable } from "@angular/core";
import { of } from 'rxjs'
import { Facility, FacilityStatus } from "../models/facility";


const facilities: Facility[] = [
    { id: 'ny', label: 'New York, NY', stations: 35, status: FacilityStatus.Active },
    { id: 'mas', label: 'Boston, MA', stations: 60, status: FacilityStatus.Active },
    { id: 'tx', label: 'Houston, TX', stations: 100, status: FacilityStatus.Active }
]

@Injectable({ providedIn: 'root'}) 
export class FacilityService {

    listFacilities() {
        return of(facilities)
    }

}