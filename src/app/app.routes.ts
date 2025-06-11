import { Routes } from '@angular/router';
import { HomeComponent } from './accueil/accueil.component';
import { ControlComponent } from "./control/control.component";
import { ConnectionComponent } from "./connection/connection.component";
import { IaComponent } from './ia/ia.component';


export const routes: Routes = [
  { path: 'control', component: ControlComponent },
  { path: 'connection', component: ConnectionComponent },
  { path: 'home', component: HomeComponent },   // Route explicite pour HomeComponent
  { path: '', redirectTo: '/connection', pathMatch: 'full' },
  { path: 'ia', component: IaComponent },  // Redirection par défaut
  { path: '**', redirectTo: '/connection' }     // Route pour les URL non trouvées
];
