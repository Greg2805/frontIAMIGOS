import { Component, Input } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-feature-card',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './feature-card.component.html',
  styleUrl: './feature-card.component.scss',

})
export class FeatureCardComponent {
  @Input() icon: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() route: string = '';
}
