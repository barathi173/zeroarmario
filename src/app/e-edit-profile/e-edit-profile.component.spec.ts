import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EEditProfileComponent } from './e-edit-profile.component';

describe('EEditProfileComponent', () => {
  let component: EEditProfileComponent;
  let fixture: ComponentFixture<EEditProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EEditProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EEditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
