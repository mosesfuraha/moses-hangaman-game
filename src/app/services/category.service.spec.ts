import { TestBed } from '@angular/core/testing';

import { CategoryService } from './category.service';
import categoriesData from '../../data.json';
import { of } from 'rxjs';
describe('CategoryService', () => {
  let service: CategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('it should return categories data', (done) => {
    const expectedData = categoriesData.categories;
    jest.spyOn(service, 'getCategories').mockReturnValue(of(expectedData));
    service.getCategories().subscribe((categories) => {
      expect(categories).toEqual(expectedData);
      done();
    });
  });
});
