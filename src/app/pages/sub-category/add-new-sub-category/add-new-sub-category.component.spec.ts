import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewSubCategoryComponent } from './add-new-sub-category.component';

describe('AddNewSubCategoryComponent', () => {
  let component: AddNewSubCategoryComponent;
  let fixture: ComponentFixture<AddNewSubCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewSubCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewSubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
