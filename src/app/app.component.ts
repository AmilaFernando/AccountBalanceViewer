import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private userRoles: string[] = [];
  isLoggedIn = false;
  isAdmin = false;
  isUser = false;
  username?: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.authService.getToken();

    if (this.isLoggedIn) {
      const user = this.authService.getUser();
      this.userRoles = user.userRoles;
      this.isAdmin = this.userRoles.includes('Admin');
      this.isUser = this.userRoles.includes('User');
      this.username = user.username;
    }
  }

    logout(): void {
      this.authService.logOut();
      this.isAdmin = false;
      this.isUser = false;
    }
}
