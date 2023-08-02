import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTypesVehicleComponent } from './form-types-vehicle.component';

describe('FormTypesVehicleComponent', () => {
  let component: FormTypesVehicleComponent;
  let fixture: ComponentFixture<FormTypesVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormTypesVehicleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormTypesVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
