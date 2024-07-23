import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        const expectedRole = route.data['expectedRole'];
        return this.authService.userData.pipe(
            take(1),
            map(user => {
                if (user.rol !== expectedRole) {
                    this.router.navigate(['/access-denied']);
                    return false;
                }
                return true;
            })
        );
    }
}


