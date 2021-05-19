import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from '@fundamental-ngx/core';
import { DataSource } from '@fundamental-ngx/platform';
import { EntityStore, EntityStoreBuilderFactory, eq } from '@fundamental-ngx/store';
import { Observable } from 'rxjs';
import {
  Address,
  CommodityCode,
  LineItem,
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

  requisition: Requisition;

  requisitionStore: EntityStore<Requisition>;
  addressStore: EntityStore<Address>;
  commodityCodeStore: EntityStore<CommodityCode>;
  supplierStore: EntityStore<Supplier>;
  userStore: EntityStore<User>;
  lineItemStore: EntityStore<LineItem>;

  requisition$: Observable<Requisition>;
  addresses$: DataSource<Address>;
  commodityCodes$: DataSource<CommodityCode>;
  suppliers$: DataSource<Supplier>;
  users$: DataSource<User>;
  lineItems$: Observable<LineItem[]>;

  formGroup: FormGroup;
  lineItemFormGroup: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private builderFactory: EntityStoreBuilderFactory,
    private dialogService: DialogService,
    private dataSourceFactory: EntityStoreDataSourceFactoryService,
    private cd: ChangeDetectorRef
  ) {
    this.requisitionStore = builderFactory.create(Requisition).create();
    this.addressStore = builderFactory.create(Address).create();
    this.commodityCodeStore = builderFactory.create(CommodityCode).create();
    this.supplierStore = builderFactory.create(Supplier).create();
    this.userStore = builderFactory.create(User).create();
    this.lineItemStore = builderFactory.create(LineItem).create();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.requisition$ = this.requisitionStore.get(params.id);
      this.lineItems$ = this.lineItemStore.queryBuilder
        .where(eq('requisitionId', params.id))
        .build()
        .fetch();

      this.lineItems$.subscribe(() => {
        this.cd.detectChanges();
      });
      this.loadForm();
    });
    this.loadResources();

    this.formGroup = new FormGroup({
      id: new FormControl(),
      title: new FormControl(),
      subtitle: new FormControl(),
      shippingAddress: new FormControl(),
      billingAddress: new FormControl(),
      supplier: new FormControl(),
      dueOn: new FormControl(),
      currency: new FormControl(),
      requestor: new FormControl(),
      commodityCode: new FormControl(),
    });
    this.lineItemFormGroup = new FormGroup({});
  }

  loadResources(): void {
    this.addresses$ = this.dataSourceFactory.createComboBoxDataSource<Address>(this.addressStore, 'address');
    this.commodityCodes$ = this.dataSourceFactory.createComboBoxDataSource<CommodityCode>(this.commodityCodeStore, 'name');
    this.suppliers$ = this.dataSourceFactory.createComboBoxDataSource<Supplier>(this.supplierStore, 'name');
    this.users$ = this.dataSourceFactory.createComboBoxDataSource<User>(this.userStore, 'name');
  }

  loadForm(): void {
    this.requisition$.subscribe(requisition => {
      this.requisition = requisition;
      this.formGroup.setValue(requisition.value);
    });
  }

  onSubmit(): void {
    const value = this.getFormValue(this.formGroup);
    this.requisitionStore.save(value);
  }

  openLineItemDialog(dialog: TemplateRef<any>, item: any): void {
    const dialogRef = this.dialogService.open(dialog, {
      responsivePadding: true,
      data: {
        item
      }
    });
  }

  getFormValue(formGroup: FormGroup): Requisition {
    return {
      identity: () => this.formGroup.value.id,
      ...formGroup.value
    };
  }
}
