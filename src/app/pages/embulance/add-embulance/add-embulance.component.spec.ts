import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmbulanceComponent } from './add-embulance.component';

describe('AddEmbulanceComponent', () => {
  let component: AddEmbulanceComponent;
  let fixture: ComponentFixture<AddEmbulanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEmbulanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmbulanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
