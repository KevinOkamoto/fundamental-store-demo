import { FdDate } from '@fundamental-ngx/core';
import { BaseEntity, Entity, IdentityKey, RESTResource } from '@fundamental-ngx/store';

import { AddressDTO } from './address';
import { CommodityCodeDTO } from './commodity-code';
import { SupplierDTO } from './supplier';
import { UserDTO } from './user';

export interface RequisitionDTO {
  id: string;
  title: string;
  subtitle: string;
  shippingAddress: AddressDTO;
  billingAddress: AddressDTO;
  supplier: SupplierDTO;
  dueOn: Date;
  currency: string;
  requestor: UserDTO;
  commodityCode: CommodityCodeDTO;
}

@RESTResource({
  path: 'requisitions'
})
@Entity({
  name: 'Requisition'
})
export class Requisition extends BaseEntity<RequisitionDTO> {
  id: string;
  title: string;
  subtitle: string;
  shippingAddress: AddressDTO;
  billingAddress: AddressDTO;
  supplier: SupplierDTO;
  dueOn: string;
  currency: string;
  requestor: UserDTO;
  commodityCode: CommodityCodeDTO;

  get identity(): IdentityKey {
    return this.value.id;
  }

  get dueOnDate(): FdDate {
    const date = new Date(this.dueOn);
    return new FdDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
  }
  set dueOnDate(fdDate: FdDate) {
    this.dueOn = fdDate.toDateString();
  }

}
