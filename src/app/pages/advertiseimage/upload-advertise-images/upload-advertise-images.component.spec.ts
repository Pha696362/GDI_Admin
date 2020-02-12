import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadAdvertiseImagesComponent } from './upload-advertise-images.component';

describe('UploadAdvertiseImagesComponent', () => {
  let component: UploadAdvertiseImagesComponent;
  let fixture: ComponentFixture<UploadAdvertiseImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadAdvertiseImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadAdvertiseImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
