import { Component, Output, EventEmitter } from '@angular/core';
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

  // Links visibles en el menú admin
  readonly linksAdmin = [
    { label: 'Panel de Administración', route: '/panel-admin' },
    { label: 'Productos', route: '/mantenedor-productos' },
    { label: 'Tipos de Producto', route: '/mantenedor-tipo-producto' },
    { label: 'Solicitudes', route: '/visualizador-solicitudes' }
  ];

  private readonly rutasAdmin = [
    '/panel-admin',
    '/mantenedor-productos',
    '/mantenedor-tipo-producto',
    '/visualizador-solicitudes'
  ];

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.isPanelAdmin = this.rutasAdmin.some(ruta =>
          this.router.url.startsWith(ruta)
        );
      });
  }

  onLogoutClick(): void {
    this.cerrarSesion.emit();
  }
}
