import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmWarningComponent } from './confirm-warning.component';

describe('ConfirmWarningComponent', () => {
  let component: ConfirmWarningComponent;
  let fixture: ComponentFixture<ConfirmWarningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmWarningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
