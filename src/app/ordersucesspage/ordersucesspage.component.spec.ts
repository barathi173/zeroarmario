import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersucesspageComponent } from './ordersucesspage.component';

describe('OrdersucesspageComponent', () => {
  let component: OrdersucesspageComponent;
  let fixture: ComponentFixture<OrdersucesspageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersucesspageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersucesspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
