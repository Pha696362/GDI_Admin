import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTvNewsComponent } from './edit-tv-news.component';

describe('EditTvNewsComponent', () => {
  let component: EditTvNewsComponent;
  let fixture: ComponentFixture<EditTvNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTvNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTvNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
