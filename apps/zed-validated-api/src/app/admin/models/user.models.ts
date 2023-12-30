
import { View, Document, ForeignKey } from '@agape/model';
import { User } from "../../shared/documents/user.document";

export interface AdminUserDetailView extends Omit<User, 'password'> { };

@View(User, { omit: [ 'password' ] } ) 
export class AdminUserDetailView extends Document {

}

export interface AdminUserCreateView extends Omit<User, 'id'|'organization'> { };

@View(User, { omit: [ 'id','organization' ] } ) 
export class AdminUserCreateView extends Document {
    @ForeignKey organization: string
}


export interface AdminUserUpdateView extends Omit<User, 'id'|'organization'> { };

@View(User, { omit: [ 'id','organization' ] } ) 
export class AdminUserUpdateView extends Document {

}

export interface AdminUserUpdateFieldsView extends Omit<User, 'id'|'password'|'organization'> { };

@View(User, { omit: [ 'id','password','organization' ] } ) 
export class AdminUserUpdateFieldsView extends Document {

}

/* User Update Password View */
export interface AdminUserUpdatePasswordView extends Pick<User, 'password'> { };

@View(User, { pick: [ 'password' ] } ) 
export class AdminUserUpdatePasswordView extends Document {

}

export { User }