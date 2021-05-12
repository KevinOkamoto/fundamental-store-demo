import { Component, OnInit } from '@angular/core';
import { EntityStore, EntityStoreBuilderFactory } from '@fundamental-ngx/store';
import { Observable } from 'rxjs';
import { Requisition } from 'src/app/store/models';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  store: EntityStore<Requisition>;
  requisitions$: Observable<any>;

  constructor( private builderFactory: EntityStoreBuilderFactory ) {
    const builder = builderFactory.create(Requisition);
    this.store = builder.create();
  }

  ngOnInit(): void {
    const query = this.store.queryBuilder.build();
    this.requisitions$ = query.fetch();
  }

}
