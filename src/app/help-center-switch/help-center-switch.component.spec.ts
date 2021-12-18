import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpCenterSwitchComponent } from './help-center-switch.component';

describe('HelpCenterSwitchComponent', () => {
  let component: HelpCenterSwitchComponent;
  let fixture: ComponentFixture<HelpCenterSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpCenterSwitchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpCenterSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
