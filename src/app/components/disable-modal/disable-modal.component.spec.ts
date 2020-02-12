import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisableModalComponent } from './disable-modal.component';

describe('DisableModalComponent', () => {
  let component: DisableModalComponent;
  let fixture: ComponentFixture<DisableModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisableModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisableModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
