import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSocietyMemberComponent } from './edit-society-member.component';

describe('EditSocietyMemberComponent', () => {
  let component: EditSocietyMemberComponent;
  let fixture: ComponentFixture<EditSocietyMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSocietyMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSocietyMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
