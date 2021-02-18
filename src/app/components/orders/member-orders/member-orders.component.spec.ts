import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberOrdersComponent } from './member-orders.component';

describe('MemberOrdersComponent', () => {
  let component: MemberOrdersComponent;
  let fixture: ComponentFixture<MemberOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
