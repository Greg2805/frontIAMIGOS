import { Component } from '@angular/core';
import { FeaturesComponent } from './features/features.component';
import {NavbarComponent} from "../navbar/navbar.component";

@Component({
  selector: 'app-home',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss'],
  standalone: true,
  imports: [
    FeaturesComponent
  ]
})
export class HomeComponent {
}
