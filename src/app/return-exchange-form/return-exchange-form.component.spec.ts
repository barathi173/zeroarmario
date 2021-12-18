import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnExchangeFormComponent } from './return-exchange-form.component';

describe('ReturnExchangeFormComponent', () => {
  let component: ReturnExchangeFormComponent;
  let fixture: ComponentFixture<ReturnExchangeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnExchangeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnExchangeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
