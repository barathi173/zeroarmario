import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundsWorkComponent } from './refunds-work.component';

describe('RefundsWorkComponent', () => {
  let component: RefundsWorkComponent;
  let fixture: ComponentFixture<RefundsWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefundsWorkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefundsWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
