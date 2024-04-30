import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckInCompanyComponent } from './check-in-company.component';

describe('CheckInCompanyComponent', () => {
  let component: CheckInCompanyComponent;
  let fixture: ComponentFixture<CheckInCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckInCompanyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckInCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
