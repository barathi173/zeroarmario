import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyorderItemComponent } from './myorder-item.component';

describe('MyorderItemComponent', () => {
  let component: MyorderItemComponent;
  let fixture: ComponentFixture<MyorderItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyorderItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyorderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
