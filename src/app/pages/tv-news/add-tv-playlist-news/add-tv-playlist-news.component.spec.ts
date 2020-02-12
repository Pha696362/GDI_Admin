import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTvPlaylistNewsComponent } from './add-tv-playlist-news.component';

describe('AddTvPlaylistNewsComponent', () => {
  let component: AddTvPlaylistNewsComponent;
  let fixture: ComponentFixture<AddTvPlaylistNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTvPlaylistNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTvPlaylistNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
