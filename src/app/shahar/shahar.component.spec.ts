import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShaharComponent } from './shahar.component';

describe('ShaharComponent', () => {
  let component: ShaharComponent;
  let fixture: ComponentFixture<ShaharComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShaharComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShaharComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
