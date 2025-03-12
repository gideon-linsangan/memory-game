import { Component, Signal, WritableSignal, signal } from '@angular/core';

@Component({
  selector: 'app-game-board',
  standalone: true,
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent {
  cards: WritableSignal<{ id: number; value: string; flipped: boolean }[]> = signal([]);
  // Track flipped cards
  flippedCards: { index: number; value: string }[] = [];
  isProcessing = signal(false);
  constructor() {
    this.initializeBoard();
  }

  initializeBoard() {
    const values = ['🍎', '🍌', '🍇', '🍉', '🍓', '🍒', '🥝', '🍍'];
    const shuffledCards = [...values, ...values]
      .map((value, index) => ({ id: index, value, flipped: false }))
      .sort(() => Math.random() - 0.5); // Directly use Math.random()

    this.cards.set(shuffledCards); // Now it works because it's a WritableSignal
  }

  flipCard(index: number) {
    if (this.isProcessing() || this.cards()[index].flipped) return;

    // Flip the selected card
    const updatedCards = [...this.cards()];
    updatedCards[index] = { ...updatedCards[index], flipped: true };
    this.cards.set(updatedCards);

    // Store flipped card
    this.flippedCards.push({ index, value: updatedCards[index].value });

    // If two cards are flipped, check for a match
    if (this.flippedCards.length === 2) {
      this.checkMatch();
    }
  }
  checkMatch() {
    const [first, second] = this.flippedCards;
    if (!first || !second) return;

    if (first.value === second.value) {
      // Cards match, keep them flipped
      this.flippedCards = [];
    } else {
      // Temporarily prevent further flips
      this.isProcessing.set(true);

      // Flip them back after a delay
      setTimeout(() => {
        const updatedCards = [...this.cards()];
        updatedCards[first.index] = { ...updatedCards[first.index], flipped: false };
        updatedCards[second.index] = { ...updatedCards[second.index], flipped: false };
        this.cards.set(updatedCards);

        this.flippedCards = [];
        this.isProcessing.set(false);
      }, 1000); // Delay for 1 second
    }
  }
}