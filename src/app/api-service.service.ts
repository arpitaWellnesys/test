import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, tap, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  api_url = "http://localhost:8081/";

  constructor(private http:HttpClient) { }

  login(data:any){
    return this.http.post(this.api_url+"login",data).pipe(map(result=>result));
  }

  register(data:any){
    return this.http.post(this.api_url+"register",data).pipe(map(result=>result));
  }

  forgetPassword(data:any){
    return this.http.post(this.api_url+"forget-password",data).pipe(map(result=>result));
  }

  verifyOtp(data:any){
    return this.http.post(this.api_url+"verify-otp",data).pipe(map(result=>result));
  }

  resendOtp(data: any){
    return this.http.post(this.api_url+"resend-otp",data).pipe(map(result=>result));
  }
  
}
