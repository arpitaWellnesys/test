import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder, FormArray } from '@angular/forms';
import { ApiServiceService  } from '../api-service.service';
import {Router} from '@angular/router';
import {ToastService} from 'ng-uikit-pro-standard';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm : FormGroup;
  responce = {
    success : 0, 
    message : '',
    data : []
  };  
  data : any;
  cookieValue : any;
  constructor(
    private fb : FormBuilder, private service : ApiServiceService ,private router : Router , private toast: ToastService , private cookieservice : CookieService
  ) { 
    this.loginForm = this.fb.group({
      email : ['',[Validators.required,Validators.email]],
      password : ['',Validators.required]
    });
  }

  ngOnInit(): void {
    this.cookieValue = this.cookieservice.get('token');
    if(this.cookieValue != ""){
      this.router.navigate(['/dashboard']);
    }
    console.log(this.cookieValue);
  }

  get login(){
    return this.loginForm.controls;
  }

  onSubmit(){
    console.log(this.loginForm.value);
    if(this.loginForm.valid){
      this.service.login(this.loginForm.value).subscribe(res=>{
        this.responce = JSON.parse(JSON.stringify(res));
        const options = { opacity: 1 };
        if(this.responce.success){
          this.data = this.responce.data;
          this.cookieservice.set( 'token', this.data.access_token );
          this.toast.success(this.responce.message, '', options);
          this.router.navigate(['/dashboard']);
        }else{ 
          if(this.responce.success == 2){
            this.toast.error(this.responce.message, '', options);
            // this.router.navigate(['/verify-otp']);
          } else{
            this.toast.error(this.responce.message, '', options);
            this.loginForm.reset;
          }
        }
      });
    }else{
      this.validateAllFields(this.loginForm); 
    }
  }

  validateAllFields(formGroup: FormGroup) {         
    Object.keys(formGroup.controls).forEach(field => {  
        const control = formGroup.get(field);            
        if (control instanceof FormControl) {             
            control.markAsTouched({ onlySelf: true });
        } else if (control instanceof FormGroup) {        
            this.validateAllFields(control);  
        }
    });
  }


 

}
