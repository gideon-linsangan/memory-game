import { Component, Signal, signal, Input, computed } from '@angular/core';

@Component({
  selector: 'app-win-condition',
  standalone: true,
  templateUrl: './win-condition.component.html',
  styleUrls: ['./win-condition.component.scss']
})
export class WinConditionComponent {
  @Input() totalPairs = signal(0); // Total pairs in the game
  @Input() matchedPairs = signal(0); // Matched pairs count

  isWin = computed(() => this.matchedPairs() === this.totalPairs());
}
