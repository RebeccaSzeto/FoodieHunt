import { Routes } from '@angular/router';

import { FavouriteComponent } from './favourite.component'
import { SingleComponent } from './single.component'
import { HomeComponent } from './home.component'
import { NextComponent } from './next.component'
import { DetailComponent } from './detail.component'
import { NewPostComponent } from './new-post.component';

export const routes: Routes = [
  { path: 'favourites', component: FavouriteComponent },
  { path: 'single', component: SingleComponent },
  { path: '', component: HomeComponent },
  { path: 'next', component: NextComponent },
  { path: 'detail', component: DetailComponent },
  { path: 'setting', component: NewPostComponent }
];
