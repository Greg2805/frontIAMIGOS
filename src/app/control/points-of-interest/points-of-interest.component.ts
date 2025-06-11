import {Component, inject, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {Point_of_interestService} from "../../services/point_of_interest.service";

@Component({
  selector: 'app-points-of-interest',
  templateUrl: './points-of-interest.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  styleUrls: ['./points-of-interest.component.scss']
})
export class PointsOfInterestComponent implements OnInit {

  private readonly pointService = inject(Point_of_interestService);

  points: string[] = ['P217', 'A201', 'B207', 'P212'];
  newPoint: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  goToStation(): void {
    console.log('Retour à la station');
    // Logique pour le retour à la station
  }

  goToPoint(point: string): void {
    console.log(`Navigation vers: ${point}`);
    // Logique pour naviguer vers un point
  }

  addNewPoint(): void {
    if (this.newPoint.trim()) {
      this.points.push(this.newPoint.trim());
      this.newPoint = '';
    }
  }

  onPointClick(point: string) {
    console.log(`Navigation vers: ${point}`);
    this.pointService.sendPoint(point).subscribe(
      response => console.log('Salle envoyée:', response),
      error => console.error('Erreur:', error)
    );
  }


}
