import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class robotConnexionService {

  private apiUrl = 'http://localhost:5000/connexion';
  private connectionStateSubject = new BehaviorSubject<boolean>(false);
  connectionState$: Observable<boolean> = this.connectionStateSubject.asObservable();

  constructor(private http: HttpClient) { }

  setConnectionState(isConnected: boolean): Observable<any> {
    // Ne pas mettre à jour l'état immédiatement, attendre la confirmation

    // Envoyer l'état de connexion à l'API
    const connectionEndpoint = `${this.apiUrl}`;
    const payload = { connected: isConnected };

    return this.http.post(connectionEndpoint, payload).pipe(
      tap((response: any) => {
        // Mettre à jour l'état uniquement si le serveur confirme la connexion
        if (response.status === 'success' && response.confirmed === true) {
          this.connectionStateSubject.next(isConnected);
          console.log(`État de connexion confirmé: ${isConnected ? 'connecté' : 'déconnecté'}`);
        } else {
          console.warn('La connexion n\'a pas pu être confirmée par la Raspberry');
        }
      }),
      catchError(error => {
        console.error('Erreur lors de l\'envoi de l\'état de connexion', error);
        throw error;
      })
    );
  }
}
