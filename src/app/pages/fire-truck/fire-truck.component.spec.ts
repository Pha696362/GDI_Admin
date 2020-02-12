import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FireTruckComponent } from './fire-truck.component';

describe('FireTruckComponent', () => {
  let component: FireTruckComponent;
  let fixture: ComponentFixture<FireTruckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FireTruckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FireTruckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
