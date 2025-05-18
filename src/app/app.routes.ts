import { Routes } from '@angular/router';
import { ListComponent } from './pages/list/list.component';
import { GameComponent } from './pages/game/game.component';

export const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'game', component: GameComponent },
];
