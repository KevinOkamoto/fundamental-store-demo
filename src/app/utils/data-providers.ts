import { Injectable } from '@angular/core';
import { CollectionFilter, ComboBoxDataSource, DataProvider, SortDirection, TableDataProvider, TableDataSource, TableState } from '@fundamental-ngx/platform';
import {
  AndPredicate,
  BaseEntity,
  BasePredicate,
  ContainsPredicate,
  EntityDTOType,
  EntityStore,
  EntityStoreBuilderFactory,
  EntityType,
  EqPredicate,
  OrderBy,
  Predicate,
  Query
} from '@fundamental-ngx/store';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class EntityStoreDataProvider<T extends BaseEntity<EntityDTOType<never>>> extends DataProvider<T> {

  constructor(private store: EntityStore<T>, private field: keyof T) {
    super();
  }

  fetch(params: Map<string, any>): Observable<any[]> {
    let query: Query<T>;
    if (params.has('query') && params.get('query') !== '*') {
      const predicate: Predicate<EntityDTOType<T>>
        = new ContainsPredicate(this.field as keyof EntityDTOType<T>,
          params.get('query') as EntityDTOType<T>[keyof EntityDTOType<T>], false);
      query = this.store.queryBuilder.where(predicate).build();
    } else {
      query = this.store.queryBuilder.build();
    }
    return query.fetch().pipe(
      map(entities => entities.map(entity => entity.value))
    );
  }
}

export class EntityStoreTableDataProvider<T extends BaseEntity<EntityDTOType<never>>> extends TableDataProvider<T> {
  totalItems: number;
  items: T[];

  constructor(private store: EntityStore<T>) {
    super();
  }

  static filterToPredicate<T>(filter: CollectionFilter): Predicate<EntityDTOType<T>> {
    const field = filter.field as keyof EntityDTOType<T>;
    const value = filter.value as EntityDTOType<T>[keyof EntityDTOType<T>];
    switch (filter.strategy) {
      case 'equalTo':
        return new EqPredicate(field, value);
      case 'contains':
        return new ContainsPredicate(field, value, false);
      default:
        return new BasePredicate();
    }

  }

  static generatePredicate<T>(state: TableState): Predicate<EntityDTOType<T>> {
    if (!state.filterBy || state.filterBy.length === 0) {
      return new BasePredicate<EntityDTOType<T>>();
    }
    const predicates: Predicate<EntityDTOType<T>>[] = [];
    state.filterBy.forEach(filter => {
      predicates.push(EntityStoreTableDataProvider.filterToPredicate(filter));
    });
    if (predicates.length === 1) {
      return predicates[0];
    } else {
      return new AndPredicate(predicates);
    }
  }

  static generateOrderBy<T>(state: TableState): OrderBy<EntityDTOType<T>>[] {
    if (!state.sortBy || state.sortBy.length === 0) {
      return [];
    }
    const orderBys: OrderBy<EntityDTOType<T>>[] = [];
    state.sortBy.forEach(sortBy => {
      orderBys.push({
        field: (sortBy.field as keyof EntityDTOType<T>),
        order: (sortBy.direction === SortDirection.ASC) ? 'ASCENDING' : 'DESCENDING'
      });
    });
    return orderBys;
  }

  fetch(state: TableState): Observable<T[]> {
    const predicate: Predicate<EntityDTOType<T>> = EntityStoreTableDataProvider.generatePredicate<T>(state);
    const orderBys: OrderBy<EntityDTOType<T>>[] = EntityStoreTableDataProvider.generateOrderBy<T>(state);
    let query: Query<T> = this.store.queryBuilder.where(predicate).build();
    if (orderBys.length > 0) {
      query = query.orderBy(...orderBys);
    }
    if (state.searchInput && state.searchInput.text) {
      query = query.keyword(state.searchInput.text);
    }
    if (state.page && state.page.pageSize) {
      query.withMaxResults(state.page.pageSize);
      query.withFirstResult(state.page.currentPage);
    }
    const result$ = query.fetch();
    result$.subscribe(data => {
      this.totalItems = data.length;
    });
    return result$;
  }
}

@Injectable()
export class EntityStoreDataSourceFactoryService {

  constructor(private builderFactory: EntityStoreBuilderFactory) { }

  create<T extends BaseEntity<EntityDTOType<T>>>(store: EntityStore<T>, field: keyof T): EntityStoreDataProvider<T> {
    return new EntityStoreDataProvider(store, field);
  }

  createComboBoxDataSource<T extends BaseEntity<EntityDTOType<T>>>(entity: EntityType<T>, field: keyof T): ComboBoxDataSource<T> {
    const store = this.builderFactory.create(entity).create();
    const provider: DataProvider<T> = this.create(store, field);
    return new ComboBoxDataSource(provider);
  }

  createTableDataSource<T extends BaseEntity<EntityDTOType<T>>>(store: EntityStore<T>): TableDataSource<T> {
    const provider: EntityStoreTableDataProvider<T> = new EntityStoreTableDataProvider(store);
    return new TableDataSource(provider);
  }
}
