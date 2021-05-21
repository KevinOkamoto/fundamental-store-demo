import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CollectionFilter, TableState } from '@fundamental-ngx/platform';
import { EntityStore, EntityStoreBuilderFactory } from '@fundamental-ngx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { Requisition } from 'src/app/store/models';

@Component({
  selector: 'app-main-page-alt',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageAltComponent implements OnInit {

  store: EntityStore<Requisition>;
  requisitions$: Observable<Requisition[]>;

  constructor(
    private builderFactory: EntityStoreBuilderFactory,
    private requisitionService: RequisitionService
  ) {
  }

  ngOnInit(): void {
    this.requisitions$ = this.requisitionService.requisitions$;
  }

  onColumnSort(column: string, direction: string): void {
    this.requisitionService.sort(column, direction);
  }

}

export class RequisitionService {

  _requisitions$: BehaviorSubject<Requisition[]> = new BehaviorSubject([]);
  requisitions$: Observable<Requisition[]> = this._requisitions$.asObservable();

  constructor( private http: HttpClient ) {}

  fetch(state?: TableState): void {
    let params: any = {};
    if (state) {
      params = this.tableStateToParams(state);
    }
    this.http.get('/requisitions', { params }).subscribe(data => {
      this._requisitions$.next(data as Requisition[]);
    });
  }

  tableStateToParams(state: TableState): HttpParams {
    let params = {};
    params = this.addSortParams(state, params);
    params = this.addFilterParams(state, params);
    return new HttpParams(params);
  }

  addSortParams(state: TableState, params: any): any {
    if (!state.sortBy) {
      return params;
    }
    const sort = [];
    const orderBy = [];
    state.sortBy.forEach(sortBy => {
      sort.push(params[sortBy.field]);
      sort.push(sortBy.direction);
    });
    return {
      ...params,
      _sort: sort.join(','),
      _order: sort.join(',')
    };
  }

  addFilterParams(state: TableState, params: any): any {
    if (!state.filterBy) {
      return params;
    }
    const filters: any = {};
    state.filterBy.forEach(filter => {
      const key = this.constructFilterKey(filter);
      filters[key] = filter.value;
    });
    return {
      ...params,
      ...filters
    };
  }

  constructFilterKey(filter: CollectionFilter): string {
    switch (filter.strategy) {
      case 'contains':
        return filter.field + '_like';
      case 'greaterThan':
        return filter.field + '_gt';
      case 'greaterThanOrEqualTo':
        return filter.field + '_ge';
      case 'lessThan':
        return filter.field + '_lt';
      case 'lessThanOrEqualTo':
        return filter.field + '_le';
      default:
        return filter.field;
    }
  }

}
