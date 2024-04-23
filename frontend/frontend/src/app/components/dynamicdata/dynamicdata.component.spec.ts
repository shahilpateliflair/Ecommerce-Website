import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicdataComponent } from './dynamicdata.component';

describe('DynamicdataComponent', () => {
  let component: DynamicdataComponent;
  let fixture: ComponentFixture<DynamicdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicdataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
