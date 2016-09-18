import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApolloModule } from 'angular2-apollo';

import { AppComponent } from './app.component';
import { FavouriteComponent } from './favourite.component';
import { SingleComponent } from './single.component';
import { HomeComponent } from './home.component';
import { NextComponent } from './next.component';
import { DetailComponent } from './detail.component';
import { NewPostComponent } from './new-post.component';
import { routes } from './routes';
import { client } from './client';

@NgModule({
  declarations: [
    AppComponent,
    FavouriteComponent,
    NextComponent,
    HomeComponent,
    DetailComponent,
    SingleComponent,
    NewPostComponent,
  ],
  entryComponents: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    ApolloModule.withClient(client)
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule {}
