import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { AdminNotificationService } from 'src/app/appServices/admin-notification.service';

@Component({
  selector: 'app-admin-notification',
  templateUrl: './admin-notification.component.html',
  styleUrls: ['./admin-notification.component.css']
})
export class AdminNotificationComponent implements OnInit {

  notiArray : any = [];

  constructor(
    private notiService : AdminNotificationService
  ) {

  }

  ngOnInit() {
    this.onGetNoti();
  }

  onGetNoti() {
    this.notiService.onGetAdminNotification().pipe(map((resData: any) => {
      // console.log(resData);
      const userArrayTwo: any = [];
      for(const id in resData) {
        // console.log(id);
        // console.log(resData[id])
        if(resData.hasOwnProperty(id)) {
          userArrayTwo.push({
            notiId: id, ...resData[id]
          });
        }
      }
      return userArrayTwo
    })).subscribe((res) => {
      const dataTwo = JSON.stringify(res);
      this.notiArray = JSON.parse(dataTwo);
      // console.log(this.notiArray);
    });
  }

  onDeleteNoty(data: any) {
    if(confirm("Are you sure to delete this notification")) {
      // console.log(data);

      this.notiService.onDeleteAdminNotification(data).subscribe(
        (res) => {
          this.onGetNoti();
        }
      );
    }
  }

}
