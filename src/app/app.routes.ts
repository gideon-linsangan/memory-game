import { Routes } from '@angular/router';
import { GameBoardComponent } from './game-board/game-board.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home' , component:  GameBoardComponent},
];
