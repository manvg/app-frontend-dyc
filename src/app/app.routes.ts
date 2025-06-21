import { Routes } from '@angular/router';
import { MantenedorProductosComponent } from './components/mantenedor-productos/mantenedor-productos.component';
import { LoginComponent } from './components/login/login.component';
import { LoginCallbackComponent } from './components/login-callback/login-callback.component'
import { AuthGuard } from './services/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'productos', component: MantenedorProductosComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'login/callback', component: LoginCallbackComponent }
];
