import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router'

@Component({
  selector: 'app-proxy',
  templateUrl: './proxy.component.html',
  styleUrls: ['./proxy.component.css']
})
export class ProxyComponent implements OnInit {

  constructor() { }
  private sub:any;
  private mess:String;
  private route:ActivatedRoute;
  private router: Router 
  ngOnInit() {
    // console.log("i ran fucker")
    // var dis = this;
    // // this.len = this.sayz/15 + "px";
    // this.sub = this.route.params.subscribe(params => {
    //   this.mess = (params['id']).toString();
      
    // })
    // window.top.postMessage(dis.mess,"*");
    top.postMessage("lCover1","*");
  }

}
