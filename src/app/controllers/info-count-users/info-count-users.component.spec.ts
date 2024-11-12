import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCountUsersComponent } from './info-count-users.component';

describe('InfoCountUsersComponent', () => {
  let component: InfoCountUsersComponent;
  let fixture: ComponentFixture<InfoCountUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoCountUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoCountUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
