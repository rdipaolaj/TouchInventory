// src/app/app.routes.ts
import { Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './auth/auth.guard';

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

  // RUTA PADRE "dashboard" PROTEGIDA
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      // Al entrar a /dashboard se redirige a /dashboard/home
      { path: '', redirectTo: 'home', pathMatch: 'full' },

      // “Home” interno del dashboard
      { path: 'home', component: HomeDashboardComponent },

      // Sub-rutas de productos
      {
        path: 'products',
        children: [
          { path: 'list', component: ProductListComponent },
          { path: 'create', component: ProductFormComponent },
          { path: 'edit/:id', component: ProductFormComponent }
        ]
      },

      // Sub-rutas de usuario
      {
        path: 'user',
        children: [
          { path: 'profile', component: ProfileComponent },
          { path: 'profile-edit', component: ProfileEditComponent }
        ]
      }
    ]
  },

  // Wildcard
  { path: '**', redirectTo: 'auth/login' },
];