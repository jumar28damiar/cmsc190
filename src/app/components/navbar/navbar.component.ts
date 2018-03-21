import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {trigger,state,style,animate,transition} from '@angular/animations';
import { CookieService } from 'ngx-cookie-service';

import { DatatransService } from '../../services/datatrans.service';
declare var $:any;


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger('topState', [
      state('top', style({
        'opacity': '1.0',
      })),
      state('notTop',   style({
        'opacity': '0.8',
      })),
      transition('top => notTop', animate('500ms ease-in')),
      transition('notTop => top', animate('500ms ease-out'))
    ])
  ]
})
export class NavbarComponent implements OnInit {
  icon:string;
  fakeIco;
  
  topStateNow = 'top';
  navItems:Array<any>;
  username:string;
  password:string;
  opa: number = 1.0;
  window : any;
  @Output() openSideBar = new EventEmitter<boolean>();
  @Output() logg = new EventEmitter<boolean>();
  private color: string = "white";
  public constructor(private dataService:DatatransService, private CookieService:CookieService) {
    }

    purint(){
      // console.log("asdasdasd")
    }

  ngOnInit() {
    var dis = this;
    this.icon="/assets/watshedlogo2.png"
    window.addEventListener("scroll",function(){
    if(window.scrollY >= 70){
      // console.log("ASD",dis.topStateNow)
      dis.topStateNow = "notTop";
    }else{
      dis.topStateNow = "top";
    }
    }, false)
    this.window = this.CookieService.check("loggedin");
    this.navItems = this.dataService.getNav();
  }

  login(){
    var dis = this;
    var cik:any;
    if(this.username == "admin" && this.password == "admin"){
      cik = true;
    }else{
      cik = false;
    }
    if(cik){
      dis.CookieService.set("loggedin",cik);
      $('#login').modal('hide');
      dis.logg.emit(true);
      dis.window = true;
    }else{
      alert("Wrong username/password")
    }
    // var lagin = this.dataService.login(this.username,this.password).then(function () {
    //   cik = dis.dataService.getLogged();
    //   console.log(cik);
    //   dis.username = "";
    //   dis.password = "";
    //   if(cik){
    //     dis.CookieService.set("loggedin",cik);
    //     $('#login').modal('hide');
    //     dis.logg.emit(true);
    //     dis.window = true;
    //   }else{
    //     alert("Wrong username/password")
    //   }
    //   // $('#login').modal('hide')
  
    // }, function(){
    //   alert("Server Error")
    // });
    
  }

  logout(){
    this.CookieService.delete('loggedin');
    this.window = false;
    this.logg.emit(false);
  }

  getDat(){
    // console.log("gogg",window.scrollY)
    // if(window.scrollY >= 70){
    //   // console.log("ASD",this.topStateNow)
    //   this.topStateNow = "notTop";
    // }else{
    //   this.topStateNow = "top";
    // }
    if(this.topStateNow=="top"){
      this.topStateNow = "notTop";
    }else{
      this.topStateNow = "top";
    }
    this.openSideBar.emit(true);
    // console.log(this)
  }

  changeI(){
    this.fakeIco = this.icon.toString();
  }

  changeIco(){
    this.icon = this.fakeIco.toString();
  }

  public _opened: boolean = false;
  
    public _toggleSidebar() {
      this._opened = !this._opened;
      // console.log("opened? :",this._opened)
    }

  @Input() bgColor :String;
  @Input() hayt :String;
  @Input() loggedIn:boolean;

}
