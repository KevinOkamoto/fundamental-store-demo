
import { OrderBy, Predicate } from '@fundamental-ngx/store';
import { SortDirection, TableState } from '@fundamental-ngx/platform';
import { EntityStoreTableDataProvider } from './data-providers';

interface Pizza {
  id: string;
  type: string;
  sauce: string;
  toppings: string[];
  size: string;
  price: number;
}

const PIZZAS: Pizza[] = [{
  id: 'pizza-01',
  type: 'New York',
  sauce: 'red',
  toppings: ['mozzerella', 'pepperoni'],
  size: 'large',
  price: 16.0
}, {
  id: 'pizza-02',
  type: 'Chicago',
  sauce: 'red',
  toppings: ['mozzerella', 'mushrooms', 'spinach'],
  size: 'medium',
  price: 22.5
}, {
  id: 'pizza-03',
  type: 'New York',
  sauce: 'white',
  toppings: ['mozzerella', 'garlic', 'arugala'],
  size: 'medium',
  price: 14.5
}];


fdescribe('EntityStoreTableDataProvider', () => {

  it('should be able to generate proper Predicate from TableState with a single filter', () => {
    let state: TableState = {
      columns: [],
      freezeToColumn: null,
      searchInput: null,
      filterBy: [{
        strategy: 'equalTo',
        field: 'size',
        value: 'medium'
      }],
      sortBy: [],
      groupBy: [],
      page: null
    };

    let predicate: Predicate<Pizza> = EntityStoreTableDataProvider.generatePredicate<Pizza>(state);
    expect(predicate.test(PIZZAS[0])).toBeFalsy();
    expect(predicate.test(PIZZAS[1])).toBeTruthy();
    expect(predicate.test(PIZZAS[2])).toBeTruthy();

    state = {
      columns: [],
      freezeToColumn: null,
      searchInput: null,
      filterBy: [{
        strategy: 'equalTo',
        field: 'size',
        value: 'large'
      }],
      sortBy: [],
      groupBy: [],
      page: null
    };

    predicate = EntityStoreTableDataProvider.generatePredicate<Pizza>(state);
    expect(predicate.test(PIZZAS[0])).toBeTruthy();
    expect(predicate.test(PIZZAS[1])).toBeFalsy();
    expect(predicate.test(PIZZAS[2])).toBeFalsy();
  });

  it('should be able to generate proper Predicate from TableState with a multiple filters', () => {
    let state: TableState = {
      columns: [],
      freezeToColumn: null,
      searchInput: null,
      filterBy: [{
        strategy: 'equalTo',
        field: 'size',
        value: 'medium'
      }, {
        strategy: 'equalTo',
        field: 'type',
        value: 'New York'
      }],
      sortBy: [],
      groupBy: [],
      page: null
    };

    let predicate: Predicate<Pizza> = EntityStoreTableDataProvider.generatePredicate<Pizza>(state);
    expect(predicate.test(PIZZAS[0])).toBeFalsy();
    expect(predicate.test(PIZZAS[1])).toBeFalsy();
    expect(predicate.test(PIZZAS[2])).toBeTruthy();

    state = {
      columns: [],
      freezeToColumn: null,
      searchInput: null,
      filterBy: [{
        strategy: 'equalTo',
        field: 'size',
        value: 'medium'
      }, {
        strategy: 'equalTo',
        field: 'type',
        value: 'Chicago'
      }],
      sortBy: [],
      groupBy: [],
      page: null
    };

    predicate = EntityStoreTableDataProvider.generatePredicate<Pizza>(state);
    expect(predicate.test(PIZZAS[0])).toBeFalsy();
    expect(predicate.test(PIZZAS[1])).toBeTruthy();
    expect(predicate.test(PIZZAS[2])).toBeFalsy();
  });

  it('should generate OrderBys from TableState', () => {
    let state: TableState = {
      columns: [],
      freezeToColumn: null,
      searchInput: null,
      filterBy: [],
      sortBy: [{
        field: 'price',
        direction: SortDirection.ASC
      }],
      groupBy: [],
      page: null
    };

    let orderBys: OrderBy<Pizza>[] = EntityStoreTableDataProvider.generateOrderBy<Pizza>(state);
    expect(orderBys).toEqual([{
      field: 'price',
      order: 'ASCENDING'
    }]);

    state = {
      columns: [],
      freezeToColumn: null,
      searchInput: null,
      filterBy: [],
      sortBy: [{
        field: 'price',
        direction: SortDirection.ASC
      }, {
        field: 'size',
        direction: SortDirection.DESC
      }],
      groupBy: [],
      page: null
    };

    orderBys = EntityStoreTableDataProvider.generateOrderBy<Pizza>(state);
    expect(orderBys).toEqual([{
      field: 'price',
      order: 'ASCENDING'
    }, {
      field: 'size',
      order: 'DESCENDING'
    }]);

  });


});
