import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewServiceComponent } from './create-new-service.component';

describe('CreateNewServiceComponent', () => {
  let component: CreateNewServiceComponent;
  let fixture: ComponentFixture<CreateNewServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNewServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
