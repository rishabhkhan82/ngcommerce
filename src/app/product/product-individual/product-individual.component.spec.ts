import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductIndividualComponent } from './product-individual.component';

describe('ProductIndividualComponent', () => {
  let component: ProductIndividualComponent;
  let fixture: ComponentFixture<ProductIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductIndividualComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
