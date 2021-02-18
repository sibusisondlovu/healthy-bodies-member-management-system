import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelFiveComponent } from './level-five.component';

describe('LevelFiveComponent', () => {
  let component: LevelFiveComponent;
  let fixture: ComponentFixture<LevelFiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevelFiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
