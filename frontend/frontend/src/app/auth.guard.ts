import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { UserService } from './shared/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.userService.userObservable.pipe(
      map((user) => {
        if (this.userService.isAuth) {
          if (state.url === '/login') {
            this.router.navigate(['/']);
            return false;
          }

          if (state.url === '/admin-dashboard') {
            if (user && user.email === 'shahilpatel688@gmail.com') {
              return true;
            } else {
              this.router.navigate(['/login']);
              return false;
            }
          }
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      }),
      catchError((error) => {
        console.error('Error in AuthGuard:', error);
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}
