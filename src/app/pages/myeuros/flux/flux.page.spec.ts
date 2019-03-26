import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FluxPage } from './flux.page';

describe('FluxPage', () => {
  let component: FluxPage;
  let fixture: ComponentFixture<FluxPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FluxPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FluxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
