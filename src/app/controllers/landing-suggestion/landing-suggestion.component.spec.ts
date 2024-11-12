import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingSuggestionComponent } from './landing-suggestion.component';

describe('LandingSuggestionComponent', () => {
  let component: LandingSuggestionComponent;
  let fixture: ComponentFixture<LandingSuggestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingSuggestionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
