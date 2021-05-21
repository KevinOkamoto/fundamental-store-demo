import { Injectable } from '@angular/core';
import {
  QueryAdapter,
  QueryParams,
  Type,
  AndPredicate,
  EqPredicate,
  GePredicate,
  GtPredicate,
  LePredicate,
  LtPredicate,
  OrPredicate,
  Predicate,
  OrderBy,
  QuerySnapshot,
  ContainsPredicate
} from '@fundamental-ngx/store';

/**
 * QueryAdapter for json-server integration.
 * https://www.npmjs.com/package/json-server
 */
export class CustomQueryAdapter<T> extends QueryAdapter<T> {
  parsePredicate(predicate?: Predicate<T>): string {
      if (predicate instanceof EqPredicate) {
          return predicate.property + '=' + this._prepareValue(predicate.value);
      } else if (predicate instanceof ContainsPredicate) {
          return predicate.property + '_like=' + this._prepareValue(predicate.value);
      } else if (predicate instanceof GePredicate) {
          return predicate.property + '_gte=' + this._prepareValue(predicate.value);
      } else if (predicate instanceof GtPredicate) {
          return predicate.property + '_gt=' + this._prepareValue(predicate.value);
      } else if (predicate instanceof LePredicate) {
          return predicate.property + '_lte=' + this._prepareValue(predicate.value);
      } else if (predicate instanceof LtPredicate) {
          return predicate.property + '_lt=' + this._prepareValue(predicate.value);
      } else if (predicate instanceof AndPredicate) {
          const operands = predicate.operands.map((op) => {
              return this.parsePredicate(op);
          });
          return operands.join('&');
      } else if (predicate instanceof OrPredicate) {
          const operands = predicate.operands.map((op) => {
              return this.parsePredicate(op);
          });
          return '(' + operands.join(' or ') + ')';
      }
      return '';
  }

  parseOrderBys(orderBys?: OrderBy<T> | OrderBy<T>[]): string {
      if (!orderBys) {
          return '';
      }
      let _orderBys: OrderBy<T>[];
      if (!Array.isArray(orderBys)) {
        _orderBys = Array(orderBys);
      } else {
        _orderBys = orderBys;
      }
      const columns: string[] = _orderBys.map(order => {
        return order.field as string;
      });
      const orders: string[] = _orderBys.map(order => {
        return order.order === 'DESCENDING' ? 'desc' : 'asc';
      });
      return '_sort=' + columns.join(',') + '&_order=' + orders.join(',');
  }

  parseSelect(selects?: Array<keyof T>): string {
      if (!Array.isArray(selects)) {
          return '';
      }
      return selects.join(',');
  }

  parseExpand(expands?: Array<keyof T>): string {
      if (!Array.isArray(expands)) {
          return '';
      }
      return expands.join(',');
  }

  createQueryStringFromQuery(query: QuerySnapshot<T>): string {
      let params: QueryParams = {};
      if (query.keyword) {
          params = {
              ...params,
              search: query.keyword
          };
      }
      if (query.predicate) {
          params = {
              ...params,
              filter: this.parsePredicate(query.predicate)
          };
      }
      if (!isNaN(query.top)) {
          params = {
              ...params,
              top: query.top.toString()
          };
      }
      if (!isNaN(query.skip)) {
          params = {
              ...params,
              skip: query.skip.toString()
          };
      }
      if (query.orderby) {
          params = {
              ...params,
              orderby: this.parseOrderBys(query.orderby)
          };
      }
      if (query.includeCount) {
          params = {
              ...params,
              count: 'true'
          };
      }
      if (query.select) {
          params = {
              ...params,
              select: this.parseSelect(query.select)
          };
      }
      if (query.expand) {
          params = {
              ...params,
              expand: this.parseExpand(query.expand)
          };
      }
      return this.createQueryStringFromQueryParams(params);
  }

  createQueryStringFromQueryParams(params: QueryParams): string {
      const parts: string[] = [];
      for (const key in params) {
          if (params.hasOwnProperty(key) && params[key]) {
              if (key === 'filter') {
                  parts.push((params[key] as string));
              } else if (key === 'search') {
                  parts.push('q=' + params[key]);
              } else if (key === 'select') {
                  parts.push('$select=' + params[key]);
              } else if (key === 'expand') {
                  parts.push('$expand=' + params[key]);
              } else if (key === 'skip') {
                  const page = Math.ceil(parseInt(params[key] as string, 10) / parseInt(params.top as string, 10));
                  parts.push('_page=' + page);
              } else if (key === 'top') {
                  parts.push('_limit=' + params[key]);
              } else if (key === 'orderby') {
                  parts.push(params[key] as string);
              } else if (key === 'count') {
                  parts.push('$count=' + params[key]);
              } else {
                  parts.push(key + '=' + params[key]);
              }
          }
      }
      return parts.join('&');
  }

  /** @hidden */
  _prepareOrderBy(orderBy: OrderBy<T>): string {
      if (!orderBy || !orderBy.field) {
          return '';
      }
      const field = orderBy.field as string;
      if (!orderBy.order) {
          return field;
      }
      return field + (orderBy.order === 'DESCENDING' ? ':desc' : ':asc');
  }

  /** @hidden */
  _prepareValue(value: string | number): string {
      if (typeof value === 'number') {
          return value.toString();
      }
      return value;
  }
}

/**
 * Query Adapter Factory
 */
@Injectable()
export class CustomQueryAdapterFactory {
  create<T>(entityTypeOrEntityName: Type<T> | string): QueryAdapter<T> {
      return new CustomQueryAdapter();
  }
}
