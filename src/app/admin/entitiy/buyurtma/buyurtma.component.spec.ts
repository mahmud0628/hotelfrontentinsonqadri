import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyurtmaComponent } from './buyurtma.component';

describe('BuyurtmaComponent', () => {
  let component: BuyurtmaComponent;
  let fixture: ComponentFixture<BuyurtmaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyurtmaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyurtmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
