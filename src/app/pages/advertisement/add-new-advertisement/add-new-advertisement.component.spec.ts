import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewAdvertisementComponent } from './add-new-advertisement.component';

describe('AddNewAdvertisementComponent', () => {
  let component: AddNewAdvertisementComponent;
  let fixture: ComponentFixture<AddNewAdvertisementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewAdvertisementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewAdvertisementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
