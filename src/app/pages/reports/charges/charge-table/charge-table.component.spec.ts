import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeTableComponent } from './charge-table.component';

describe('ChargeTableComponent', () => {
  let component: ChargeTableComponent;
  let fixture: ComponentFixture<ChargeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChargeTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChargeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
