import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTypesVehicleComponent } from './table-types-vehicle.component';

describe('TableTypesVehicleComponent', () => {
  let component: TableTypesVehicleComponent;
  let fixture: ComponentFixture<TableTypesVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableTypesVehicleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableTypesVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
