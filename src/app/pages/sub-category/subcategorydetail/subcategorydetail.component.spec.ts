import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategorydetailComponent } from './subcategorydetail.component';

describe('SubcategorydetailComponent', () => {
  let component: SubcategorydetailComponent;
  let fixture: ComponentFixture<SubcategorydetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubcategorydetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcategorydetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
