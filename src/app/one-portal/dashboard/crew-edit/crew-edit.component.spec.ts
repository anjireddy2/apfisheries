import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrewEditComponent } from './crew-edit.component';

describe('CrewEditComponent', () => {
  let component: CrewEditComponent;
  let fixture: ComponentFixture<CrewEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrewEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
