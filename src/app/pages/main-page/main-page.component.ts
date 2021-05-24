import { Component, OnInit } from '@angular/core';
import { TableDataSource } from '@fundamental-ngx/platform';
import { and, contains, EntityStore, EntityStoreBuilderFactory, le, lt, Query } from '@fundamental-ngx/store';
import { Observable } from 'rxjs';
import { Requisition } from 'src/app/store/models';
import { EntityStoreDataSourceFactoryService } from 'src/app/utils/data-providers';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  store: EntityStore<Requisition>;
  requisitions$: Observable<Requisition[]>;
  dataSource$: TableDataSource<Requisition>;

  constructor(
    private builderFactory: EntityStoreBuilderFactory,
    private dataSourceFactory: EntityStoreDataSourceFactoryService
  ) {
    const builder = builderFactory.create(Requisition);
    this.store = builder.create();
  }

  ngOnInit(): void {
    /*
    const dueOnDate = new Date('05/24/2021').toISOString();
    // build query with filters
    const query: Query<Requisition> = this.store.queryBuilder
      .where(
        and(
          contains('title', 'group'),
          le('dueOn', dueOnDate)
        )
      )
      .build();

    // add sorting
    query.orderBy({
      field: 'title',
      order: 'ASCENDING'
    });

    // add paging
    query.withFirstResult(1)
    .withMaxResults(10);

    // fetch data
    this.requisitions$ = query.fetch();
    */

    // add data source
    this.dataSource$ = this.dataSourceFactory.createTableDataSource<Requisition>(this.store);
  }

}
