// login.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiResponse } from '../../../shared/models/api-response.model';
import { LoginCommand, AuthUserResponse } from '../models/login.models';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private baseUrl = 'http://localhost:5063/touch/auth/api/v1/Login';

    constructor(private http: HttpClient) { }

    login(command: LoginCommand): Observable<ApiResponse<AuthUserResponse>> {
        const url = `${this.baseUrl}/login`;
        return this.http.post<ApiResponse<AuthUserResponse>>(url, command);
    }
}