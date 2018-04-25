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
	window:any = this.CookieService.get("loggedin") == "true"? true:false;
	@Output() openSideBar = new EventEmitter<boolean>();
	@Output() logg = new EventEmitter<boolean>();
	private color: string = "white";
	public constructor(private dataService:DatatransService, 
										private CookieService:CookieService) {
		}

		purint(){
			// console.log("asdasdasd")
		}

	checkCookie(){
        return this.CookieService.check("loggedin")? false:true;
    }
	ngOnInit() {
		console.log(this.window);
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
		this.window = this.CookieService.get("loggedin");
		console.log("window","this.window",this.window, this.CookieService.getAll())
		this.navItems = this.dataService.getNav();
	}

	login(){
		var dis = this;
		var cik:any;
		var account = {
			username: this.username,
			password: this.password
		}
		
		var lagin = this.dataService.login(account).then(function (res) {
			console.log(res)
			var obj:any = res;
			dis.CookieService.set("loggedin",obj.token);
			$('#login').modal('hide');
			// dis.logout()
			//console.log(dis.subSheds); 
		}, function(err){
		  //console.log(err)
			dis.CookieService.set("loggedin","false")
		  	alert("Wrong Credentials")
		});
		
		// if(this.username == "admin" && this.password == "admin"){
		// 	cik = true;
		// }else{
		// 	cik = false;
		// }
		// if(cik){
		// 	dis.CookieService.set("loggedin",cik);
		// 	$('#login').modal('hide');
		// 	dis.logg.emit(true);
		// 	dis.window = true;
		// 	localStorage.setItem("loggedin" ,"true")
		// }else{
		// 	alert("Wrong username/password")
		// }
		
		
	}

	logout(){
		var stat:any;
		// localStorage.delete("loggedin")
		stat = false;
		this.CookieService.set("loggedin",stat);
		this.CookieService.delete("loggedin",'/');
		console.log(this.CookieService.getAll())
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
