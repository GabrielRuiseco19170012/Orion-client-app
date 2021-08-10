import { TestBed } from '@angular/core/testing';

import { OrionServiceService } from './orion-service.service';

describe('OrionServiceService', () => {
  let service: OrionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
