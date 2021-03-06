import { Component, OnInit, OnDestroy } from '@angular/core';
import { Angular2Apollo } from 'angular2-apollo';
import { Subscription } from 'rxjs/Subscription';

import gql from 'graphql-tag';

const AllRestaurantsQuery= gql`
  query allRestaurants {
  allRestaurants {
    id
  }
}
`;

@Component({
  selector: 'home',
  template: `    <div class="w-100" style="max-width: 400px">
      <div class="pa3 bg-black-05 ma3">
        <div class="w-100" style="background:url('http://www.njfamily.com/BlueberryMuffins.jpg') no-repeat;background-size:400px 300px;">
        <div style="width:100%;display:inline-block;margin-top:230px;background:rgba(55,59,68,0.7)" class="w-20 col-md-4 pt3">
          Muffy Muffins&nbsp;
          <img src="images/rating4.png" width="20%" height=""/><br />
          <img src="images/cost1.png" width="20%" height=""/><br />
          DIRECTIONS 100 m away
        </div>
        <div class="pt3">
          <a routerLink="/favourites"><img src="images/dislikebutton.png" width="40%" /></a><a routerLink="/next"><img style="display:inline-block;" class="pull-right" src="images/likebutton.png" width="40%" /></a>
          </div>
        </div>
      </div>
    </div>
  `,
  host: {'style': 'width: 100%; display: flex; justify-content: center;'}
})

export class HomeComponent implements OnInit, OnDestroy {

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
