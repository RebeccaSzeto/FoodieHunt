import { Component, OnInit, OnDestroy } from '@angular/core';
import { Angular2Apollo } from 'angular2-apollo';
import { Subscription } from 'rxjs/Subscription';

import gql from 'graphql-tag';

const AllRestaurantsQuery= gql`
  query allRestaurants {
  allRestaurants {
    id
    name
    userRating
    hours
    phoneNumbers
    siteUrl
    priceRange
    distance
    featuredImage
  }
}
`;

@Component({
  selector: 'single',
  template: `
    <a routerLink="/create" class="fixed top-0 pa4 ttu dim black no-underline"><img src="images/settingicon.png" height="20px" width="20px" style="padding-top:10px;margin-right:350px;" /></a>
    <div class="w-100" style="max-width: 400px">
      <div class="pa3 bg-black-05 ma3" *ngFor="let r of allRestaurants">
        <div class="w-100" [ngStyle]="setImage(r.featuredImage)">
        <div style="width:100%;display:inline-block;margin-top:230px;background:rgba(55,59,68,0.7)" class="w-20 col-md-4 pt3">
          {{r.name}}&nbsp;
          <img src="images/rating5.png" width="20%" height=""/><br />
          <img src="images/cost5.png" width="20%" height=""/><br />
          {{r.hours}}<br/>
          {{r.phoneNumbers}}<br />
          {{r.siteUrl}}<br />
          DIRECTIONS {{r.distance}} m away
        </div>
        <div class="pt3">

          </div>
        </div>
      </div>
    </div>
  `,
  host: {'style': 'width: 100%; display: flex; justify-content: center;'}
})

export class SingleComponent implements OnInit, OnDestroy {

  loading: boolean = true;
  allRestaurants: any;
  allRestaurantsSub: Subscription;

  constructor(
    private apollo: Angular2Apollo
  ) {}

  setImage(url: string) {
    let styles = {
      'background-image':  `url(${url})`,
      'background-size': '430px 400px',
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
