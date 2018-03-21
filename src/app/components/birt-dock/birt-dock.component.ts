import { Component, OnInit } from '@angular/core';
import { DatatransService } from '../../services/datatrans.service';
import { ActivatedRoute,Router } from '@angular/router'


@Component({
  selector: 'app-birt-dock',
  templateUrl: './birt-dock.component.html',
  styleUrls: ['./birt-dock.component.css']
})
export class BirtDockComponent implements OnInit {

  
  constructor( 
    private route:ActivatedRoute,
    private dataService:DatatransService,
    private router: Router 
  ){
    console.log(document.domain)
    document.domain=document.domain;
    console.log(document.domain)
    if (window.addEventListener) {
      window.addEventListener("message", this.receiveMessage.bind(this), false);
    } else {
       (<any>window).attachEvent("onmessage", this.receiveMessage.bind(this));
    }
   }

  receiveMessage(event){
    console.log("ASDASDASsDASD",event)
  }
  contSizerFlag = -1;
  sayz = window.innerHeight;
  len;
  subSheds:any;
  bodyData:any;
  name:any;
  actib=0;
  firstVisit = true;
  framel:HTMLFrameElement;
  regions = [
    ["Aborlan","/regionData/Aborlan"],
    ["AllahValley","/regionData/AllahValley"],
    ["Balogo","/regionData/Balogo"],
    ["Carranglan","/regionData/Carranglan"],
    ["Catubig","/regionData/Catubig"],
    ["DelCarmen","/regionData/DelCarmen"],
    ["Jalaur","/regionData/Jalaur"],
    ["Molawin","/regionData/Molawin"],
  ]
  asd:HTMLIFrameElement;
  rinku;
  curr;
  private sub:any;
  ngOnInit() {
    var dis = this;
    // this.len = this.sayz/15 + "px";
    this.sub = this.route.params.subscribe(params => {
      this.name = (params['id']).toString();
      console.log(this.name);
      
    })
        var lagin = this.dataService.getSheds(this.name).then(function () {
              dis.bodyData = JSON.parse(dis.dataService.getShedsData())[0]; 
              console.log(dis.subSheds); 
          }, function(err){
            console.log(err)
            alert("Server Error")
          });
    this.rinku = "http://localhost:8080/birt-viewer/preview?__report=shedHead.rptdesign&sample=my+parameter&__format=html&__svg=true&__masterpage=true&__rtl=false&__cubememsize=10&__emitterid=org.eclipse.birt.report.engine.emitter.html&visib=true&watershedName=";
    this.curr = 1;
   
    var dis = this;

    var load = window.setInterval(function reloadIFrame() {
      
      // console.log("something",this.document.getElementById("myId")[0]);
      // console.log(this.document.getElementById("myId").src,dis.iframeUrl)
      // if(this.ishide){
        
      // }else{
        this.document.getElementById("aydi").src = dis.rinku+dis.name;
        this.document.getElementById("ayditu").src = "http://127.0.0.1:8080/birt-viewer/preview?__report=C%3A%5Capache-tomcat-7.0.82%5Cwebapps%5Cbirt-viewer%5CSub.rptdesign&__format=html&__svg=true&__locale=en_PH&__timezone=CTT&__masterpage=true&__rtl=false&__cubememsize=10&__resourceFolder=C%3A%5Capache-tomcat-7.0.82%5Cwebapps%5Cbirt-viewer&__emitterid=org.eclipse.birt.report.engine.emitter.html&-734436226&watershedName="+dis.name;
        
      // }

      //http://127.0.0.1:8080/birt-viewer/preview?__report=C%3A%5Capache-tomcat-7.0.82%5Cwebapps%5Cbirt-viewer%5CSub.rptdesign&__format=html&__svg=true&__locale=en_PH&__timezone=CTT&__masterpage=true&__rtl=false&__cubememsize=10&__resourceFolder=C%3A%5Capache-tomcat-7.0.82%5Cwebapps%5Cbirt-viewer&__emitterid=org.eclipse.birt.report.engine.emitter.html&-734436226&watershedName=aborlan
      
      
      clearInterval(load)
      // this.document.getElementById("myId").location.reload();
    }, 1);
    window.document.getElementById("aydi").onload = function(){
      dis.removeBg('detailId');
    }
    window.document.getElementById("ayditu").onload = function(){
      dis.removeBg('contentHolder');
      console.log(frames[1])

    }
   
  }

  onload(ev: Event) {
    this.framel = <HTMLFrameElement>ev.srcElement;
    
  }


  change(){

    var dis = this;
    var load = window.setInterval(function reloadIFrame() {
      
      // console.log("something",this.document.getElementById("myId")[0]);
      // console.log(this.document.getElementById("myId").src,dis.iframeUrl)
      // if(this.ishide){
        
      // }else{
        this.document.getElementById("aydi").src = dis.rinku+dis.name;
        this.document.getElementById("ayditu").src = "http://127.0.0.1:8080/birt-viewer/preview?__report=C%3A%5Capache-tomcat-7.0.82%5Cwebapps%5Cbirt-viewer%5Csub.rptdesign&__format=html&__svg=true&__locale=en_PH&__timezone=CTT&__masterpage=true&__rtl=false&__cubememsize=10&__resourceFolder=C%3A%5Capache-tomcat-7.0.82%5Cwebapps%5Cbirt-viewer&__emitterid=org.eclipse.birt.report.engine.emitter.html&-233951418&watershedName="+dis.name
        
      // }
      
      clearInterval(load)
      // this.document.getElementById("myId").location.reload();
    }, 1);
  }

  public someFunction(){
    this.contSizerFlag++;
    if(this.contSizerFlag%2 == 0){
      if(this.contSizerFlag!=0){
        window.document.getElementById('contentHolder').style.height="950px";
      }
      console.log("im at new page", this.contSizerFlag)
    }else{
      window.document.getElementById('contentHolder').style.height="1600px";
    }
  }

  redir(x){
    console.log(x)
    this.router.navigate([x]);
  }

  onChange(deviceValue) {
    this.router.navigate([deviceValue]);
    this.change();
    console.log(deviceValue);
    this.firstVisit = false;
  }

  removeBg(id){
    console.log(id);
    var elem = document.getElementById(id);
    console.log(elem)
    elem.style.backgroundImage = 'none  ';
  }

}
