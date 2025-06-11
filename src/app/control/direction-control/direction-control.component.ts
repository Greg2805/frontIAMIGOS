import {Component, inject, OnInit} from '@angular/core';
import {DirectionService} from "../../services/direction.service";


@Component({
  selector: 'app-direction-control',
  templateUrl: './direction-control.component.html',
  standalone: true,
  styleUrls: ['./direction-control.component.scss']
})
export class DirectionControlComponent implements OnInit {

  private readonly directionService = inject(DirectionService);
  ngOnInit(): void {
  }

  // moveRobot(direction: string): void {
  //   console.log(`Déplacement: ${direction}`);
  //   // Logique pour déplacer le robot
  // }

  onDirectionClick(direction: string) {
    this.directionService.sendDirection(direction).subscribe(
      response => console.log('Direction envoyée:', response),
      error => console.error('Erreur:', error)
    );
  }

  // stopMovement(): void {
  //   console.log('Arrêt du mouvement');
  //   // Logique pour arrêter le mouvement
  // }
}
