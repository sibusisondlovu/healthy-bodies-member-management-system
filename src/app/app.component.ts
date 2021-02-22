import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'healthy-bodies-member-management-system';

  isAuthenticated = false;
  user: any;

  constructor(public afAuth: AngularFireAuth, private router: Router) {}

  ngOnInit() {
    this.afAuth.authState.subscribe(
      (user) => {
        if (user != null) {
          this.user = user;
          this.router.navigateByUrl('dashboard');
          //this.checkUserRole(user.uid);
          return this.user;
        } else {
          //this.spinner.hide();
        }
      },
      (error) => {
        // this.spinner.hide();
        alert(error);
      }
    );
  }

  signOut() {
    this.afAuth.signOut();
  }
}
