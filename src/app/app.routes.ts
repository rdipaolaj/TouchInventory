// src/app/app.routes.ts
import { Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductFormComponent } from './products/product-form/product-form.component';
import { ProfileComponent } from './user/profile/profile.component';
import { ProfileEditComponent } from './user/profile-edit/profile-edit.component';

// Importas el authGuard
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
    // ========= Redirección por defecto al Login =========
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' },

    // ============= Rutas de Autenticación ==============
    { path: 'auth/login', component: LoginComponent },
    { path: 'auth/register', component: RegisterComponent },
    { path: 'auth/forgot-password', component: ForgotPasswordComponent },

    // =============== Rutas de Dashboard (protegido) ================
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard]
    },

    // =============== Rutas de Productos (protegidas) ===============
    {
        path: 'products/list',
        component: ProductListComponent,
        canActivate: [authGuard]
    },
    {
        path: 'products/create',
        component: ProductFormComponent,
        canActivate: [authGuard]
    },
    {
        path: 'products/edit/:id',
        component: ProductFormComponent,
        canActivate: [authGuard]
    },

    // =============== Rutas de Usuario (protegidas) =================
    {
        path: 'user/profile',
        component: ProfileComponent,
        canActivate: [authGuard]
    },
    {
        path: 'user/profile-edit',
        component: ProfileEditComponent,
        canActivate: [authGuard]
    },

    // ======== Wildcard (cualquier ruta no definida) =====
    { path: '**', redirectTo: 'auth/login' },
];
