import { TestBed } from '@angular/core/testing';

import { TempUnitToggleService } from './temp-unit-toggle.service';

describe('TempUnitToggleService', () => {
  let service: TempUnitToggleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TempUnitToggleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
