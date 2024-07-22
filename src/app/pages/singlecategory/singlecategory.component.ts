import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-singlecategory',
  templateUrl: './singlecategory.component.html',
  styleUrls: ['./singlecategory.component.css'],
})
export class SinglecategoryComponent implements OnInit {
  category!: string;
  lettersRow1: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
  lettersRow2: string[] = ['J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'];
  lettersRow3: string[] = ['S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  word: string[] = [];
  selectedWord!: string;
  guessedLetters: Set<string> = new Set();
  revealedLetters: Set<string> = new Set();
  totalAttempts: number = 8;
  remainingAttempts: number = this.totalAttempts;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.category = this.route.snapshot.paramMap.get('category')!;
    this.categoryService.getCategories().subscribe((categories) => {
      console.log('Categories:', categories);
      const words = categories[this.category];

      if (!words) {
        console.error(`Category "${this.category}" not found in categories.`);
        return;
      }

      this.selectedWord = this.getRandomWord(words);

      if (!this.selectedWord) {
        console.log('No word selected');
        return;
      }

      this.revealInitialCharacters(this.selectedWord);
    });
  }

  getRandomWord(words: { name: string }[]): string {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex].name;
  }

  revealInitialCharacters(word: string): void {
    this.revealedLetters.clear();
    if (word.length === 0) {
      return;
    }
    const numToReveal = Math.floor(word.length / 3);
    while (this.revealedLetters.size < numToReveal) {
      const randomIndex = Math.floor(Math.random() * word.length);
      this.revealedLetters.add(word[randomIndex].toUpperCase());
    }

    this.word = word
      .split('')
      .map((char) =>
        this.revealedLetters.has(char.toUpperCase()) ? char : ''
      );
  }

  guessLetter(letter: string): void {
    const upperCaseLetter = letter.toUpperCase();
    if (
      !this.guessedLetters.has(upperCaseLetter) &&
      !this.revealedLetters.has(upperCaseLetter)
    ) {
      this.guessedLetters.add(upperCaseLetter);

      if (!this.selectedWord.toUpperCase().includes(upperCaseLetter)) {
        this.remainingAttempts--;
      }

      this.word = this.selectedWord
        .split('')
        .map((char) =>
          this.guessedLetters.has(char.toUpperCase()) ||
          this.revealedLetters.has(char.toUpperCase())
            ? char
            : ''
        );

      if (this.isWordGuessed()) {
        this.modalService.showModal('win');
      } else if (this.remainingAttempts === 0) {
        this.modalService.showModal('lose');
      }
    }
  }

  getProgressBarWidth(): string {
    return `${(this.remainingAttempts / this.totalAttempts) * 100}%`;
  }

  isDisabled(letter: string): boolean {
    return this.guessedLetters.has(letter) || this.revealedLetters.has(letter);
  }

  isWordGuessed(): boolean {
    return this.word.join('') === this.selectedWord;
  }

  openModal() {
    this.modalService.showModal('paused');
  }
}
