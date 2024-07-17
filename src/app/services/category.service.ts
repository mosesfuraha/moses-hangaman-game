import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import categoriesData from '../../data.json';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categories = categoriesData.categories;

  constructor() {}

  getCategories(): Observable<any> {
    return of(this.categories);
  }
}
