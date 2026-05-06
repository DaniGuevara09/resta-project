import { Routes } from '@angular/router';
import { AutenticacionComponent } from './components/autentication/autentication';
import { ListProducts } from './components/list-products/list-products';

export const routes: Routes = [
    { path: '', component: AutenticacionComponent },
    { path: 'productos', component: ListProducts }
];