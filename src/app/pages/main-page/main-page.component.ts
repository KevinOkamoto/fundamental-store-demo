import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  requisitions$: Observable<any>;

  constructor() { }

  ngOnInit(): void {
    this.requisitions$ = of([]);
  }

}
