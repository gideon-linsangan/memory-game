import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-restart-button',
  standalone: true,
  templateUrl: './restart-button.component.html',
  styleUrls: ['./restart-button.component.scss']
})
export class RestartButtonComponent {
  @Output() restart = new EventEmitter<void>();

  restartGame() {
    this.restart.emit(); // Emits an event when clicked
  }
}
