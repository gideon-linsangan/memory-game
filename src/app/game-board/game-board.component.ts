import { Component, OnInit, signal, type WritableSignal } from '@angular/core';
import { WinConditionComponent } from '../win-condition/win-condition.component';
import { RestartButtonComponent } from '../restart-button/restart-button.component';
import { MoveCounterComponent } from '../move-counter/move-counter.component';

@Component({
  selector: 'app-game-board',
  standalone: true,
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
  imports: [WinConditionComponent, RestartButtonComponent, MoveCounterComponent]
})

export class GameBoardComponent implements OnInit {
  cards: WritableSignal<{ id: number; value: string; isFlipped: boolean; isMatched: boolean }[]> = signal([]);
  moveCount: WritableSignal<number> = signal(0);
  matchedPairs: WritableSignal<number> = signal(0);
  totalPairs: WritableSignal<number> = signal(0);

  flippedCards: { id: number; value: string }[] = [];

  ngOnInit() {
    this.initializeGame();
  }

  clearBoard() {
    this.cards.set([]);
    this.flippedCards = [];
  }

  initializeGame() {
    this.clearBoard();
    this.moveCount.set(0);
    const values = ['🍎', '🍌', '🍒', '🍇', '🍉', '🥝', '🍍', '🍑']; // Example card values
    const shuffledCards = [...values, ...values] // Duplicate for pairs
      .map((value, id) => ({ id, value, isFlipped: false, isMatched: false }))
      .sort(() => Math.random() - 0.5);

    this.cards.set(shuffledCards);
    console.log("Initialized cards:", this.cards());
    this.totalPairs.set(values.length) // ✅ Set total pairs dynamically
    this.moveCount.set(0)
  }

  flipCard(card: { id: number; value: string }) {
    if (this.flippedCards.length < 2 && !this.cards().find((c) => c.id === card.id)?.isFlipped) {
      this.cards.update((cards) =>
        cards.map((c) =>
          c.id === card.id ? { ...c, isFlipped: true } : c
        )
      );

      this.flippedCards.push(card);

      if (this.flippedCards.length === 2) {
        this.checkMatch();
      }
    }
  }

  checkMatch() {
    this.moveCount.update((count) => count + 1);

    const [card1, card2] = this.flippedCards;
    if (card1.value === card2.value) {
      this.matchedPairs.update((pairs) => pairs + 1);

      this.cards.update((cards) =>
        cards.map((c) =>
          c.id === card1.id || c.id === card2.id ? { ...c, isMatched: true } : c
        )
      );
    } else {
      setTimeout(() => {
        this.cards.update((cards) =>
          cards.map((c) =>
            c.id === card1.id || c.id === card2.id ? { ...c, isFlipped: false } : c
          )
        );
      }, 1000);
    }

    this.flippedCards = [];
  }

  isGameWon(): boolean {
    return this.matchedPairs() === this.totalPairs();
  }
}