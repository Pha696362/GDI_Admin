import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbulanceComponent } from './embulance.component';

describe('EmbulanceComponent', () => {
  let component: EmbulanceComponent;
  let fixture: ComponentFixture<EmbulanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmbulanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbulanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
