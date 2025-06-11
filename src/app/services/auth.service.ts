import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

interface LoginResponse {
  token: string;
  user: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private readonly API_URL = 'api/auth';
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'current_user';

  constructor(private http: HttpClient) {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    const token = localStorage.getItem(this.TOKEN_KEY) || sessionStorage.getItem(this.TOKEN_KEY);
    const userData = localStorage.getItem(this.USER_KEY) || sessionStorage.getItem(this.USER_KEY);

    if (token && userData) {
      try {
        this.currentUserSubject.next(JSON.parse(userData));
      } catch (e) {
        this.logout();
      }
    }
  }

  login(email: string, password: string, rememberMe = false): Observable<LoginResponse> {
    // Version mock pour test - À REMPLACER PAR VOTRE API RÉELLE EN PRODUCTION
    if (email === 'test@example.com' && password === 'password123') {
      const mockResponse = {
        token: 'fake-jwt-token',
        user: { id: 1, name: 'Utilisateur Test', email: 'test@example.com' }
      };

      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem(this.TOKEN_KEY, mockResponse.token);
      storage.setItem(this.USER_KEY, JSON.stringify(mockResponse.user));
      this.currentUserSubject.next(mockResponse.user);

      return of(mockResponse);
    }

    // Renvoyez une erreur pour les autres identifiants
    return throwError(() => ({ error: { message: 'Identifiants incorrects' } }));

    // Version API réelle - à décommenter quand votre backend est prêt
    /*
    return this.http.post<LoginResponse>(`${this.API_URL}/login`, { email, password })
      .pipe(
        tap(response => {
          const storage = rememberMe ? localStorage : sessionStorage;
          storage.setItem(this.TOKEN_KEY, response.token);
          storage.setItem(this.USER_KEY, JSON.stringify(response.user));
          this.currentUserSubject.next(response.user);
        }),
        catchError(error => {
          return throwError(() => error);
        })
      );
    */
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.USER_KEY);
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY) || sessionStorage.getItem(this.TOKEN_KEY);
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }
}
