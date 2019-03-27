import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TobuyPage } from './tobuy.page';

describe('TobuyPage', () => {
  let component: TobuyPage;
  let fixture: ComponentFixture<TobuyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TobuyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TobuyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
