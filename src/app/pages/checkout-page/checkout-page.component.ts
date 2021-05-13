import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from '@fundamental-ngx/core';
import { EntityStore, EntityStoreBuilderFactory } from '@fundamental-ngx/store';
import { Observable, of } from 'rxjs';
import { Address, Requisition } from 'src/app/store/models';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit {

  requisitionStore: EntityStore<Requisition>;
  addressStore: EntityStore<Address>;
  requisition$: Observable<Requisition>;
  addresses$: Observable<Address[]>;

  formGroup: FormGroup;
  lineItemFormGroup: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private builderFactory: EntityStoreBuilderFactory,
    private dialogService: DialogService
  ) {
    this.requisitionStore = builderFactory.create(Requisition).create();
    this.addressStore = builderFactory.create(Address).create();
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
    this.addresses$ = this.addressStore.queryBuilder.build().fetch();
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
