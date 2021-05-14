import { BaseEntity, Entity, IdentityKey, RESTResource } from '@fundamental-ngx/store';

export interface UserDTO {
  id: string;
  name: string;
  email: string;
  personalNumber: string;
}

@RESTResource({
  path: 'users'
})
@Entity({
  name: 'User'
})
export class User extends BaseEntity<UserDTO> {
  id: string;
  name: string;
  email: string;
  personalNumber: string;

  get identity(): IdentityKey {
    return this.value.id;
  }
}
