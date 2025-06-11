import {Component, inject, OnInit, OnDestroy} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {robotConnexionService} from "../../services/robot-connexion.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-robot-status',
  templateUrl: './robot-status.component.html',
  standalone: true,
  imports: [NgClass, NgIf],
  styleUrls: ['./robot-status.component.scss']
})
export class RobotStatusComponent implements OnInit, OnDestroy {
  isConnected: boolean = false;
  robotState: string = 'Hors service';
  position: string = 'Inconnu';
  batteryLevel: number = 0;
  isSending: boolean = false;
  errorMessage: string = '';

  private connectionSubscription: Subscription | null = null;
  private readonly connexionService = inject(robotConnexionService);

  constructor() { }

  ngOnInit(): void {
    // S'abonner aux changements d'état de connexion
    this.connectionSubscription = this.connexionService.connectionState$.subscribe(
      (isConnected) => {
        this.isConnected = isConnected;
        this.robotState = this.isConnected ? 'En service' : 'Hors service';

        // Mettre à jour d'autres informations en fonction de l'état de connexion
        if (this.isConnected) {
          this.position = 'Hall d\'entrée';
          this.batteryLevel = 85;
        } else {
          this.position = 'Inconnu';
          this.batteryLevel = 0;
        }
      }
    );
  }

  ngOnDestroy(): void {
    // Se désabonner pour éviter les fuites de mémoire
    if (this.connectionSubscription) {
      this.connectionSubscription.unsubscribe();
    }
  }

  toggleConnection(): void {
    this.isSending = true;
    this.errorMessage = '';
    const newConnectionState = !this.isConnected;

    this.connexionService.setConnectionState(newConnectionState).subscribe({
      next: (response) => {
        this.isSending = false;

        // Vérifier la réponse du serveur
        if (response.status === 'error') {
          this.errorMessage = response.message || 'Erreur de communication avec le robot';
        }

        // Pas besoin de mettre à jour isConnected ici, car il sera mis à jour par l'abonnement
      },
      error: (error) => {
        this.isSending = false;
        this.errorMessage = 'Erreur de communication avec le serveur';
        console.error('Erreur lors de la tentative de connexion:', error);
      }
    });
  }
}
