import { Component, OnInit, OnDestroy } from '@angular/core';
import { Angular2Apollo } from 'angular2-apollo';
import { Subscription } from 'rxjs/Subscription';

import gql from 'graphql-tag';

const AllRestaurantsQuery= gql`
  query allRestaurants {
  allRestaurants {
    id
    name
    featuredImage
    userRating
    priceRange
    distance
  }
}
`;

@Component({
  selector: 'feed',
  template: `
    <a routerLink="/create" class="fixed top-0 pa4 ttu dim black no-underline"><img src="images/settingicon.png" height="20px" width="20px" style="padding-top:10px;margin-right:350px;" /></a>
    <div class="w-100" style="max-width: 400px">
      <h4 style="color:white;text-align:center;padding-top:0px;">RECENT</h4>
      <div class=" row pa3 bg-black-05 ma3" *ngFor="let r of allRestaurants">
        <div style="display:inline-block" class="col-md-5" [ngStyle]="setImage(r.featuredImage)"></div>
        <div style="display:inline-block" class="w-20 col-md-4 pt3">
          <h4 style="color:white;padding-top:0px;">{{r.name}}&nbsp;</h4>
          <img src="images/rating5.png" width="50%" height=""/><br />
          <img src="images/cost5.png" width="50%" height=""/><br />

          <span class='red f6 pointer dim' (click)="handleDelete(r.id)">Delete</span>
        </div>
        <div class="col-md-3">
        <div style="padding-left:20px;"><a routerLink="/single" ><img src="images/infobutton.png" width="150px" height="150px"/></a><br /><br /></div>
        <div style="padding-left:20px;"><img src="images/closebutton.png" width="150px" height="150px"/></div></div>
      </div>
    </div>
  `,
  host: {'style': 'width: 100%; display: flex; justify-content: center;'}
})

export class FeedComponent implements OnInit, OnDestroy {

  loading: boolean = true;
  allRestaurants: any;
  allRestaurantsSub: Subscription;

  constructor(
    private apollo: Angular2Apollo
  ) {}

  setImage(url: string) {
    let styles = {
      'background-image':  `url(${url})`,
      'background-size': '160px 130px',
      'height': '130px',
      'width': '130px',
    };
    return styles;
  }

  handleDelete(id: string) {

    this.apollo.mutate({
      mutation: gql`
        mutation ($id: ID!) {
          deleteRestaurant(id: $id) {
            id
          }
        }
      `,
      variables: {
        id: id,
      },
    })
  }

  ngOnInit() {
    this.allRestaurantsSub = this.apollo.watchQuery({
      query: AllRestaurantsQuery,
      pollInterval: 1000,
    }).subscribe(({data, loading}) => {
      this.allRestaurants = data.allRestaurants.reverse();
      this.loading = loading;
    });
  }

  ngOnDestroy() {
    this.allRestaurantsSub.unsubscribe();
  }
}
