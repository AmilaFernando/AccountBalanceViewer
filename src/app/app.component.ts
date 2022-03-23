import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  form: any = {
    username: null,
    password: null
  };
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.authService.getToken();
    this.setUserData();    
  }

  logout(): void {
    this.isAdmin = false;
    this.isUser = false;
    this.isLoggedIn = false;
    this.authService.logOut();
  }

  login() {

    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: data => {
        this.authService.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.setUserData(); 
        this.router.navigate(['/home']);

      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  setUserData(){
    if (this.isLoggedIn) {
      const user = this.authService.getUser();
      this.roles = this.authService.getUser().userRoles;
      this.userRoles = user.userRoles;
      this.isAdmin = this.userRoles.includes('Admin');
      this.isUser = this.userRoles.includes('User');
      this.username = user.username;
    }
  }
}
