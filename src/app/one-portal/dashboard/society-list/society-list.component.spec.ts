import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocietyListComponent } from './society-list.component';

describe('SocietyListComponent', () => {
  let component: SocietyListComponent;
  let fixture: ComponentFixture<SocietyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocietyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocietyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
