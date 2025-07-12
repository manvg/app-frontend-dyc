import { Component, Output, EventEmitter, HostListener } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [RouterModule, NgIf, NgFor]
})
export class NavbarComponent {
  @Output() cerrarSesion = new EventEmitter<void>();

  isPanelAdmin = false;

  menuAbierto = false;

  readonly linksAdmin = [
    { label: 'Panel de Administración', route: '/panel-admin' },
    { label: 'Productos', route: '/mantenedor-productos' },
    { label: 'Tipos de Producto', route: '/mantenedor-tipo-producto' },
    { label: 'Materiales', route: '/mantenedor-materiales' },
    { label: 'Solicitudes', route: '/visualizador-solicitudes' }
  ];

  private readonly rutasAdmin = [
    '/panel-admin',
    '/mantenedor-productos',
    '/mantenedor-tipo-producto',
    '/mantenedor-materiales',
    '/visualizador-solicitudes'
  ];

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.isPanelAdmin = this.rutasAdmin.some(ruta =>
          this.router.url.startsWith(ruta)
        );
        this.menuAbierto = false;
      });
  }

  toggleMenu(): void {
    this.menuAbierto = !this.menuAbierto;
  }

  closeMenu(): void {
    this.menuAbierto = false;
  }

  onLogoutClick(): void {
    this.cerrarSesion.emit();
    this.closeMenu();
  }

  @HostListener('window:resize', [])
  onResize() {
    if (window.innerWidth > 900 && this.menuAbierto) {
      this.menuAbierto = false;
    }
  }
}
