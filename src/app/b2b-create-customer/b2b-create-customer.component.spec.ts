import { ComponentFixture, TestBed } from '@angular/core/testing';

import { B2bCreateCustomerComponent } from './b2b-create-customer.component';

describe('B2bCreateCustomerComponent', () => {
  let component: B2bCreateCustomerComponent;
  let fixture: ComponentFixture<B2bCreateCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ B2bCreateCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(B2bCreateCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
