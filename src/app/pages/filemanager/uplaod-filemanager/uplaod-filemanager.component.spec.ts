import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UplaodFilemanagerComponent } from './uplaod-filemanager.component';

describe('UplaodFilemanagerComponent', () => {
  let component: UplaodFilemanagerComponent;
  let fixture: ComponentFixture<UplaodFilemanagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UplaodFilemanagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UplaodFilemanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
