import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertiseimageComponent } from './advertiseimage.component';

describe('AdvertiseimageComponent', () => {
  let component: AdvertiseimageComponent;
  let fixture: ComponentFixture<AdvertiseimageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertiseimageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertiseimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
