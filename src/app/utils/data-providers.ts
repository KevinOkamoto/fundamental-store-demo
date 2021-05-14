import { Injectable } from '@angular/core';
import { ComboBoxDataSource, DataProvider } from '@fundamental-ngx/platform';
import { BaseEntity, EntityStore } from '@fundamental-ngx/store';

import { Observable } from 'rxjs';

class EntityStoreDataProvider<T extends BaseEntity> extends DataProvider<T> {

  constructor(private store: EntityStore<T>) {
    super();
  }

  fetch(searchParams: Map<string, any>): Observable<T[]> {
    const query = this.store.queryBuilder.build();
    return query.fetch();
  }
}

@Injectable()
export class EntityStoreDataProviderFactory {
  create<T extends BaseEntity>(store: EntityStore<T>): EntityStoreDataProvider<T> {
    return new EntityStoreDataProvider(store);
  }

  createComboBoxDataSource<T extends BaseEntity>(store: EntityStore<T>): ComboBoxDataSource<T> {
    const provider: DataProvider<T> = this.create(store);
    return new ComboBoxDataSource(provider);
  }
}
