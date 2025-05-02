import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let isAuth = this.authService.isAuthenticated();
    console.log('auth', isAuth)
    // if (!isAuth) {
    //   this.router.navigate(['/authentication/signin']);
    //   return false;
    // }
    // else {
    //   const permissionValue = localStorage.getItem('permission')
    //   const decryptedPermission = this.allFunction.decryptFileForLocal(environment.localEncriptKey, permissionValue);
    //   const Permission = JSON.parse(decryptedPermission);
    //   const Route = ['/report', '/users']
    //   const isAccessingReport = Route.some(route => state.url.includes(route));

    //   if (Permission.user.role.role === 'CS' && isAccessingReport) {
    //     this.router.navigate(['/dashboard']) 
    //     return false;
    //   }
      
    //   console.log('Have token')
    //   return true;
    // }
  }
}
