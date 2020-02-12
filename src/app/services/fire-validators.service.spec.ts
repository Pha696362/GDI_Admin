import { TestBed, inject } from '@angular/core/testing';

import { FireValidatorsService } from './fire-validators.service';

describe('FireValidatorsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FireValidatorsService]
    });
  });

  it('should be created', inject([FireValidatorsService], (service: FireValidatorsService) => {
    expect(service).toBeTruthy();
  }));
});
