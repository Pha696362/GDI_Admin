import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyPackageComponent } from './apply-package.component';

describe('ApplyPackageComponent', () => {
  let component: ApplyPackageComponent;
  let fixture: ComponentFixture<ApplyPackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
