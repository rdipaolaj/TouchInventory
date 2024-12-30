// src/app/auth/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const jwtToken = localStorage.getItem('jwtToken');
    const tokenExpiry = localStorage.getItem('tokenExpiry');

    if (jwtToken && tokenExpiry && !isTokenExpired(tokenExpiry)) {
        return true;
    } else {
        router.navigate(['/auth/login']);
        return false;
    }
};

function isTokenExpired(expiry: string): boolean {
    const now = new Date();
    const expDate = new Date(expiry);
    return expDate.getTime() <= now.getTime();
}