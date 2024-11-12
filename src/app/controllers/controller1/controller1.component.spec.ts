import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Controller1Component } from './controller1.component';

describe('Controller1Component', () => {
  let component: Controller1Component;
  let fixture: ComponentFixture<Controller1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Controller1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Controller1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
