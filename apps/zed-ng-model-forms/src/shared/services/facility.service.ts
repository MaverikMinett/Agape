import { Injectable } from "@angular/core";
import { of } from 'rxjs'
import { Facility, FacilityStatus } from "../models/facility";


const facilities: Facility[] = [
    { id: 'ny', label: 'New York, NY', status: FacilityStatus.Active },
    { id: 'mas', label: 'Boston, MA', status: FacilityStatus.Active },
    { id: 'tx', label: 'Houston, TX', status: FacilityStatus.Active }
]

@Injectable({ providedIn: 'root'}) 
export class FacilityService {

    listFacilities() {
        return of(facilities)
    }

}