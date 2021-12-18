import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackOrderReturnComponent } from './track-order-return.component';

describe('TrackOrderReturnComponent', () => {
  let component: TrackOrderReturnComponent;
  let fixture: ComponentFixture<TrackOrderReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackOrderReturnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackOrderReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
