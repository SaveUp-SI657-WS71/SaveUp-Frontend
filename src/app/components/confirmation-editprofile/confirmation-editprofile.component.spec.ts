import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationEditprofileComponent } from './confirmation-editprofile.component';

describe('ConfirmationEditprofileComponent', () => {
  let component: ConfirmationEditprofileComponent;
  let fixture: ComponentFixture<ConfirmationEditprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationEditprofileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationEditprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
