import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import jwtDecode, { JwtPayload } from 'jwt-decode'


@Injectable({
  providedIn: 'root'
})
export class AuthserviceService{

  private _loginUrl = "http://localhost:4000/login";
  private _signUpUrl = "http://localhost:4000/signup";
  
  constructor( private http : HttpClient, private router : Router) { }


  loginUser(user:any) {
    return this.http.post<any>(this._loginUrl, user)
  }

  getToken(){
    return localStorage.getItem('token')
  }

  loggedIn() {
    return localStorage.getItem('token')    
  }

  logOut(){
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
    
  }

  signUpUser(user:any){
    return this.http.post<any>(this._signUpUrl, user)
  }

  getRole(token){
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded

  }
}

