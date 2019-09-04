import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocietyAddMembersComponent } from './society-add-members.component';

describe('SocietyAddMembersComponent', () => {
  let component: SocietyAddMembersComponent;
  let fixture: ComponentFixture<SocietyAddMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocietyAddMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocietyAddMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
