import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEntertainmentComponent } from './edit-entertainment.component';

describe('EditEntertainmentComponent', () => {
  let component: EditEntertainmentComponent;
  let fixture: ComponentFixture<EditEntertainmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEntertainmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEntertainmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
