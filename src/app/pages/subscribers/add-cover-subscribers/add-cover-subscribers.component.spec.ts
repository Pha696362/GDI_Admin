import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCoverSubscribersComponent } from './add-cover-subscribers.component';

describe('AddCoverSubscribersComponent', () => {
  let component: AddCoverSubscribersComponent;
  let fixture: ComponentFixture<AddCoverSubscribersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCoverSubscribersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCoverSubscribersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
