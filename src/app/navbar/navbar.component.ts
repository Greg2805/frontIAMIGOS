import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { TitleCasePipe, NgIf } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, TitleCasePipe, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  @Input({ required: true }) title!: string;
  currentRoute: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Initialiser la route actuelle
    this.currentRoute = this.router.url;

    // Suivre les changements de route
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentRoute = event.urlAfterRedirects;
    });
  }

  // Vérifier si on est sur la page de connexion
  isConnectionPage(): boolean {
    return this.currentRoute.includes('/connection');
  }
}
