import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { DatatransService } from '../../services/datatrans.service'
declare var $:any;

@Component({
  selector: 'app-watershed',
  templateUrl: './watershed.component.html',
  styleUrls: ['./watershed.component.css']
})
export class WatershedComponent implements OnInit {

  public id:String = "";
  done:boolean;
  interv:number;
  name:string;
  private sub:any;
  private counter:any;
  private data:any;
  iframeUrl:String;
  h = (window.innerHeight*0.9) + 'px';
  constructor(private route:ActivatedRoute, private dataService:DatatransService) { }
  ishide = true;
  ngOnInit() {
    
    this.counter = 0;
    this.sub = this.route.params.subscribe(params => {
      this.id = this.id + (params['id']).toString();
      console.log(this.id);
    
    })
    this.data = this.dataService.getItem(this.id);
    console.log("DAAATAAAAAAAAA",this.dataService.getItem(this.id));
    console.log(document.getElementById("myId"))
    
    this.name = this.id.split(' ')[1];
    this.iframeUrl = "http://localhost:8080/birt-viewer/preview?__report=region.rptdesign&region="+this.name;
    var dis = this;

    $("#myId").on('load', function(){
      // console.log("AAAAAAAAAAAA 1")
      dis.ishide = !dis.ishide;
    })

    $("#myId2").on('load', function(){
      // console.log("AAAAAAAAAAAA 2")
      dis.ishide = !dis.ishide;
    })

    var load = window.setInterval(function reloadIFrame() {
      
      // console.log("something",this.document.getElementById("myId")[0]);
      // console.log(this.document.getElementById("myId").src,dis.iframeUrl)
      // if(this.ishide){
        
        this.document.getElementById("myId").src = "http://localhost:8080/birt-viewer/preview?__report=region.rptdesign&sample=my+parameter&region=2";
      // }else{
        this.document.getElementById("myId2").src = "http://localhost:8080/birt-viewer/preview?__report=region.rptdesign&sample=my+parameter&region=2";
      // }
      
      clearInterval(load)
      // this.document.getElementById("myId").location.reload();
    }, 1);





    window.setInterval(function reloadIFrame() {
      
      // console.log("something",dis.counter);
      console.log(this.document.getElementById("myId").src,dis.iframeUrl)
      if(dis.ishide){
        
        this.document.getElementById("myId").src = "http://localhost:8080/birt-viewer/preview?__report=region.rptdesign&sample=my+parameter&region=2";
      }else{
        this.document.getElementById("myId2").src = "http://localhost:8080/birt-viewer/preview?__report=region.rptdesign&sample=my+parameter&region=2";

      }
      // dis.ishide = !dis.ishide;
      dis.counter=0;

      // this.document.getElementById("myId").location.reload();
    }, 2312312);
  }

}
