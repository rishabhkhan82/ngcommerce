import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/appServices/common.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  queryForm !: FormGroup;
  loader: boolean = false;
  submitted: boolean = false;

  constructor(
    private query: CommonService,
    private toastr: ToastrService
  ) {
   
  }

  ngOnInit() {
    this.queryForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required)
    })
  }

  submit() {
    
    if(this.queryForm.valid) {
      this.loader = true;
      console.log(this.queryForm.value);
      this.query.onContact(this.queryForm.value).subscribe(
        (res) => {
          console.log(res);
          this.queryForm.reset();
          this.loader = false;
          this.toastr.success('', 'Message Sent: We will reply to you soon');
        },
        (err) => {
          console.log(err);
          this.loader = false;
          this.toastr.error('', 'Please, login to send message');
        }
      )
    }
    else {
      this.submitted = true;
    }

  }


}
