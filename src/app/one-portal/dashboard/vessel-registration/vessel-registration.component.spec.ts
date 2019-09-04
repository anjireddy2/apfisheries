import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VesselRegistrationComponent } from './vessel-registration.component';

describe('VesselRegistrationComponent', () => {
  let component: VesselRegistrationComponent;
  let fixture: ComponentFixture<VesselRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VesselRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VesselRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
