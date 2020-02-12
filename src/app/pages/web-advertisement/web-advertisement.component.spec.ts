import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebAdvertisementComponent } from './web-advertisement.component';

describe('WebAdvertisementComponent', () => {
  let component: WebAdvertisementComponent;
  let fixture: ComponentFixture<WebAdvertisementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebAdvertisementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebAdvertisementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
