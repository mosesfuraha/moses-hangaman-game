import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { Location } from '@angular/common';

import { CategoryComponent } from './category.component';
import { routes } from '../../app-routing.module'; 

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryComponent],
      imports: [RouterModule.forRoot(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have categories', () => {
    const expectedCategories = [
      'Movies',
      'TV Shows',
      'Countries',
      'Capital Cities',
      'Animals',
      'Sports',
    ];
    expect(component.categories).toEqual(expectedCategories);
    expect(component.categories.length).toBeGreaterThan(0);
  });

  it('should navigate to start', async () => {
    const navigateStartSpy = jest.spyOn(router, 'navigate');
    component.navigateToStart();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(navigateStartSpy).toHaveBeenCalledWith(['/start']);
  });

  it('should navigate to category', async () => {
    const navigateSpy = jest.spyOn(router, 'navigate');
    const category = 'Movies';
    component.navigateToCategory(category);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(navigateSpy).toHaveBeenCalledWith(['/category', category]);
  });
});
