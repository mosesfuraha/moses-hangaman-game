import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { SinglecategoryComponent } from './singlecategory.component';
import { CategoryService } from '../../services/category.service';
import { ModalService } from '../../services/modal.service';

import { of } from 'rxjs';
import { fakeAsync, tick } from '@angular/core/testing';

describe('SinglecategoryComponent', () => {
  let component: SinglecategoryComponent;
  let fixture: ComponentFixture<SinglecategoryComponent>;
  let modalService: jest.Mocked<ModalService>;

  beforeEach(async () => {
    const categoryService = {
      getCategories: () => of({ Sports: [{ name: 'soccer' }] }),
    };
    modalService = {
      showModal: jest.fn(),
    } as any;

    await TestBed.configureTestingModule({
      declarations: [SinglecategoryComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => {
                  if (key === 'category') return 'Sports';
                  if (key === 'selected') return 'selectedValue';
                  return null;
                },
              },
            },
          },
        },
        { provide: CategoryService, useValue: categoryService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SinglecategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with the correct category and word', () => {
    expect(component.category).toBe('Sports');
    expect(component.selectedWord).toBe('soccer');

    expect(component.revealedLetters.size).toBeGreaterThan(0);

    expect(component.word.join('')).toBe(
      'soccer'
        .split('')
        .map((char) =>
          component.revealedLetters.has(char.toUpperCase()) ? char : ''
        )
        .join('')
    );
  });
  it('should select random word', () => {
    const words = [{ name: 'soccer' }, { name: 'basketball' }];
    const randomMath = Math.random;
    Math.random = jest.fn(() => 0.5);
    const randomWord = component.getRandomWord(words);
    expect(randomWord).toBe('basketball');
    Math.random = randomMath;
  });

  it('it should reveal initial characters', () => {
    const word = 'hangman';
    const randomMath = Math.random; //predicts the random values
    const randomValues = [0.1, 0.4, 0.7];
    let randomeIndex = 0;
    Math.random = jest.fn(
      () => randomValues[randomeIndex++ % randomValues.length]
    );
    component.revealInitialCharacters(word);
    const expectedRevealNum = Math.floor(word.length / 3);
    expect(component.revealedLetters.size).toBe(expectedRevealNum);

    Math.random = randomMath;
  });
  it('should handle an empty string', () => {
    const word = '';
    component.revealInitialCharacters(word);
    expect(component.revealedLetters.size).toBe(0);
  });

  it('should  handle short strings', () => {
    const word = 'hi';
    component.revealInitialCharacters(word);
    expect(component.revealedLetters.size).toBeLessThanOrEqual(word.length);
  });
  it('should not reveal more characters than necessary', () => {
    const word = 'example';
    component.revealInitialCharacters(word);
    const initialSize = component.revealedLetters.size;
    component.revealInitialCharacters(word);
    expect(component.revealedLetters.size).toBe(initialSize);
  });
  it('should treat characters case-insensitively', () => {
    const word = 'Example';
    component.revealInitialCharacters(word);
    component.revealedLetters.forEach((char: string) => {
      expect(char).toBe(char.toUpperCase());
    });
  });
  it('should handle special characters and numbers', () => {
    const word = '1234!@#$%^&*()_+';
    component.revealInitialCharacters(word);
    const numToReveal = Math.floor(word.length / 3);
    expect(component.revealedLetters.size).toBe(numToReveal);
  });

  it('should reveal the correct number of characters', () => {
    const word = 'hangman';
    component.revealInitialCharacters(word);
    const numToReveal = Math.floor(word.length / 3);
    expect(component.revealedLetters.size).toBe(numToReveal);
  });

  //when the guess  is correct
  it('should handle a correct guess', () => {
    component.selectedWord = 'soccer';
    component.revealInitialCharacters('soccer');
    component.guessLetter('S');
    expect(component.guessedLetters.has('S')).toBe(true);
    expect(component.remainingAttempts).toBe(8);
    // expect(component.word.join('')).toContain('S');
  });

  //when the guess is  incorrect
  it('should handle an incorrect guess', () => {
    component.selectedWord = 'soccer';
    component.revealInitialCharacters('soccer');
    component.guessLetter('Z'); // Incorrect guess
    expect(component.guessedLetters.has('Z')).toBe(true);
    expect(component.remainingAttempts).toBe(7); // Decreased by 1
    expect(component.word.join('')).not.toContain('Z');
  });

  //when attempts are done
  it('should handle when all attempts are done', () => {
    const incorrectGuesses = ['Z', 'X', 'Q', 'W', 'R', 'T', 'Y', 'U'];
    incorrectGuesses.forEach((letter) => component.guessLetter(letter));
    expect(component.remainingAttempts).toBe(0);
    expect(modalService.showModal).toHaveBeenCalledWith('lose');
  });
});
