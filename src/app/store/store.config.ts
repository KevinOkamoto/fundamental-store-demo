import { FundamentalStoreConfig } from "@fundamental-ngx/store";

import { Requisition } from './models';

// Set the default URL root for all entities registered
export const storeConfig: FundamentalStoreConfig = {
  root: 'http://localhost:3000/',
  entities: { Requisition },
  enableDevtools: true
};
