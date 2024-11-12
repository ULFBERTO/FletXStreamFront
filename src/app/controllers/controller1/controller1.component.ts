import { Component, OnInit } from '@angular/core';
import { MyServiceService } from '../../services/servicePrueba/my-service.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth/Auth.service';
import { Router } from '@angular/router';
import { MapsVehicleComponent } from '../maps-vehicle/maps-vehicle.component';
import { DriverScheduleComponent } from '../driver-schedule/driver-schedule.component';
import { MenuBarComponent } from '../menu-bar/menu-bar.component';
import { NotificacionesComponent } from '../notificaciones/notificaciones.component';
import { LandingSuggestionComponent } from '../landing-suggestion/landing-suggestion.component';
import { InfoCountUsersComponent } from '../info-count-users/info-count-users.component';
import { CreateNewServiceComponent } from '../create-new-service/create-new-service.component';
import { BannerUserComponent } from "../banner-user/banner-user.component";

@Component({
  selector: 'app-controller1',
  standalone: true,
  imports: [CommonModule, HttpClientModule,
    MapsVehicleComponent,
    DriverScheduleComponent,
    MenuBarComponent,
    NotificacionesComponent,
    LandingSuggestionComponent,
    InfoCountUsersComponent,
    CreateNewServiceComponent, BannerUserComponent],
  templateUrl: './controller1.component.html',
  styleUrls: ['./controller1.component.css']
})
export class Controller1Component implements OnInit {
  Data: any[] = [];

  constructor(private myService: MyServiceService,
    private Auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('Invocando servicio para obtener postres');  // Log para verificar la invocación del servicio
    this.myService.getDesserts().subscribe(
      (data) => {
        this.Data = data;
      },
      (error) => {
        console.log('An error occurred:', error);
        alert('An error occurred: ' + error.message);
      }
    );
  }

  Logout(){
    console.log('Cerrando Secion');
    this.Auth.logout();
    this.router.navigate(['/login']);
  }
}
