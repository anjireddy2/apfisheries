import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVesselRegistrationComponent } from './new-vessel-registration.component';

describe('NewVesselRegistrationComponent', () => {
  let component: NewVesselRegistrationComponent;
  let fixture: ComponentFixture<NewVesselRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewVesselRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewVesselRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
