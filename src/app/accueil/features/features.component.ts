import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureCardComponent } from './feature-card/feature-card.component';
import {RouterLink} from "@angular/router";

interface Feature {
  icon: string;
  title: string;
  description: string;
  route: string;
}

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
  standalone: true,
  imports: [CommonModule, FeatureCardComponent],
})
export class FeaturesComponent {
  features: Feature[] = [
    {
      icon: '🎮',
      title: 'Contrôle intuitif',
      description: 'Interface simple et réactive pour piloter votre robot avec précision.',
      route: '/control'
    },
    {
      icon: '🤖',
      title: 'Communication avec l\'IA',
      description: 'Discutez ou envoyez des commandes à l’intelligence artificielle du robot.',
      route: '/ia' // Mets ici la route si tu veux rediriger vers une page dédiée, sinon laisse vide
    }
    // {
    //   icon: '📊',
    //   title: 'Analyse de données',
    //   description: 'Visualisez et analysez les données collectées par votre robot.',
    //   route: '/data'
    // },
    // {
    //   icon: '🔄',
    //   title: 'Temps réel',
    //   description: 'Recevez les informations de votre robot instantanément sans délai.',
    //   route: '/dashboard'
    // }
  ];
}
