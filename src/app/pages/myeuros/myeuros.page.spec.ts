import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyeurosPage } from './myeuros.page';

describe('MyeurosPage', () => {
  let component: MyeurosPage;
  let fixture: ComponentFixture<MyeurosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyeurosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyeurosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
