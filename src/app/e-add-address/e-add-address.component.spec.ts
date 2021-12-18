import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EAddAddressComponent } from './e-add-address.component';

describe('EAddAddressComponent', () => {
  let component: EAddAddressComponent;
  let fixture: ComponentFixture<EAddAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EAddAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EAddAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
