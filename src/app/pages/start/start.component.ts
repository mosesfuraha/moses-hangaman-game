import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrl: './start.component.css',
})
export class StartComponent {
  constructor(private router: Router) {}

  navigateToCategory() {
    this.router.navigate(['/category']);
  }
}
