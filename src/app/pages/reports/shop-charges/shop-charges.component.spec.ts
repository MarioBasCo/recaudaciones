import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopChargesComponent } from './shop-charges.component';

describe('ShopChargesComponent', () => {
  let component: ShopChargesComponent;
  let fixture: ComponentFixture<ShopChargesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopChargesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
