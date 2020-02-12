import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotUserPasswordComponent } from './forgot-user-password.component';

describe('ForgotUserPasswordComponent', () => {
  let component: ForgotUserPasswordComponent;
  let fixture: ComponentFixture<ForgotUserPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotUserPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotUserPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
