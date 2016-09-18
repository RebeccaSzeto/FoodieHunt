import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Angular2Apollo } from 'angular2-apollo';

import gql from 'graphql-tag';

@Component({
  selector: 'new-post',
  template: `
  <div class="container">
    <div class="control-group">
        <p class="pull-left">
            Cuisine Types
        </p>
        <div class="controls col-md-4">
            <label class="checkbox"><input id="inlineCheckbox1" type="checkbox"
            value="option1"> Cash</label> <label class="checkbox"><input id=
            "inlineCheckbox2" type="checkbox" value="option2"> Invoice</label>
            <label class="checkbox"><input id="inlineCheckbox3" type="checkbox"
            value="option3"> Discover</label> <label class=
            "checkbox"><input id="inlineCheckbox3" type="checkbox" value=
            "option3"> Financing</label>
        </div>
        <div class="controls col-md-4">
            <label class="checkbox"><input id="inlineCheckbox1" type="checkbox"
            value="option1"> Check</label> <label class="checkbox"><input id=
            "inlineCheckbox2" type="checkbox" value="option2"> American
            Express</label> <label class="checkbox"><input id="inlineCheckbox3"
            type="checkbox" value="option3"> MasterCard</label> <label class=
            "checkbox"><input id="inlineCheckbox3" type="checkbox" value=
            "option3"> Google Checkout</label>
        </div>
    </div>
    <div class="control-group">
        <div class="controls col-md-4">
            <label class="checkbox"><input id="inlineCheckbox1" type="checkbox"
            value="option1"> Traveler's Check</label> <label class=
            "checkbox"><input id="inlineCheckbox2" type="checkbox" value=
            "option2"> Diner's Club</label> <label class="checkbox"><input id=
            "inlineCheckbox3" type="checkbox" value="option3"> Visa</label>
            <label class="checkbox"><input id="inlineCheckbox3" type="checkbox"
            value="option3"> Paypal</label>
        </div>
    </div><input class="form-control" id="descriptionInput" name="description"
    placeholder="Description" required="" type="text"> <input class="" id=
    "urlInput" name="imageUrl" placeholder="Url" type="text">
    <button>Save</button>
</div>
  `
})
export class NewPostComponent {
  description: string;
  imageUrl: string;

  constructor(
    private router: Router,
    private apollo: Angular2Apollo
  ) { }

  postImage(): void {

  this.apollo.mutate({
      mutation: gql`
          mutation ($description: String!, $imageUrl: String!){
              createPost(description: $description, imageUrl: $imageUrl) {
                  id
              }
          }
      `,
      variables: {
        description: this.description,
        imageUrl: this.imageUrl,
      },
    }).then(() => {
      this.router.navigate(['/']);
    });
  }
}
