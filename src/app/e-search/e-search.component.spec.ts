import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ESearchComponent } from './e-search.component';

describe('ESearchComponent', () => {
  let component: ESearchComponent;
  let fixture: ComponentFixture<ESearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ESearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ESearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
