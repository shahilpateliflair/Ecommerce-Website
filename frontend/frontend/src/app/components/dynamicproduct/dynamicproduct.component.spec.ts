import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicproductComponent } from './dynamicproduct.component';

describe('DynamicproductComponent', () => {
  let component: DynamicproductComponent;
  let fixture: ComponentFixture<DynamicproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicproductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
