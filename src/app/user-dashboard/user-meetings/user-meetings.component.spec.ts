import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMeetingsComponent } from './user-meetings.component';

describe('UserMeetingsComponent', () => {
  let component: UserMeetingsComponent;
  let fixture: ComponentFixture<UserMeetingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMeetingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMeetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
