import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { AdminNotificationService } from 'src/app/appServices/admin-notification.service';
import { CommonService } from 'src/app/appServices/common.service';
import { ToastServiceService } from 'src/app/appServices/toast-service.service';

@Component({
  selector: 'app-admin-notification',
  templateUrl: './admin-notification.component.html',
  styleUrls: ['./admin-notification.component.css']
})
export class AdminNotificationComponent implements OnInit {

  notiArray : any = [];

  noteLoader: any = [];

  loading: boolean = true;

  constructor(
    private notiService : AdminNotificationService,
    private genFake : CommonService,
    private toastr: ToastrService
  ) {

  }

  ngOnInit() {
    this.noteLoader = this.genFake.generateFake(4);
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
      this.loading = false;
    });
  }

  onDeleteNoty(data: any) {
    if(confirm("Are you sure to delete this notification")) {
      // console.log(data);
      this.notiService.onDeleteAdminNotification(data).subscribe(
        (res) => {
          this.toastr.success('', 'Notification deleted successfully!');
          this.onGetNoti();
        }
      );
    }
  }

}
