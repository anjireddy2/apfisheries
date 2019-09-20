import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InlandSocietyRegistrationComponent } from './inland-society-registration.component';

describe('InlandSocietyRegistrationComponent', () => {
  let component: InlandSocietyRegistrationComponent;
  let fixture: ComponentFixture<InlandSocietyRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InlandSocietyRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InlandSocietyRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
