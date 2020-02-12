import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TvNewsComponent } from './tv-news.component';

describe('TvNewsComponent', () => {
  let component: TvNewsComponent;
  let fixture: ComponentFixture<TvNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TvNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TvNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
