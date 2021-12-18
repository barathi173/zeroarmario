import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnExchangeSubmitComponent } from './return-exchange-submit.component';

describe('ReturnExchangeSubmitComponent', () => {
  let component: ReturnExchangeSubmitComponent;
  let fixture: ComponentFixture<ReturnExchangeSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnExchangeSubmitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnExchangeSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
