import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private fb : FormBuilder) { }

  ngOnInit(): void {
  }

  resetPassword = this.fb.group({
    password : ['',Validators.required],
    confirm_password : ['',Validators.required]
  })

  onSubmit(){
    alert("Form submitted");
  }

  get login(){
    return this.resetPassword.controls;
  }
}
