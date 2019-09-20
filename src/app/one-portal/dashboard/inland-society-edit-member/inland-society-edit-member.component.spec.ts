import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InlandSocietyEditMemberComponent } from './inland-society-edit-member.component';

describe('InlandSocietyEditMemberComponent', () => {
  let component: InlandSocietyEditMemberComponent;
  let fixture: ComponentFixture<InlandSocietyEditMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InlandSocietyEditMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InlandSocietyEditMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
