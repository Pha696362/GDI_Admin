import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFireTruckComponent } from './edit-fire-truck.component';

describe('EditFireTruckComponent', () => {
  let component: EditFireTruckComponent;
  let fixture: ComponentFixture<EditFireTruckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFireTruckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFireTruckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
