import { FundamentalStoreConfig } from "@fundamental-ngx/store";
import { environment } from "src/environments/environment";

import {
  Address,
  CommodityCode,
  LineItem,
  Requisition,
  Supplier,
  User
} from './models';

// Set the default URL root for all entities registered
export const storeConfig: FundamentalStoreConfig = {
  root: environment.apiUrl, // http://localhost:3000
  entities: {
    Address,
    CommodityCode,
    LineItem,
    Requisition,
    Supplier,
    User
  },
  enableDevtools: false
};
