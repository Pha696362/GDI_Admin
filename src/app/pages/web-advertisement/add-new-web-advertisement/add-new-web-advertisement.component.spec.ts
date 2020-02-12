import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewWebAdvertisementComponent } from './add-new-web-advertisement.component';

describe('AddNewWebAdvertisementComponent', () => {
  let component: AddNewWebAdvertisementComponent;
  let fixture: ComponentFixture<AddNewWebAdvertisementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewWebAdvertisementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewWebAdvertisementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
