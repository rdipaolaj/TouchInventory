// src/app/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// Angular Material
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

// Para la detección de pantallas pequeñas (responsive)
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

// RouterModule para routerLink y router-outlet
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isScreenSmall = false;

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit() {
    this.breakpointObserver.observe([Breakpoints.HandsetPortrait, Breakpoints.HandsetLandscape])
      .subscribe(result => {
        this.isScreenSmall = result.matches;
      });
  }

  onLogout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}
