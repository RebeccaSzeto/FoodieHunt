import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
      <div style="background-color:#EDAD0C;" class="justify-center">

      <h3 style="color:white;text-align:center;">
        <a routerLink="/setting"><img src="images/settingwide.png" width="75px" height="30px" /></a>
        <a routerLink=""><img style="display:inline-block;" src="images/foodhunterlogo.png" width="20%" style="margin-right: 82px;" /></a></h3>
      </div>
      <div style="background-color:#373B44;" class="w-100 flex justify-center">
      <router-outlet></router-outlet>
      </div>
  `
})
export class AppComponent {}
