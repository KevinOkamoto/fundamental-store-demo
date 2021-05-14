import { BaseEntity, Entity, IdentityKey, RESTResource } from '@fundamental-ngx/store';

export interface SupplierDTO {
  id: string;
  name: string;
  email: string;
  orgNumber: string;
}

@RESTResource({
  path: 'suppliers'
})
@Entity({
  name: 'Supplier'
})
export class Supplier extends BaseEntity<SupplierDTO> {
  id: string;
  name: string;
  email: string;
  orgNumber: string;

  get identity(): IdentityKey {
    return this.value.id;
  }
}
