import { Routes } from '@angular/router';
import { MantenedorProductosComponent } from './components/mantenedor-productos/mantenedor-productos.component';
import { LoginComponent } from './components/login/login.component';
import { LoginCallbackComponent } from './components/login-callback/login-callback.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';
import { ListaServiciosComponent } from './components/servicios/lista-servicios/lista-servicios.component';
import { DetalleServicioComponent } from './components/servicios/detalle-servicio/detalle-servicio.component';
import { ListaTiposProductoComponent  } from './components/productos/lista-tipos-producto/lista-tipos-producto.component';
import { ListaProductosComponent } from './components/productos/lista-productos/lista-productos.component';
import { PanelAdminComponent } from './components/panel-admin/panel-admin.component';
import { PersonalizadaComponent } from './components/solicitudes/personalizada/personalizada.component';
import { MantenedorTipoProductoComponent } from './components/mantenedor-tipo-producto/mantenedor-tipo-producto.component';
import { MantenedorMaterialesComponent } from './components/mantenedor-materiales/mantenedor-materiales.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'servicios', component: ListaServiciosComponent },
  { path: 'servicios/:idServicio', component: DetalleServicioComponent },
  { path: 'productos', component: ListaTiposProductoComponent },
  { path: 'productos/:idTipoProducto', component: ListaProductosComponent },
  { path: 'pedido-personalizado', component: PersonalizadaComponent},
  { path: 'login', component: LoginComponent },
  { path: 'login/callback', component: LoginCallbackComponent },
  { path: 'mantenedor-productos', component: MantenedorProductosComponent, canActivate: [authGuard] },
  { path: 'mantenedor-tipo-producto', component: MantenedorTipoProductoComponent, canActivate: [authGuard] },
  { path: 'panel-admin', component: PanelAdminComponent, canActivate: [authGuard] },
  { path: 'mantenedor-materiales', component: MantenedorMaterialesComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];

