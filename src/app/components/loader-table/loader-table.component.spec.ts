import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderTableComponent } from './loader-table.component';

describe('LoaderTableComponent', () => {
  let component: LoaderTableComponent;
  let fixture: ComponentFixture<LoaderTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaderTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
