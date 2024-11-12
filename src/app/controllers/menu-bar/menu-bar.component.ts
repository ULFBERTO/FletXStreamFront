import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-bar',
  standalone: true,
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent {

    // Método para alternar el estado del submenú (expandir/colapsar)
    toggleSubmenu(event: Event): void {
      const target = event.target as HTMLElement;
      const parentLi = target.closest('li') as HTMLElement;
      const arrow = target.classList.contains('arrow') ? target : target.querySelector('.arrow');
  
      if (parentLi && arrow) {
        // Verificar si el <li> tiene un submenú y alternar la clase 'open'
        const submenu = parentLi.querySelector('.submenu');
        if (submenu) {
          parentLi.classList.toggle('open');
          arrow.classList.toggle('open'); // Alternar la clase 'open' en el encabezado h1
        }
      }
    }
  }
  