import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-panel-admin',
  standalone: true,
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.scss']
})
export class PanelAdminComponent implements OnInit {
  usuario = 'Usuario';
  private readonly oidcSecurityService = inject(OidcSecurityService);

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.oidcSecurityService.userData$.subscribe(({ userData }) => {
      this.usuario =
        userData?.name ||
        userData?.given_name ||
        userData?.email ||
        'Usuario';
    });
  }

  irAMantenedorProductos() {
    this.router.navigate(['/mantenedor-productos']);
  }

  irAMantenedorTipos() {
    this.router.navigate(['/mantenedor-tipos-productos']);
  }

  irAVisualizadorSolicitudes() {
    this.router.navigate(['/visualizador-solicitudes']);
  }
}
