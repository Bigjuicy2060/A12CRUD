import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductfromComponent } from './productfrom.component';

describe('ProductfromComponent', () => {
  let component: ProductfromComponent;
  let fixture: ComponentFixture<ProductfromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductfromComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductfromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
