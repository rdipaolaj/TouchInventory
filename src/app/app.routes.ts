import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductFormComponent } from './products/product-form/product-form.component';
import { ProfileComponent } from './user/profile/profile.component';
import { ProfileEditComponent } from './user/profile-edit/profile-edit.component';

export const routes: Routes = [
    // ========= Redirección por defecto al Login =========
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' },

    // ============= Rutas de Autenticación ==============
    { path: 'auth/login', component: LoginComponent },
    { path: 'auth/register', component: RegisterComponent },
    { path: 'auth/forgot-password', component: ForgotPasswordComponent },

    // =============== Rutas de Dashboard ================
    { path: 'dashboard', component: DashboardComponent },

    // =============== Rutas de Productos =================
    { path: 'products/list', component: ProductListComponent },
    { path: 'products/create', component: ProductFormComponent },
    { path: 'products/edit/:id', component: ProductFormComponent },

    // =============== Rutas de Usuario ===================
    { path: 'user/profile', component: ProfileComponent },
    { path: 'user/profile-edit', component: ProfileEditComponent },

    // ======== Wildcard (cualquier ruta no definida) =====
    // Opcionalmente puedes redirigir de nuevo a login o a una página "not found"
    { path: '**', redirectTo: 'auth/login' },
];
