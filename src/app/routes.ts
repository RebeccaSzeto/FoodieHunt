import { Routes } from '@angular/router';

import { FeedComponent } from './feed.component'
import { SingleComponent } from './single.component'
import { NewPostComponent } from './new-post.component';

export const routes: Routes = [
  { path: '', component: FeedComponent },
  { path: 'single', component: SingleComponent },
  { path: 'create', component: NewPostComponent }
];
