import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyaccountSwitchComponent } from './myaccount-switch.component';

describe('MyaccountSwitchComponent', () => {
  let component: MyaccountSwitchComponent;
  let fixture: ComponentFixture<MyaccountSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyaccountSwitchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyaccountSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
