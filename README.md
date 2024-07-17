# Hangman Game

This project is an implementation of the classic Hangman game using Angular.

## Overview

Hangman is a word guessing game where one player thinks of a word and the other player tries to guess it by suggesting letters within a certain number of guesses. For every incorrect guess, a part of the hangman's gallows and figure is drawn. The game ends when the player correctly guesses the word or runs out of guesses.

## Live Demo

You can play the game live [here](https://moses-hangaman-game.netlify.app/).

## How to Play

1. **Objective:** Guess the hidden word before the hangman is fully drawn.

2. **Game Rules:**

   - The game provides a hidden word represented by dashes.
   - Guess letters one at a time.
   - Each correct guess reveals all occurrences of the guessed letter.
   - Each incorrect guess adds a part to the hangman's gallows (head, body, arms, legs).
   - You win by guessing the word correctly before the hangman figure is complete.
   - You lose if the hangman figure is complete before you guess the word.
   - You have a total of 8 tries to guess the word.

3. **Categories:**
   - Movies
   - TV Shows
   - Countries
   - Capital Cities
   - Animals
   - Sports

## Game Features

- Responsive design using Angular and Tailwind CSS.
- Progress bar to track remaining guesses.
- Modal for game settings and information.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone <https://github.com/mosesfuraha/moses-hangaman-game>
   ```
