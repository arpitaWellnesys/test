import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder, FormArray } from '@angular/forms';
import { ApiServiceService  } from '../api-service.service';
import {Router} from '@angular/router';
import {ToastService} from 'ng-uikit-pro-standard';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  responce = {
    success : 0,
    message : '',
    data : []
  };
  cookieValue : any;

  data : any;
  
  constructor(
    private fb : FormBuilder, private service : ApiServiceService ,private router : Router , private toast : ToastService, private cookieService : CookieService
  )  { }
   
  ngOnInit(): void {
    this.cookieValue = this.cookieService.get('token');
    if(this.cookieValue != ""){
      this.router.navigate(['/dashboard']);
    }
  }

  registerForm = this.fb.group({
    email : ['',[Validators.required,Validators.email]],
    password : ['',Validators.required],
    confirm_password : ['',Validators.required]
  }); 

  get login(){
    return this.registerForm.controls;
  }

  onSubmit(){
    console.log(this.registerForm.value);
    if(this.registerForm.valid){
      this.service.register(this.registerForm.value).subscribe(res=>{
        this.responce = JSON.parse(JSON.stringify(res));
        console.log(this.responce);
        const options = { opacity: 1 };
        if(this.responce.success){
          this.data = this.responce.data;
          this.cookieService.set( 'user', this.data );
          console.log(this.data._id);
          this.toast.success(this.responce.message, '', options);
          this.router.navigate(['/verify-otp',this.data._id]);
        }else{
            this.toast.error(this.responce.message, '', options);
            this.registerForm.reset;
        }
      });
    }else{
      this.validateAllFields(this.registerForm); 
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
