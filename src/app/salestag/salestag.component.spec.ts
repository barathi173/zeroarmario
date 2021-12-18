import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalestagComponent } from './salestag.component';

describe('SalestagComponent', () => {
  let component: SalestagComponent;
  let fixture: ComponentFixture<SalestagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalestagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalestagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
