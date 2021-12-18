import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyordersListsComponent } from './myorders-lists.component';

describe('MyordersListsComponent', () => {
  let component: MyordersListsComponent;
  let fixture: ComponentFixture<MyordersListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyordersListsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyordersListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
