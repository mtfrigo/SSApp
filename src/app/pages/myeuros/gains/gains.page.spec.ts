import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GainsPage } from './gains.page';

describe('GainsPage', () => {
  let component: GainsPage;
  let fixture: ComponentFixture<GainsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GainsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GainsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
