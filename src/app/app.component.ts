import { Component,OnInit,ViewChild,AfterViewInit } from '@angular/core';
import { CarouselItems } from './classes/carousel-items';
import { dataLink } from './classes/datalink';
import { DataW } from './classes/data-w';
import { DatatransService } from './services/datatrans.service'
import { MultilinksComponent } from './components/multilinks/multilinks.component'
import { Router } from '@angular/router'

declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DatatransService]
})
export class AppComponent implements OnInit {

  aList;
  mode=1;
  ntitle="";
  ndesc="";
  nid="";
  act = true;
  compData;
  title = '';
  year = "2017";
  small = "75";
  medium = "100";
  large = "125";
  custom = "100";
  selected = this.small;
  fakeColor = "";
  fakeHeight = "";
  loggedIn = window.document.cookie == "LOGGED IN"? true:false;

  
    ngOnInit() {
      this.color="#568D68"
      this.fakeColor = this.color;
      this.fakeHeight = this.selected;
    }

    constructor(private DatatransService : DatatransService, private router: Router){
      this.aList = new Array();
      this.compData = new Array();
      
      // console.log("AAAAAAAA",this.compData.length)
      for(var i=0; i<this.compData.length; i++){
        if(this.compData[i].type == 2){
          this.aList.push(MultilinksComponent)
        }
      }
      
      

      // console.log(this.compData)
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
      this.compData.splice(i,1);
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
  // h Explorettp://via.placeholder.com/1360x400
  public _opened: boolean = false;
  public color= "#568D68";
    public _toggleSidebar() {
      this._opened = !this._opened;
      // console.log("opened? :",this._opened)
    }

    openSideBar(val: boolean){
      this._opened = true;
    }

    logg(val:boolean){
      console.log(val);
      this.loggedIn = val;
    }
  
  changeSelected(size){
    this.fakeHeight = size;
  }

  save(){
    this.color = this.fakeColor;
    this.selected = this.fakeHeight;
    this._opened = false;
  }
}
