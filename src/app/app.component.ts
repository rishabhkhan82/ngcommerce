import { Component, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngcommerce';
  closeResult!: string;

  constructor(private offcanvasService: NgbOffcanvas) {
    console.log('App Module Loaded');
  }

  // data: boolean = false;
  // dataLoc: boolean = false;
  // dataEvent: boolean = false;

  // onOpen() {
  //   this.data = !this.data;
  // }

  // onClose() {
  //   this.data = false;
  // }

  // onOpenLoc() {
  //   this.dataLoc = !this.dataLoc;
  // }

  // onCloseLoc() {
  //   this.dataLoc = false;
  // }

  // onOpenEvent() {
  //   this.dataEvent = !this.dataEvent;
  // }

  // onCloseEvent() {
  //   this.dataEvent = false;
  // }

  openEnd(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { position: 'end' });
	}

	openTop(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { position: 'top' });
	}

	openBottom(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { position: 'bottom' });
	}

	openNoBackdrop(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { backdrop: false });
	}

	openStaticBackdrop(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { backdrop: 'static' });
	}

	openScroll(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { scroll: true });
	}

	openNoKeyboard(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { keyboard: false });
	}

	openNoAnimation(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { animation: false });
	}

	openCustomBackdropClass(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { backdropClass: 'bg-info' });
	}

	openCustomPanelClass(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { panelClass: 'bg-info' });
	}


}
