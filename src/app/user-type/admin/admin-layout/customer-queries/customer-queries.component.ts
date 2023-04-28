import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/appServices/common.service';

@Component({
  selector: 'app-customer-queries',
  templateUrl: './customer-queries.component.html',
  styleUrls: ['./customer-queries.component.css']
})
export class CustomerQueriesComponent implements OnInit {

  queryArray: any = [];
  queryLoader: any = [];

  constructor(
    private query: CommonService
  ) {

  }

  ngOnInit() {

    this.queryLoader = this.query.generateFake(4);

    this.query.getContact().subscribe(
      (res) => {
        // console.log(res);
        this.queryArray = res.reverse();
        this.queryLoader = [];
      },
      (err) => {
        console.log(err);
      }
    )
  }

  onGetUsers() {
   
  }

}
