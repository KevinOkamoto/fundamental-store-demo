import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from '@fundamental-ngx/core';
import { DataSource } from '@fundamental-ngx/platform';
import { EntityStore, EntityStoreBuilderFactory } from '@fundamental-ngx/store';
import { Observable } from 'rxjs';
import {
  Address,
  CommodityCode,
  Requisition,
  Supplier,
  User
} from 'src/app/store/models';
import { EntityStoreDataSourceFactoryService } from 'src/app/utils/data-providers';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit {

  requisitionStore: EntityStore<Requisition>;
  addressStore: EntityStore<Address>;
  commodityCodeStore: EntityStore<CommodityCode>;
  supplierStore: EntityStore<Supplier>;
  userStore: EntityStore<User>;

  requisition$: Observable<Requisition>;
  addresses$: DataSource<Address>;
  commodityCodes$: DataSource<CommodityCode>;
  suppliers$: DataSource<Supplier>;
  users$: DataSource<User>;

  formGroup: FormGroup;
  lineItemFormGroup: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private builderFactory: EntityStoreBuilderFactory,
    private dialogService: DialogService,
    private dataSourceFactory: EntityStoreDataSourceFactoryService
  ) {
    this.requisitionStore = builderFactory.create(Requisition).create();
    this.addressStore = builderFactory.create(Address).create();
    this.commodityCodeStore = builderFactory.create(CommodityCode).create();
    this.supplierStore = builderFactory.create(Supplier).create();
    this.userStore = builderFactory.create(User).create();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.requisition$ = this.requisitionStore.get(params.id);
    });
    this.loadResources();

    this.formGroup = new FormGroup({});
    this.lineItemFormGroup = new FormGroup({});

  }

  loadResources(): void {
    this.addresses$ = this.dataSourceFactory.createComboBoxDataSource<Address>(this.addressStore, 'address');
    this.commodityCodes$ = this.dataSourceFactory.createComboBoxDataSource<CommodityCode>(this.commodityCodeStore, 'name');
    this.suppliers$ = this.dataSourceFactory.createComboBoxDataSource<Supplier>(this.supplierStore, 'name');
    this.users$ = this.dataSourceFactory.createComboBoxDataSource<User>(this.userStore, 'name');
  }

  onSubmit(debug: any): void {

  }

  openLineItemDialog(dialog: TemplateRef<any>, item: any): void {
    const dialogRef = this.dialogService.open(dialog, {
      responsivePadding: true,
      data: {
        item
      }
    });
  }

}
