import { Routes } from '@angular/router';
import { MantenedorProductosComponent } from './components/mantenedor-productos/mantenedor-productos.component';
import { LoginComponent } from './components/login/login.component';
import { LoginCallbackComponent } from './components/login-callback/login-callback.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'productos', component: MantenedorProductosComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'login/callback', component: LoginCallbackComponent },
  { path: '**', redirectTo: '' }
];
