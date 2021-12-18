import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsiteComponent } from './adminsite.component';

describe('AdminsiteComponent', () => {
  let component: AdminsiteComponent;
  let fixture: ComponentFixture<AdminsiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminsiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
