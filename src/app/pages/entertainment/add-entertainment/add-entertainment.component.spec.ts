import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEntertainmentComponent } from './add-entertainment.component';

describe('AddEntertainmentComponent', () => {
  let component: AddEntertainmentComponent;
  let fixture: ComponentFixture<AddEntertainmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEntertainmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEntertainmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
