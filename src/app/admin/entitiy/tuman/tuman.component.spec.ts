import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TumanComponent } from './tuman.component';

describe('TumanComponent', () => {
  let component: TumanComponent;
  let fixture: ComponentFixture<TumanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TumanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TumanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
