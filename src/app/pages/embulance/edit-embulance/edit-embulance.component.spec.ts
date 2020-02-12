import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmbulanceComponent } from './edit-embulance.component';

describe('EditEmbulanceComponent', () => {
  let component: EditEmbulanceComponent;
  let fixture: ComponentFixture<EditEmbulanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEmbulanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEmbulanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
