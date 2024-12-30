// src/app/auth/role.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);

    const rawUserRole = localStorage.getItem('userRoleValue');
    const userRole = parseInt(rawUserRole || '0', 10);

    console.log('[roleGuard] userRoleValue desde localStorage:', rawUserRole);
    console.log('[roleGuard] userRole (convertido a número):', userRole);

    const allowedRoles = route.data?.['roles'] || [];
    console.log('[roleGuard] allowedRoles para esta ruta:', allowedRoles);

    if (allowedRoles.includes(userRole)) {
        console.log('[roleGuard] Acceso permitido');
        return true;
    } else {
        console.warn('[roleGuard] Acceso denegado. Redirigiendo a la página de acceso denegado.');
        router.navigate(['/access-denied']);
        return false; 
    }
};
