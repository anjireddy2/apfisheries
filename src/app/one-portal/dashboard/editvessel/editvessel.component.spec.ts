import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditvesselComponent } from './editvessel.component';

describe('EditvesselComponent', () => {
  let component: EditvesselComponent;
  let fixture: ComponentFixture<EditvesselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditvesselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditvesselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
