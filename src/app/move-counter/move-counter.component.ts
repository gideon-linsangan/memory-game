import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'app-move-counter',
  standalone: true,
  templateUrl: './move-counter.component.html',
  styleUrls: ['./move-counter.component.scss']
})
export class MoveCounterComponent {
  @Input() moves = signal(0);
}
