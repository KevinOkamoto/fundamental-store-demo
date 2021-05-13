import { FundamentalStoreConfig } from "@fundamental-ngx/store";

import {
  Address,
  Requisition
} from './models';

// Set the default URL root for all entities registered
export const storeConfig: FundamentalStoreConfig = {
  root: 'http://localhost:3000/',
  entities: {
    Address,
    Requisition
  },
  enableDevtools: true
};
