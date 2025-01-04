import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SetDetailsComponent } from './components/set/set-details.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'set/:id', component: SetDetailsComponent }

];
