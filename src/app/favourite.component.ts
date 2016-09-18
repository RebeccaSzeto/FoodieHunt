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
  selector: 'favourite',
  template: `
    <div class="w-100" style="max-width: 400px">
      <h4 style="color:white;text-align:center;padding-top:0px;">RECENT</h4>
      <div class="pa3 bg-black-05 ma3" *ngFor="let r of allRestaurants">
        <div class="fl w-third col-md-4" [ngStyle]="setImage(r.featuredImage)"></div>
        <div class="fl w-third col-md-4">
          <h4 style="color:white;padding-top:0px;">{{r.name}}&nbsp;</h4>
          <img src="images/rating5small.png"/><br />
          <img src="images/cost1small.png"/><br />
        </div>
        <div class="col-md-4">
        <div><a routerLink="/detail" ><img src="images/infobuttonsmall.png" /></a><br /><br /></div>
        <div><img src="images/closebuttonsmall.png" /></div></div>
      </div>
    </div>
  `,
  host: {'style': 'width: 100%; display: flex; justify-content: center;'}
})

export class FavouriteComponent implements OnInit, OnDestroy {

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
