// src/app/auth/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);

    // Verificamos si existe un token válido
    const jwtToken = localStorage.getItem('jwtToken');
    const tokenExpiry = localStorage.getItem('tokenExpiry');

    if (jwtToken && tokenExpiry && !isTokenExpired(tokenExpiry)) {
        // El usuario está logueado y el token no ha expirado
        return true;
    } else {
        // Redirigimos al login
        router.navigate(['/auth/login']);
        return false;
    }
};

// función auxiliar para chequear si la fecha es mayor a "ahora"
function isTokenExpired(expiry: string): boolean {
    const now = new Date();
    const expDate = new Date(expiry);
    return expDate.getTime() <= now.getTime();
}