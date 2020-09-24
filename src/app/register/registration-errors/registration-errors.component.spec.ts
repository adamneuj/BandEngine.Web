import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationErrorsComponent } from './registration-errors.component';

describe('RegistrationErrorsComponent', () => {
  let component: RegistrationErrorsComponent;
  let fixture: ComponentFixture<RegistrationErrorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationErrorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
