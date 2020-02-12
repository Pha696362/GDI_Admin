import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTvNewsComponent } from './add-tv-news.component';

describe('AddTvNewsComponent', () => {
  let component: AddTvNewsComponent;
  let fixture: ComponentFixture<AddTvNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTvNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTvNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
