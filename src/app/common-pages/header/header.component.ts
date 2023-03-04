import { Component, OnInit } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
   show:boolean = true;

   ngOnInit() {
    this.show = false;
   }

   onToggle() {
    this.show = !this.show;
   }
}
