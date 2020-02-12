import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPhonenumberComponent } from './edit-phonenumber.component';

describe('EditPhonenumberComponent', () => {
  let component: EditPhonenumberComponent;
  let fixture: ComponentFixture<EditPhonenumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPhonenumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPhonenumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
