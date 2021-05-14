import { BaseEntity, Entity, IdentityKey, RESTResource } from '@fundamental-ngx/store';

export interface CommodityCodeDTO {
  id: string;
  section: string;
  hscode: string;
  name: string;
  parent: string;
  level: number;
}

@RESTResource({
  path: 'commoditycodes'
})
@Entity({
  name: 'CommodityCode'
})
export class CommodityCode extends BaseEntity<CommodityCodeDTO> {
  id: string;
  section: string;
  hscode: string;
  name: string;
  parent: string;
  level: number;

  get identity(): IdentityKey {
    return this.value.id;
  }
}
