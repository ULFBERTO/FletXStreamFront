import { Component, OnInit, ViewChild, ElementRef, Renderer2,AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyServiceService } from '../../services/servicePrueba/my-service.service';
import { HostListener } from '@angular/core';


interface ChargeDetail {
  fecha_charge_star: string;
  v_Name_Statecharges: string;
}

interface Driver {
  v_NameDriver: string;
  n_numCel: string;
  locations: string;
  v_NameState: string;
  v_PlacaVehicles: string;
  charges: string; // IDs de charges
  chargeDetails?: ChargeDetail[]; // Detalles de cada charge
}

@Component({
  selector: 'app-driver-schedule',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './driver-schedule.component.html',
  styleUrls: ['./driver-schedule.component.css']
})
export class DriverScheduleComponent implements OnInit {
  daysOfWeek: string[] = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  days: { day: string, date: string }[] = [];
  startIndex: number = 0;
  drivers: Driver[] = [];
  
  @ViewChild('driversScrollContainer', { static: false }) driversScrollContainer: ElementRef | undefined;
 
  
  constructor(
    private renderer: Renderer2,
    private driverService: MyServiceService
  ) {}

  ngOnInit(): void {
    this.generateDays();
    this.loadDriversWithCharges();
    this.init();
  }




  loadDriversWithCharges(): void {
    this.driverService.getDriversWithCharges().subscribe((data) => {
      this.drivers = data;
      this.drivers.forEach(driver => {
        this.loadChargeDetails(driver);
      });
    });
  }

  loadChargeDetails(driver: Driver): void {
    if (driver.charges) {
      this.driverService.getDateChargesByIds(driver.charges).subscribe((details) => {
        driver.chargeDetails = details;
      });
    }
  }

  generateDays(): void {
    const today = new Date();
    this.days = [];
    for (let i = this.startIndex; i < this.startIndex + 7; i++) {
      const day = new Date(today);
      day.setDate(today.getDate() + i);
      this.days.push({
        day: this.daysOfWeek[day.getDay()],
        date: day.toLocaleDateString()
      });
    }
  }

  nextDays(): void {
    this.startIndex++;
    this.generateDays();
  }

  previousDays(): void {
    if (this.startIndex > 0) {
      this.startIndex--;
      this.generateDays();
    }
  }


  onScroll(event: any): void {
    const scrollLeft = event.target.scrollLeft;
  
    // Selecciona todos los elementos .grid-item2.driver-name en toda la página
    const driverItems = document.querySelectorAll('.grid-item2.driver-name');
  
    // Sincroniza el scroll de cada item, haciendo una afirmación de tipo
    driverItems.forEach((item: Element) => {
      // Asegúrate de que el tipo sea HTMLElement antes de acceder a sus propiedades
      const htmlItem = item as HTMLElement;
      htmlItem.scrollLeft = scrollLeft;
    });
  }



  init(): void {
    const checkElementsExist = setInterval(() => {
      try {
        const container = document.querySelectorAll('.grid-item2.driver-name');
        
        if (container.length > 0) {
          container.forEach(element => {
            try {
              // Aseguramos que estamos trabajando con un WheelEvent
              const wheelEvent = element as HTMLElement; // Aseguramos que element es un HTMLElement
              const targetElement = wheelEvent;  // En este caso, `wheelEvent` es el propio elemento
  
              const targetIndex = Array.from(container).findIndex(el => el.contains(targetElement));
              
              if (targetIndex !== -1) {
                // Aquí ya no usamos deltaY, ya que no es un WheelEvent
                this.startDrag(0, targetIndex);  // Puedes poner un valor por defecto en deltaY, por ejemplo, 0
              } else {
                console.warn('Elemento no encontrado en el contenedor');
              }
            } catch (error) {
              console.error('Error al manejar el elemento:', error);
            }
          });
          clearInterval(checkElementsExist); // Detener el setInterval una vez que se encuentren los elementos
        }
      } catch (error) {
        console.error('Error al intentar encontrar los elementos en el DOM:', error);
      }
    }, 100);
  }
  
  
  
  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent): void {
    if (this.driversScrollContainer) {
      const targetElement = event.target as HTMLElement;
      const container = document.querySelectorAll('.grid-item2.driver-name');
      const targetIndex = Array.from(container).findIndex(element => element.contains(targetElement));
      this.startDrag(event.deltaY, targetIndex);
    }
  }

  startDrag(deltaY: number, targetIndex: number): void {
    const scrollableElements = document.querySelectorAll('.grid-item2.driver-name');
    const scrollableElement = scrollableElements[targetIndex];
  
    if (scrollableElement) {
      const htmlElement = scrollableElement as HTMLElement;
      let isDown = false;
      let startX: number = 0;
      let scrollLeft: number = 0;

      // Ajustar el scroll horizontal con el valor de la rueda del ratón
      htmlElement.scrollLeft = htmlElement.scrollLeft + deltaY;

      htmlElement.addEventListener('mousedown', (e) => {
        isDown = true;
        htmlElement.classList.add('active');
        startX = e.pageX - htmlElement.offsetLeft;
        scrollLeft = htmlElement.scrollLeft;
      });

      htmlElement.addEventListener('mouseleave', () => {
        isDown = false;
        htmlElement.classList.remove('active');
      });

      htmlElement.addEventListener('mouseup', () => {
        isDown = false;
        htmlElement.classList.remove('active');
      });

      htmlElement.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - htmlElement.offsetLeft;
        const walk = (x - startX) * 3; // Ajusta la velocidad del desplazamiento
        htmlElement.scrollLeft = scrollLeft - walk;
      });

      // Manejo del tacto
      let startTouchX: number = 0;
      let scrollTouchLeft: number = 0;

      htmlElement.addEventListener('touchstart', (e) => {
        isDown = true;
        startTouchX = e.touches[0].pageX - htmlElement.offsetLeft;
        scrollTouchLeft = htmlElement.scrollLeft;
      });

      htmlElement.addEventListener('touchend', () => {
        isDown = false;
      });

      htmlElement.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - htmlElement.offsetLeft;
        const walk = (x - startTouchX) * 3; // Ajusta la velocidad del desplazamiento
        htmlElement.scrollLeft = scrollTouchLeft - walk;
      });
    }
  }
  
}
