import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { SinglecategoryComponent } from './singlecategory.component';
import { CategoryService } from '../../services/category.service';
import { of } from 'rxjs';

describe('SinglecategoryComponent', () => {
  let component: SinglecategoryComponent;
  let fixture: ComponentFixture<SinglecategoryComponent>;

  beforeEach(async () => {
    const categorySerice = {
      getCategories: () => of({ Sport: [{ selected: 'soccer' }] }),
    };

    await TestBed.configureTestingModule({
      declarations: [SinglecategoryComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => (key === 'category' ? 'Sport' : null),
              },
            },
          },
        },
        { provide: CategoryService, useValue: categorySerice },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SinglecategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
