import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InlandSocietyListComponent } from './inland-society-list.component';

describe('InlandSocietyListComponent', () => {
  let component: InlandSocietyListComponent;
  let fixture: ComponentFixture<InlandSocietyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InlandSocietyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InlandSocietyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
