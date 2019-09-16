import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrewUserComponent } from './crew-user.component';

describe('CrewUserComponent', () => {
  let component: CrewUserComponent;
  let fixture: ComponentFixture<CrewUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrewUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
