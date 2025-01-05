import { Routes } from '@angular/router';
import { SetDetailsComponent } from './components/set/set-details.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'set/:id', component: SetDetailsComponent },
  { path: 'search', component: SearchComponent },

];
