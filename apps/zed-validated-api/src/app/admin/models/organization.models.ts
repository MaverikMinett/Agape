import { View, Document, ForeignKey } from '@agape/model';
import { Organization } from '../../shared/documents/organization.document';

export interface AdminOrganizationCreateView extends Omit<Organization, 'id'> { };

@View(Organization, { omit: [ 'id' ] } ) 
export class AdminOrganizationCreateView extends Document {

}

export interface AdminOrganizationUpdateView extends Omit<Organization, 'id'> { };

@View(Organization, { omit: [ 'id' ] } ) 
export class AdminOrganizationUpdateView extends Document {

}