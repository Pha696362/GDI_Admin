import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCoverProductComponent } from './add-cover-product.component';

describe('AddCoverProductComponent', () => {
  let component: AddCoverProductComponent;
  let fixture: ComponentFixture<AddCoverProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCoverProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCoverProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
