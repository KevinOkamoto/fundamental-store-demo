import { FundamentalStoreConfig } from "@fundamental-ngx/store";

import {
  Address,
  CommodityCode,
  Requisition,
  Supplier,
  User
} from './models';

// Set the default URL root for all entities registered
export const storeConfig: FundamentalStoreConfig = {
  root: 'http://localhost:3000/',
  entities: {
    Address,
    CommodityCode,
    Requisition,
    Supplier,
    User
  },
  enableDevtools: true
};
