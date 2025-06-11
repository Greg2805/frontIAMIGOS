import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, timeout } from 'rxjs/operators';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DirectionService {
  // Utiliser une configuration par environnement
  private apiUrl: string;

  constructor(private http: HttpClient) {
    // Pour le déploiement, vous pourriez vouloir configurer ceci dans votre environment.ts
    // Ceci est un exemple, vous devrez adapter selon votre structure
    //this.apiUrl = 'http://192.168.1.40:5000/direction';
    this.apiUrl = environment.apiUrl;
  }

  // Options HTTP complètes
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

  sendDirection(direction: string): Observable<any> {
    console.log(`Envoi de la direction: ${direction} à ${this.apiUrl}`);

    return this.http.post(this.apiUrl, { direction }, this.getHttpOptions())
      .pipe(
        // Réessayer une fois en cas d'échec
        retry(1),
        // Définir un délai d'attente de 5 secondes
        timeout(5000),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Détail de l\'erreur DirectionService:', error);

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
