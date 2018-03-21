import { Component, OnInit } from '@angular/core';
import { DatatransService } from '../../services/datatrans.service';
import { DataW } from '../../classes/data-w';
import { CarouselItems } from '../../classes/carousel-items';
import { CookieService } from 'ngx-cookie-service';

declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DatatransService]
})
export class HomeComponent implements OnInit {
  homeData:any;
  constructor(private myService:DatatransService, private CookieService:CookieService) { }
  aList;
  ntitle="";
  ndesc="";
  act = true;
  compData;
  loggedIn:boolean;
  nid;
  mode=1;
  ngOnInit() {
    this.homeData = this.myService.getHome();
    this.compData = this.myService.getCol();
    console.log(this);

    this.poll();
    console.log("ASDASDASD")
    this.loggedIn = this.CookieService.check('loggedin');

  }

  poll(){
    var dis = this;
      setTimeout(function(){
        dis.loggedIn = dis.CookieService.check("loggedin");
        dis.poll()
      },500)
  }

  printData(){
    // console.log(this.compData)
    var dis = this;
    // this.compData.push(new DataW(2,this.datalinks2))
    if(this.act){
      $('#editData').on("hidden.bs.modal", function(e){
        // console.log("AAAAAAAAAAAAASDASDASD")
        dis.reset();
      })
      this.act = false;
    }
  }
  
  delete(i){
    this.homeData.splice(i,1);
  }

  reset(){
    this.mode = 1;
    this.ndesc = "";
    this.nid = "";
    this.ntitle = "";
  }

  add(type){
    if(type==1){
      var aydi = this.compData.length + "carousel"        
      this.compData.push(new DataW(type,{title: this.ntitle, desc:this.ndesc, data:[new CarouselItems("NO ITEMS LEFT","NO ITEMS LEFT","",false,"any")], id:aydi, isTnDVisible:false}))
    }else{
      this.compData.push(new DataW(type,{name:this.ntitle, descrip:this.ndesc, data:[]}));
    }
    this.reset();
  }

  printo(asd){
    console.log('conn',asd,this.compData)
    for(var i=0; i<this.compData.length; i++){
      if(this.compData[i].name){
        if(this.compData[i].name==asd.name){
          this.compData[i]==asd;
        }
      }else{
        console.log('asd',this.compData[i].id,asd.name,this.compData[i].id==asd.name)
        if(this.compData[i].id==asd.name){
          this.compData[i].title==asd.name;
          this.compData[i].desc==asd.descrip;
          this.compData[i].data==asd.data;
          
        }
      }
    }
  }

}
