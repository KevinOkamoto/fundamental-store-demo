import { Component, OnInit } from '@angular/core';
import { TableDataSource } from '@fundamental-ngx/platform';
import { EntityStore, EntityStoreBuilderFactory } from '@fundamental-ngx/store';
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
  requisitions$: TableDataSource<Requisition>;


  constructor(
    private builderFactory: EntityStoreBuilderFactory,
    private dataSourceFactory: EntityStoreDataSourceFactoryService
  ) {
    const builder = builderFactory.create(Requisition);
    this.store = builder.create();
  }

  ngOnInit(): void {
    const query = this.store.queryBuilder.build();
    this.requisitions$ = this.dataSourceFactory.createTableDataSource<Requisition>(this.store);
  }

}
