import { TestBed } from '@angular/core/testing';

import { UserRouteguardService } from './user-routeguard.service';

describe('UserRouteguardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserRouteguardService = TestBed.get(UserRouteguardService);
    expect(service).toBeTruthy();
  });
});
