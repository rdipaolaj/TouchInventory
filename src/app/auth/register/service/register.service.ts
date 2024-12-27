import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiResponse } from '../../../shared/models/api-response.model';
import { CreateUserCommand, CreateUserResponse } from '../models/register.models';

@Injectable({
    providedIn: 'root'
})
export class RegisterService {
    private baseUrl = 'http://localhost:5106/touch/user/api/v1/User';

    constructor(private http: HttpClient) { }

    createUser(command: CreateUserCommand): Observable<ApiResponse<CreateUserResponse>> {
        const url = `${this.baseUrl}/create`;
        return this.http.post<ApiResponse<CreateUserResponse>>(url, command);
    }
}