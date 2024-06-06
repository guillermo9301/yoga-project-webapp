import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:8080/auth';

    constructor(private http: HttpClient) { }

    login(credentials: { email: string, password: string }): Observable<any> {
        return this.http.post(`${this.apiUrl}/login`, credentials);
    }

    register(data: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, data);
    }

    // Método para almacenar el token en el almacenamiento local
    setToken(token: string): void {
        localStorage.setItem('authToken', token);
    }

    // Método para obtener el token desde el almacenamiento local
    getToken(): string | null {
        return localStorage.getItem('authToken');
    }

    // Método para eliminar el token (logout)
    logout(): void {
        localStorage.removeItem('authToken');
    }

    // Método para verificar si el usuario está autenticado
    isLoggedIn(): boolean {
        return this.getToken() !== null;
    }
}
