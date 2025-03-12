import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { GeneralFunctionService } from './general-function.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  baseApi = environment.baseAPI; 
  token: any;

  constructor(private http: HttpClient, private router:Router, private allFunction: GeneralFunctionService) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(data: any, option:any) {
    return this.http.post(this.baseApi+'api/auth/login', data, option);
  }


  getToken() {
    if (localStorage.getItem('token')) {
        this.token = localStorage.getItem('token');
    } else {
        this.token = null;
    }
    return this.token;
  }

  logout() {
    // this._firebaseAuth.signOut();
    // this.router.navigate(['YOUR_LOGOUT_URL']);

    // token user
    console.log("logout")
    localStorage.removeItem('token'); 
    // let rememberpsw = this.allFunction.checkRememberPassword();
    localStorage.clear();
    // if(rememberpsw != false){
    //     this.allFunction.setUsernameAndPassword(rememberpsw.username,rememberpsw.password)
    // }
    if(!localStorage.getItem('token')){
      this.router.navigate(['/authentication/signin']);
      // window.location.reload(); 
      console.log("no token") 
    }  
  }


}
