import { Routes } from '@angular/router';
import { MantenedorProductosComponent } from './components/mantenedor-productos/mantenedor-productos.component';

export const routes: Routes = [
  { path: '', redirectTo: 'productos', pathMatch: 'full' },
  { path: 'productos', component: MantenedorProductosComponent }
];
