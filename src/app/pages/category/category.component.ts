import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent {
  categories = [
    'Movies',
    'TV Shows',
    'Countries',
    'Capital Cities',
    'Animals',
    'Sports',
  ];

  constructor(private router: Router) {}
  navigateToStart() {
    this.router.navigate(['/start']);
  }
  navigateToCategory(category: string) {
    this.router.navigate(['/category', category]);
  }
}
