import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelFourComponent } from './level-four.component';

describe('LevelFourComponent', () => {
  let component: LevelFourComponent;
  let fixture: ComponentFixture<LevelFourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevelFourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
