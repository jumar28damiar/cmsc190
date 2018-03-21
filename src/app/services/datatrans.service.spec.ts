import { TestBed, inject } from '@angular/core/testing';

import { DatatransService } from './datatrans.service';

describe('DatatransService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatatransService]
    });
  });

  it('should be created', inject([DatatransService], (service: DatatransService) => {
    expect(service).toBeTruthy();
  }));
});
