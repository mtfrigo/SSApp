import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GainEditPage } from './gain-edit.page';

describe('GainEditPage', () => {
  let component: GainEditPage;
  let fixture: ComponentFixture<GainEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GainEditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GainEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
