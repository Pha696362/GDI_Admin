import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFireTruckComponent } from './add-fire-truck.component';

describe('AddFireTruckComponent', () => {
  let component: AddFireTruckComponent;
  let fixture: ComponentFixture<AddFireTruckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFireTruckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFireTruckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
