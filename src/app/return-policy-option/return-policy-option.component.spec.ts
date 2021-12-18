import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnPolicyOptionComponent } from './return-policy-option.component';

describe('ReturnPolicyOptionComponent', () => {
  let component: ReturnPolicyOptionComponent;
  let fixture: ComponentFixture<ReturnPolicyOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnPolicyOptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnPolicyOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
