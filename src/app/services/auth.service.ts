import { Injectable } from '@angular/core';
import { User } from '../shared/user';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  api: string = environment.apiUrl + 'Authentication';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  currentUser = {
    username: String,
    userRole: String,
  };
  
  constructor(private http: HttpClient, public router: Router) {}

  // Register
  signUp(user: User): Observable<any> {
    let api = `${this.api}/Register`;
    return this.http.post(api, user).pipe(catchError(this.handleError));
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.api}/Login`, {
      username,
      password
    }, this.httpOptions);
  }

  public getToken(): string | null {
    return this.getUser().token;
  }

  public saveUser(user: User): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem(USER_KEY);
    return authToken !== null ? true : false;
  }

  logOut() {
    window.sessionStorage.removeItem(USER_KEY);
    this.router.navigate(['login']);
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}