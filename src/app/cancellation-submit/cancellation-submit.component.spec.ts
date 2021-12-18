import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancellationSubmitComponent } from './cancellation-submit.component';

describe('CancellationSubmitComponent', () => {
  let component: CancellationSubmitComponent;
  let fixture: ComponentFixture<CancellationSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancellationSubmitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancellationSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
