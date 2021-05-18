import { BaseEntity, Entity, IdentityKey, RESTResource } from '@fundamental-ngx/store';
import { SupplierDTO } from './supplier';

export interface LineItemDTO {
  id: string;
  requisitionId: string;
  lineItemNumber: number;
  name: string;
  price: number;
  quantity: number;
  supplier: SupplierDTO;
  totalNetAmount: number;
}

@RESTResource({
  path: 'lineitems'
})
@Entity({
  name: 'LineItem'
})
export class LineItem extends BaseEntity<LineItemDTO> {

  id: string;
  requisitionId: string;
  lineItemNumber: number;
  name: string;
  price: number;
  quantity: number;
  supplier: SupplierDTO;
  totalNetAmount: number;

  get identity(): IdentityKey {
    return this.value.id;
  }
}
