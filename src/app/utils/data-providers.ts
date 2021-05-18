import { Injectable } from '@angular/core';
import { CollectionFilter, ComboBoxDataSource, DataProvider, SortDirection, TableDataProvider, TableDataSource, TableState } from '@fundamental-ngx/platform';
import { AndPredicate, BaseEntity, BasePredicate, ContainsPredicate, EntityStore, EqPredicate, OrderBy, Predicate, Query } from '@fundamental-ngx/store';

import { Observable, of } from 'rxjs';

export class EntityStoreDataProvider<T extends BaseEntity> extends DataProvider<T> {

  constructor(private store: EntityStore<T>) {
    super();
  }

  fetch(params: Map<string, any>): Observable<T[]> {
    let predicate: Predicate<T>;
    return this.store.queryBuilder.build().fetch();
  }
}

export class EntityStoreTableDataProvider<T extends BaseEntity> extends TableDataProvider<T> {
  totalItems: number;
  items: T[];

  constructor(private store: EntityStore<T>) {
    super();
  }

  static filterToPredicate<T>(filter: CollectionFilter): Predicate<T> {
    const field = filter.field as keyof T;
    const value = filter.value as T[keyof T];
    switch (filter.strategy) {
      case 'equalTo':
        return new EqPredicate(field, value);
      case 'contains':
        return new ContainsPredicate(field, value, false);
      default:
        return new BasePredicate();
    }

  }

  static generatePredicate<T>(state: TableState): Predicate<T> {
    if (!state.filterBy || state.filterBy.length === 0) {
      return new BasePredicate<T>();
    }
    const predicates: Predicate<T>[] = [];
    state.filterBy.forEach(filter => {
      predicates.push(EntityStoreTableDataProvider.filterToPredicate(filter));
    });
    if (predicates.length === 1) {
      return predicates[0];
    } else {
      return new AndPredicate(predicates);
    }
  }

  static generateOrderBy<T>(state: TableState): OrderBy<T>[] {
    if (!state.sortBy || state.sortBy.length === 0) {
      return [];
    }
    const orderBys: OrderBy<T>[] = [];
    state.sortBy.forEach(sortBy => {
      orderBys.push({
        field: (sortBy.field as keyof T),
        order: (sortBy.direction === SortDirection.ASC) ? 'ASCENDING' : 'DESCENDING'
      });
    });
    return orderBys;
  }

  fetch(state: TableState): Observable<T[]> {
    const predicate: Predicate<T> = EntityStoreTableDataProvider.generatePredicate<T>(state);
    const orderBys: OrderBy<T>[] = EntityStoreTableDataProvider.generateOrderBy<T>(state);
    let query: Query<T> = this.store.queryBuilder.where(predicate).build();
    if (orderBys.length > 0) {
      query = query.orderBy(...orderBys);
    }
    if (state.searchInput && state.searchInput.text) {
      query = query.keyword(state.searchInput.text);
    }
    return query.fetch();
  }
}

@Injectable()
export class EntityStoreDataSourceFactoryService {
  create<T extends BaseEntity>(store: EntityStore<T>): EntityStoreDataProvider<T> {
    return new EntityStoreDataProvider(store);
  }

  createComboBoxDataSource<T extends BaseEntity>(store: EntityStore<T>): ComboBoxDataSource<T> {
    const provider: DataProvider<T> = this.create(store);
    return new ComboBoxDataSource(provider);
  }

  createTableDataSource<T extends BaseEntity>(store: EntityStore<T>): TableDataSource<T> {
    const provider: EntityStoreTableDataProvider<T> = new EntityStoreTableDataProvider(store);
    return new TableDataSource(provider);
  }
}
