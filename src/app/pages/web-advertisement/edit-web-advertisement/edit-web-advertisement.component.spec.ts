import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWebAdvertisementComponent } from './edit-web-advertisement.component';

describe('EditWebAdvertisementComponent', () => {
  let component: EditWebAdvertisementComponent;
  let fixture: ComponentFixture<EditWebAdvertisementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditWebAdvertisementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWebAdvertisementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
