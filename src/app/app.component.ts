import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'healthy-bodies-member-management-system';

  isAuthenticated = false;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    //this.authService. getAuthStatus();
    this.authService.currentAuthStatus.subscribe(
      (authStatus) => (this.isAuthenticated = authStatus)
    );
  }

  signOut() {
    this.authService.signOut();
  }
}
