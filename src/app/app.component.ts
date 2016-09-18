import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
      <div style="background-color:#EDAD0C;height:60px;" class="top-0 justify-center"><strong><h3 style="color:white;text-align:center;padding-top:20px;"><a routerLink="" ><img src="images/foodhunterlogo.png" width="40%" /></a></h3></strong></div>
      <div style="background-color:#373B44;" class="w-100 flex justify-center">
      <router-outlet></router-outlet>
      </div>
  `
})
export class AppComponent {}
