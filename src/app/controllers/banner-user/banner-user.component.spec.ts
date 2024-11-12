import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerUserComponent } from './banner-user.component';

describe('BannerUserComponent', () => {
  let component: BannerUserComponent;
  let fixture: ComponentFixture<BannerUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
