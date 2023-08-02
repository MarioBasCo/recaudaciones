import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortDetailComponent } from './sort-detail.component';

describe('SortDetailComponent', () => {
  let component: SortDetailComponent;
  let fixture: ComponentFixture<SortDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
