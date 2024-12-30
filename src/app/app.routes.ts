// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { AccessDeniedComponent } from './shared/access-denied/access-denied.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './auth/auth.guard';
import { roleGuard } from './auth/role.guard';

import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductFormComponent } from './products/product-form/product-form.component';
import { ProfileComponent } from './user/profile/profile.component';
import { ProfileEditComponent } from './user/profile-edit/profile-edit.component';

import { HomeDashboardComponent } from './dashboard/home-dashboard.component';

export const routes: Routes = [
  // Rutas públicas
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'auth/forgot-password', component: ForgotPasswordComponent },
  
  // RUTA DE ACCESO DENEGADO
  { path: 'access-denied', component: AccessDeniedComponent },

  // RUTA PADRE "dashboard" PROTEGIDA
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },

      // Home interno del dashboard
      { path: 'home', component: HomeDashboardComponent },

      // Sub-rutas de productos
      {
        path: 'products',
        children: [
          { path: 'list', component: ProductListComponent, canActivate: [roleGuard], data: { roles: [1, 2] } }, // Admin y empleados
          { path: 'create', component: ProductFormComponent, canActivate: [roleGuard], data: { roles: [1] } }, // Solo administradores
          { path: 'edit/:id', component: ProductFormComponent, canActivate: [roleGuard], data: { roles: [1] } } // Solo administradores
        ]
      },

      // Sub-rutas de usuario
      {
        path: 'user',
        children: [
          { path: 'profile', component: ProfileComponent, canActivate: [roleGuard], data: { roles: [1, 2] } }, // Admin y empleados
          { path: 'profile-edit', component: ProfileEditComponent, canActivate: [roleGuard], data: { roles: [1] } } // Solo administradores
        ]
      }
    ]
  },

  // Wildcard
  { path: '**', redirectTo: 'auth/login' },
];
