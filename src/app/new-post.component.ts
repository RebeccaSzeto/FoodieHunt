import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Angular2Apollo } from 'angular2-apollo';

import gql from 'graphql-tag';

@Component({
  selector: 'new-post',
  template: `
  <div class="w-100" style="padding-bottom:100px;padding-top: 50px;max-width: 400px">
        <h4>
            CUISINE TYPES
        </h4>
        <div>
            <label><input id="inlineCheckbox1" type="checkbox"
            value="option1"> Chinese</label><br />
            <label ><input id="inlineCheckbox2" type="checkbox"
            value="option2"> Fast Food</label><br />
            <label ><input id="inlineCheckbox3" type="checkbox"
            value="option3"> Bakery</label><br />
            <label><input id="inlineCheckbox3" type="checkbox"
            value="option3"> Coffee & Tea</label><br />
            <label><input id="inlineCheckbox1" type="checkbox"
            value="option4"> Swiss</label><br />
            <label ><input id="inlineCheckbox2" type="checkbox"
            value="option7"> French</label><br />
            <label ><input id="inlineCheckbox3" type="checkbox"
            value="option5"> Japanese</label><br />
            <label><input id="inlineCheckbox3" type="checkbox"
            value="option6"> Sweets</label><br />
    </div>

    <img  src="images/save settings.png" width="50%" height="50%" align="center" style="padding-bottom:30px;padding-top: 35px;"/><br />
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
