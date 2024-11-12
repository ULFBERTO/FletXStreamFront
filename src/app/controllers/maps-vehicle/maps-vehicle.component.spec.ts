import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsVehicleComponent } from './maps-vehicle.component';

describe('MapsVehicleComponent', () => {
  let component: MapsVehicleComponent;
  let fixture: ComponentFixture<MapsVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapsVehicleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapsVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
