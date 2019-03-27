import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseEditPage } from './expense-edit.page';

describe('ExpenseEditPage', () => {
  let component: ExpenseEditPage;
  let fixture: ComponentFixture<ExpenseEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseEditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
