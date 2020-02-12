import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewPhoneComponent } from './add-new-phone.component';

describe('AddNewPhoneComponent', () => {
  let component: AddNewPhoneComponent;
  let fixture: ComponentFixture<AddNewPhoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewPhoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
