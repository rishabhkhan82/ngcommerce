import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-admin-profile',
    templateUrl: './admin-profile.component.html',
    styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

    adminProfile !: FormGroup;

    submitted: boolean = false;

    email: boolean = true;

    constructor() {

    }

    ngOnInit() {
        this.adminProfile = new FormGroup({
            profileImage : new FormControl('', Validators.required),
            name : new FormControl('', Validators.required),
            email : new FormControl('', [Validators.required, Validators.email])
        });
    }

    onSubmit() {

        console.log(this.adminProfile)
        if(this.adminProfile.valid) {
            console.log(this.adminProfile.value);
        }

        else {
            this.submitted = true;
        }
    }

}
