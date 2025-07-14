import { Routes } from '@angular/router';
import { MantenedorProductosComponent } from './components/administracion/mantenedor-productos/mantenedor-productos.component';
import { LoginComponent } from './auth/login/login.component';
import { LoginCallbackComponent } from './auth/login-callback/login-callback.component';
import { HomeComponent } from './components/public/home/home.component';
import { authGuard } from './guards/auth.guard';
import { ListaServiciosComponent } from './components/public/servicios/lista-servicios/lista-servicios.component';
import { DetalleServicioComponent } from './components/public/servicios/detalle-servicio/detalle-servicio.component';
import { ListaTiposProductoComponent } from './components/public/producto/lista-tipos-producto/lista-tipos-producto.component';
import { ListaProductosComponent } from './components/public/producto/lista-productos/lista-productos.component';
import { PanelAdminComponent } from './components/administracion/panel-admin/panel-admin.component';
import { PersonalizadaComponent } from './components/public/solicitudes/personalizada/personalizada.component';
import { MantenedorTipoProductoComponent } from './components/administracion/mantenedor-tipo-producto/mantenedor-tipo-producto.component';
import { MantenedorMaterialesComponent } from './components/administracion/mantenedor-materiales/mantenedor-materiales.component';
import { SolicitudProductoComponent } from './components/public/solicitudes/solicitud-producto/solicitud-producto.component';
import { SolicitudServicioComponent } from './components/public/solicitudes/solicitud-servicio/solicitud-servicio.component';
import { GestionSolicitudesComponent } from './components/administracion/gestion-solicitudes/gestion-solicitudes.component';
import { DetalleProductoComponent } from './components/public/producto/detalle-producto/detalle-producto.component';
import { MantenedorServiciosComponent } from './components/administracion/mantenedor-servicios/mantenedor-servicios.component';
import { FormularioServicioComponent } from './components/administracion/formulario-servicio/formulario-servicio.component';
import { DetalleSolicitudComponent } from './components/administracion/detalle-solicitud/detalle-solicitud.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'servicios', component: ListaServiciosComponent },
  { path: 'servicios/:idServicio', component: DetalleServicioComponent },
  { path: 'productos', component: ListaTiposProductoComponent },
  { path: 'productos/:idTipoProducto', component: ListaProductosComponent },
  { path: 'pedido-personalizado', component: PersonalizadaComponent},
  { path: 'productos/:idProducto/solicitar', component: SolicitudProductoComponent },
  { path: 'servicios/:idServicio/solicitar', component: SolicitudServicioComponent },
  { path: 'detalle-producto/:idProducto', component: DetalleProductoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/callback', component: LoginCallbackComponent },
  { path: 'mantenedor-productos', component: MantenedorProductosComponent, canActivate: [authGuard] },
  { path: 'mantenedor-tipo-producto', component: MantenedorTipoProductoComponent, canActivate: [authGuard] },
  { path: 'panel-admin', component: PanelAdminComponent, canActivate: [authGuard] },
  { path: 'mantenedor-materiales', component: MantenedorMaterialesComponent, canActivate: [authGuard] },
  { path: 'gestion-solicitudes', component: GestionSolicitudesComponent, canActivate: [authGuard] },
  { path: 'mantenedor-servicios', component: MantenedorServiciosComponent, canActivate: [authGuard] },
  { path: 'formulario-servicio', component: FormularioServicioComponent, canActivate: [authGuard] },
  { path: 'solicitudes/:id', component: DetalleSolicitudComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];

