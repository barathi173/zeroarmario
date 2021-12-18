import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddresspageItemComponent } from './addresspage-item.component';

describe('AddresspageItemComponent', () => {
  let component: AddresspageItemComponent;
  let fixture: ComponentFixture<AddresspageItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddresspageItemComponent ]
    })
    .compileComponents();
  });

  
  beforeEach(() => {
    fixture = TestBed.createComponent(AddresspageItemComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
