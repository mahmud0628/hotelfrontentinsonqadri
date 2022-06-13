import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MijozComponent } from './mijoz.component';

describe('MijozComponent', () => {
  let component: MijozComponent;
  let fixture: ComponentFixture<MijozComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MijozComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MijozComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
