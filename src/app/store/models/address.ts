import { BaseEntity, Entity, IdentityKey, RESTResource } from '@fundamental-ngx/store';

export interface AddressDTO {
  id: string;
  address: string;
  city: string;
  zip: string;
  country: string;
}


@RESTResource({
  path: 'addresses'
})
@Entity({
  name: 'Address'
})
export class Address extends BaseEntity<AddressDTO> {

  id: string;
  address: string;
  city: string;
  zip: string;
  country: string;

  get identity(): IdentityKey {
    return this.value.id;
  }

}
