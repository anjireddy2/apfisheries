import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewVesselComponent } from './addnew-vessel.component';

describe('AddnewVesselComponent', () => {
  let component: AddnewVesselComponent;
  let fixture: ComponentFixture<AddnewVesselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddnewVesselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnewVesselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
