import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamiccartComponent } from './dynamiccart.component';

describe('DynamiccartComponent', () => {
  let component: DynamiccartComponent;
  let fixture: ComponentFixture<DynamiccartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamiccartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamiccartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
