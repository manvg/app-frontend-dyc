import { Routes } from '@angular/router';
import { MantenedorProductosComponent } from './components/mantenedor-productos/mantenedor-productos.component';
import { LoginComponent } from './components/login/login.component';
import { LoginCallbackComponent } from './components/login-callback/login-callback.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';
import { ListaServiciosComponent } from './components/servicios/lista-servicios/lista-servicios.component';
import { DetalleServicioComponent } from './components/servicios/detalle-servicio/detalle-servicio.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'servicios', component: ListaServiciosComponent },
  { path: 'servicios/:idServicio', component: DetalleServicioComponent },
  { path: 'productos', component: MantenedorProductosComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'login/callback', component: LoginCallbackComponent },
  { path: '**', redirectTo: '' }
];
