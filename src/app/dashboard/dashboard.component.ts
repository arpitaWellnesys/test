import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  cookieValue : any;
  constructor(private cookieService:CookieService , private router : Router) { }

  ngOnInit(): void {
    this.cookieValue = this.cookieService.get('token');
    if(this.cookieValue == ""){
      this.router.navigate(['/login']);
    }
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
  }

  logout(){
    this.cookieService.delete('token');
    this.router.navigate(['/login']);
  }
}
