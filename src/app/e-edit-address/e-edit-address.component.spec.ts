import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EEditAddressComponent } from './e-edit-address.component';

describe('EEditAddressComponent', () => {
  let component: EEditAddressComponent;
  let fixture: ComponentFixture<EEditAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EEditAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EEditAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
