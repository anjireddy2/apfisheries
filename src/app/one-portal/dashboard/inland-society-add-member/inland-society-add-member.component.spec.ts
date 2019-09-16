import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InlandSocietyAddMemberComponent } from './inland-society-add-member.component';

describe('InlandSocietyAddMemberComponent', () => {
  let component: InlandSocietyAddMemberComponent;
  let fixture: ComponentFixture<InlandSocietyAddMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InlandSocietyAddMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InlandSocietyAddMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
