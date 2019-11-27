import { TestBed } from '@angular/core/testing';

import { AdminRouteguardService } from './admin-routeguard.service';

describe('AdminRouteguardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminRouteguardService = TestBed.get(AdminRouteguardService);
    expect(service).toBeTruthy();
  });
});
