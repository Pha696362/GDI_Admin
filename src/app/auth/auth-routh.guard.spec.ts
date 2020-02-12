import { TestBed, async, inject } from '@angular/core/testing';

import { AuthRouthGuard } from './auth-routh.guard';

describe('AuthRouthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthRouthGuard]
    });
  });

  it('should ...', inject([AuthRouthGuard], (guard: AuthRouthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
