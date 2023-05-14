import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargesRentComponent } from './charges-rent.component';

describe('ChargesRentComponent', () => {
  let component: ChargesRentComponent;
  let fixture: ComponentFixture<ChargesRentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChargesRentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChargesRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
