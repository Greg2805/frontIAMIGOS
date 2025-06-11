import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, timeout } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class Point_of_interestService {

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = 'http://localhost:5000/salle';
  }

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      // Ne pas utiliser withCredentials si le serveur ne le supporte pas
      withCredentials: false
    };
  }

  sendPoint(point: string): Observable<any> {
    console.log(`Envoi de la salle: ${point} à ${this.apiUrl}`);

    return this.http.post(this.apiUrl, { salle: point }, this.getHttpOptions())
      .pipe(
        // Réessayer une fois en cas d'échec
        retry(1),
        // Définir un délai d'attente de 5 secondes
        timeout(5000),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Détail de l\'erreur Point_of_interestService:', error);

    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = `Erreur: ${error.error.message}`;
    } else if (error.status === 0) {
      // Erreur CORS ou réseau
      errorMessage = 'Erreur de connexion au serveur. Vérifiez que le serveur est bien démarré et accessible.';
    } else {
      // Erreur du serveur
      errorMessage = `Code: ${error.status}, Message: ${error.message}`;
    }

    // Renvoyer un observable avec un message d'erreur
    return throwError(() => new Error(errorMessage));
  }
}
