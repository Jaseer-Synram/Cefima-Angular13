import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectConsultingComponent } from './select-consulting.component';

describe('SelectConsultingComponent', () => {
  let component: SelectConsultingComponent;
  let fixture: ComponentFixture<SelectConsultingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectConsultingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectConsultingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
