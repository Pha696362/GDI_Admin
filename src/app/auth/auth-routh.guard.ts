import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'
import { Environment } from '../stores/environment.store';

@Injectable({
  providedIn: 'root'
})
export class AuthRouthGuard implements CanActivate {
  tempUrl: string;
  url: string;
  [x: string]: any;

  constructor(public router:Router,public activatedRoute : ActivatedRoute,public env: Environment) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      // this.router.events.subscribe(async (url:any) => {
      //   this.tempUrl = await url.url;
      // });
      this.tempUrl = state.url.split("/")[2];
      // this.env.users.roles.permission.forEach(element => {
      //   console.log(element.name)
      // });
      console.log(this.env.users.roles.permission,'permission from auth routh')
      const found = this.env.users.roles.permission.find(ad => ad.name === this.tempUrl.toUpperCase())
      console.log(found)
      if(found.view === true){
        // console.log('true')
        return true;
      }
      else {
        this.router.navigate(['/overview']);
        return false;
      }

  }

  // getPermission() {
  //   this.env.fetchUserDoc(u => {
  //     this.role = u.role;
  //     this.menuControl = u.menu
  //     console.log(this.menuControl,'auth role');
  //     if(!this.tempUrl && u.menu.contactUs.view !== true) {
  //       this.router.navigate(['/'], { queryParams: { returnUrl: this.state.url } });
  //       console.log('hello world')
  //       return true;
  //     }
  //     else {
  //       console.log('else')
  //       return false;
  //     }
  //   });
  // }
}
