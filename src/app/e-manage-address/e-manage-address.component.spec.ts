import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EManageAddressComponent } from './e-manage-address.component';

describe('EManageAddressComponent', () => {
  let component: EManageAddressComponent;
  let fixture: ComponentFixture<EManageAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EManageAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EManageAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
