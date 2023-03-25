import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/appServices/common.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  viewAll : boolean = true;

  orderLoader: any = [];

  loading: boolean = true;

  constructor(
    private router: Router,
    private fakeGen: CommonService
  ) {

  }

  ngOnInit() {
    const url = this.router.url;
    this.orderLoader = this.fakeGen.generateFake(4);

    if(url === '/admin/orders') {
      this.viewAll = false;
    }
    else {
      this.viewAll = true;
    }
  }

}
