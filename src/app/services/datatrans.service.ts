import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import 'rxjs/add/operator/map';
import { dataLink } from "../classes/datalink";
import { Http,Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
declare var $:any;

@Injectable()
export class DatatransService {
  myMethod$: Observable<any>;
  private myMethodSubject = new Subject<any>();
  public mydata:any;
  private col:Array<any>;
  public home:Array<any>;
  public cardData:Array<any>;
  private logged:any;
  public sheds:any;
  public aves:any;

  constructor(public http: Http, public httpClient:HttpClient) {
    this.col = new Array<any>();
    this.home = new Array<any>();
    this.cardData = new Array<any>();
    this.myMethod$ = this.myMethodSubject.asObservable();
    this.col.push(this.data,this.datalinks1, this.datalinks2);
    this.home.push(
      { type:1,id:"titleCarous"},
      { type:2,id:"Watersheds"},
      { type:3,id:"Projects"})
    for(var j = 0; j<this.col.length; j++){
      if(this.col[j].name){
        this.cardData.push(this.col[j].data);
      }
    }
    
    
  }


  public myMethod(data) {
      // console.log("za data",data); // I have data! Let's return it so subscribers can use it!
      // we can do stuff with data if we want
      this.myMethodSubject.next(data);
      this.mydata = data;
      // console.log(this.mydata);
  }

  public getData() {
    return this.mydata;
  }

  public getHome(){
    return this.home;
  }

  public getCol(){
    return this.col;
  }

  public saveData(data){
    // console.log("saving",data)
    this.mydata = data;
    // console.log("saed",this.mydata)
  }

  data = {
    title:"Welcome",
    id: "titleCarous",
    desc: "TODO",
    data:[{
      header: "Access Watershed Information",
      desc : "The watershed plays a critical role in the sustenance of its surrounding environment.",
      img : "assets/watsshed.jpg", 
      actbutton : true, 
      actlink : "/regionData/jalaur",
      class : "carousel-item"
    },{
    header: "MODECERA",
    desc : "Monitoring and Detection of Ecosystems Changes for Enhancing Resilience and Adaptation in the Philippines",
    img : "assets/watshedlogo2withbg.PNG", 
    actbutton : true, 
    actlink : "#",
    class : "carousel-item"
    },{
      header: "Access to Different Functionalities",
      desc : "Access or create new data.",
      img : "assets/fxns.png", 
      actbutton : true, 
      actlink : "#",
      class : "carousel-item"
    }
    ],
    isTnDVisible: false,
  }

  public retrieveData(id){
    // console.log(this.col)
    for(var i=0; i<this.col.length; i++){
      // console.log("COMBI",this.col[i].name,id, this.col[i].name==id)
      if(this.col[i].id && this.col[i].id == id){
        // console.log("sorega watashi no data desu!",this.col[i]);
        return this.col[i];
      }else if(this.col[i].name && this.col[i].name == id){
        // console.log("sorega watashi no data desu!",this.col[i]);
        return this.col[i];
      }
    }
  }

  public getItem(id){
    console.log(this.cardData)
    for(var i =0; i<this.cardData.length; i++){
      for(var j = 0; j< this.cardData[i].length; j++){
        if(this.cardData[i][j].name == id){
          return this.cardData[i][j];
        }
      }
    }
  }

  data2 = {
    title:"title for data1",
    desc: "desc for data2",
 
    id: "data2",
    data:[{
    header: "1",
    desc : "description here",
    img : "http://via.placeholder.com/1360x400", 
    actbutton : true, 
    actlink : "#",
    class : "carousel-item"
   },{
     header: "2",
     desc : "description 123 here",
     img : "http://via.placeholder.com/1360x400", 
     actbutton : true, 
     actlink : "#",
     class : "carousel-item"
    }
   ],
   isTnDVisible: false
  }

   datalinks1 = {
    name: `Watersheds`,
    descrip: `Some Watersheds`,
    data: [
      // new dataLink("Saug",`Total Area: 99871 ha
      // Total Forest Cover: 0 ha
      // Total Agricultural Land: 0 ha`,"/","Go to page","/assets/saug.jpg",true),
      // new dataLink("Lumban",`Total Area: 45445 ha
      // Total Forest Cover: 3915.45 ha
      // Total Agricultural Land: 0 ha`,"/","Go to page","/assets/lumban.jpg",true),
      // new dataLink("Quinali",`Total Area: 54618 ha
      // Total Forest Cover: 0 ha
      // Total Agricultural Land: 0 ha`,"/","explore","/assets/quinali.jpg",true),
      // new dataLink("Abuan",`Total Area: 63796 ha
      // Total Forest Cover: 0 ha
      // Total Agricultural Land: 0 ha
      // `,"/","Go to page","/assets/abuan.jpg ",true),
      // new dataLink("Muleta",`Total Area: 117886 ha
      // Total Forest Cover: 0 ha
      // Total Agricultural Land: 0 ha`,"/","Go to page","/assets/muleta.jpg ",true),
      // new dataLink("Quiaoit",`Total Area: 19018 ha
      // Total Forest Cover: 0 ha
      // Total Agricultural Land: 0 ha`,"/","Go to page","/assets/quiaoit.jpg",true),
      // new dataLink("Region 1", "Ilocos Region","/r1","Explore","/assets/r1.JPG",true),
      // new dataLink("Region 2", "Cagayan Valley","/r2","Explore","/assets/r2.JPG",true),
      // new dataLink("Region 3", "Central Luzon","/r3","Explore","/assets/r3.JPG",true),
      // new dataLink("Region 4A", "CALABARZON","/r4a","Explore","/assets/r4a.JPG",true),
      // new dataLink("Region 4B", "MIMAROPA","/r4b","Explore","/assets/r4b.JPG",true),
      // new dataLink("Region 5", "Bicol Region","/r5","Explore","/assets/r5.JPG",true),
      // new dataLink("Region 6", "Western Visayas","/r6","Explore","/assets/r6.JPG",true),
      // new dataLink("Region 7", "Central Visayas","/r7","Explore","/assets/r7.JPG",true),
      // new dataLink("Region 8", "Eastern Visayas","/r8","Explore","/assets/r8.JPG",true),
      // new dataLink("Region 9", "Zamboanga Peninsula","/r9","Explore","/assets/r9.JPG",true),
      // new dataLink("Region 10", "Northern Mindanao","/r10","Explore","/assets/r10.JPG",true),
      // new dataLink("Region 11", "Davao Region","/r11","Explore","/assets/r11.JPG",true),
      // new dataLink("Region 12", "SOCCSKSARGEN","/r12","Explore","/assets/r12.JPG",true),
      // new dataLink("Region 13", "Caraga Region","/r12","Explore","/assets/r12.JPG",true),
      // new dataLink("ARMM", "Autonomous Region in Muslim Mindanao","/armm","Explore","/assets/armm.JPG",true),
      // new dataLink("CAR", "Cordillera Administrative Region","/car","Explore","/assets/car.JPG",true),
      // new dataLink("NCR", "National Capital Region","/ncr","Explore","/assets/ncr.JPG",true),
      new dataLink("Aborlan", "Aborlan, Palawan","/regionData/Aborlan","View",
        "url('/assets/aborlan.jpg'),url('/assets/default.jpg')",
        true),
      new dataLink("Allah Valley", "South Cotabato","/regionData/AllahValley","View",
        "url('allahvalley.jpg'),url('/assets/default.jpg')",
        true),
      new dataLink("Balogo", "Romblon","/regionData/Balogo","View",
        "url('/assets/balogo.jpg'),url('/assets/default.jpg')",
        true),
      new dataLink("Carranglan", "Nueva Ecija","/regionData/Carranglan","View",
        "url('/assets/carranglan.jpg'),url('/assets/default.jpg')",
        true),
      new dataLink("Catubig", "Nothern Samar","/regionData/Catubig","View",
        "url('/assets/catubig.jpg'),url('/assets/default.jpg')",
        true),
      new dataLink("Del Carmen", "Surigao Del Norte","/regionData/DelCarmen","View",
        "url('/assets/celCarmen.jpg'),url('/assets/default.jpg')",
        true),
      new dataLink("Jalaur", "Jalaur, Ilo-ilo","/regionData/Jalaur","View",
        "url('/assets/jalaur.jpg'),url('/assets/default.jpg')",
        true),
      new dataLink("Molawin", "Laguna","/regionData/Molawin","View",
        "url('/assets/molawin.jpg'),url('/assets/default.jpg')",
        true),
      
    ]}

   datalinks2 = {
    name: `Projects`,
    descrip: `someProjects`,
    data: [
      new dataLink("Project 1","Onsite Environmental Monitoring","/","Explore","/assets/p1.jpg",true),
      new dataLink("Project 2","Monitoring the Responses and Productivity of Annual Field Crops; and Development of Intervention Strategies to Enhance Crop Adaptation to Climate Change","/","Explore","/assets/p2.png",true),
      new dataLink("Project 3","Monitoring the Responses and Productivity of Industrial and Fruit Crops; and Development of Intervention Strategies to Enhance Crop Adaptation to Climate Change","/","Explore","/assets/p3.jpg",true),
      new dataLink("Project 4","Effects of Climate Change on Integrated Pest Management","/","Explore","/assets/p4.jpg",true),
      new dataLink("CERF","Controlled Environment Research Facilities","/","Explore","/assets/cerf.jpg",true),
    ]    
  }

  accounts = [
    {username:"admin",password:"admin"}
  ]

  navItems = [
    {label:"Home",link:"/", type:"simple",},
    {label:"Features",link:"/", type:"simple",},
    {label:"Applications",link:"/", type:"dropdown",subItems:[
      {label:"App1",link:"/"},
      {label:"App2",link:"/"},
      {label:"App2",link:"/"},
    ]},
  ]

  getNav(){
    return this.navItems;
  }

  

  login(account){
    
    
    var logged:any = "asdasd";
    console.log("ACCOUNT",account)
    let headers = new Headers();
    headers.append( 'Content-Type', 'application/json; charset=utf-8;');
    let optionss = new RequestOptions({ headers: headers });
    let body = new HttpParams();
    body.set('username',account.username);
    body.set('password',account.password);
    console.log(body)
    let promise = new Promise((resolve,reject) => {
      this.httpClient.post('http://localhost:80/api/login',JSON.stringify(account), {headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .toPromise()
      .then(
        res=>
        {
          resolve(res);
        },
        err => {
          console.log(err.message)
          reject(err);
        }
          
      );
    });
    console.log("wawawawat",promise)
    return promise;

  }
  getLogged(){
    console.log(this.logged)
    return this.logged;
  }

  getShedsData(){
    return this.sheds._body;
  }

  getSheds(watershed){
    var logged:any = "asdasd";
    var dis = this;
    var headers = new Headers();
    // headers.append("Access-Control-Allow-Origin", "*");
    let promise = new Promise((resolve,reject) => {
      this.http.get('http://localhost/api/subSheds/'+watershed,{
        headers:headers
      })
      .toPromise()
      .then(
        res=>
        {
          console.log(res);
          dis.sheds = res;
          console.log(dis.sheds._body)
          resolve(res);
        },
        err => {
          console.log(err)
          reject(err);
        }
          
      );
    });
    console.log("wawawawat",promise)
    return promise;
  }

  getShedDataSolo(watershed){
    var logged:any = "asdasd";
    var dis = this;
    var headers = new Headers();
    // headers.append("Access-Control-Allow-Origin", "*");
    let promise = new Promise((resolve,reject) => {
      this.http.get('http://localhost/api/adminView/'+watershed,{
        headers:headers
      })
      .toPromise()
      .then(
        res=>
        {
          dis.sheds = res;
          resolve();
        },
        err => {
          console.log(err)
          reject(err);
        }
          
      );
    });
    console.log("wawawawat",promise)
    return promise;
  }


  upload(formdata){
    
    // var logged:any = "asdasd";
    let promise = new Promise((resolve,reject) => {
      this.http.post('http://localhost:80/api/updateData',formdata)
      .toPromise()
      .then(
        res=>
        {
         console.log("DONE UPOLOAD")
          resolve();
        },
        err => {
          console.log(err.message)
          reject(err);
        }
          
      );
    });
    console.log("wawawawat",promise)
    return promise;
  }

  

  muni:any;

  getMunicipalitiesSolo(muns){
    var logged:any = "asdasd";
    var dis = this;
    var headers = new Headers();
    // headers.append("Access-Control-Allow-Origin", "*");
    let promise = new Promise((resolve,reject) => {
      this.http.get('http://localhost/api/municipalities/'+muns,{
        headers:headers
      })
      .toPromise()
      .then(
        res=>
        {
          dis.muni = res;
          console.log(res)
          resolve();
        },
        err => {
          console.log(err)
          reject(err);
        }
          
      );
    });
    console.log("wawawawat",promise)
    return promise;
  }

  getCountryAve(){
    var logged:any = "asdasd";
    var dis = this;
    var headers = new Headers();
    // headers.append("Access-Control-Allow-Origin", "*");
    let promise = new Promise((resolve,reject) => {
      this.http.get('http://localhost/api/countryAve',{
        headers:headers
      })
      .toPromise()
      .then(
        res=>
        {
          dis.aves = res;
          console.log(res)
          resolve();
        },
        err => {
          console.log(err)
          reject(err);
        }
          
      );
    });
    console.log("wawawawat",promise)
    return promise;
  }
  regAve:any;
  getRegionAve(){
    var logged:any = "asdasd";
    var dis = this;
    var headers = new Headers();
    // headers.append("Access-Control-Allow-Origin", "*");
    let promise = new Promise((resolve,reject) => {
      this.http.get('http://localhost/api/regionalAve',{
        headers:headers
      })
      .toPromise()
      .then(
        res=>
        {
          dis.aves = res;
          console.log(res)
          resolve();
        },
        err => {
          console.log(err)
          reject(err);
        }
          
      );
    });
    console.log("wawawawat",promise)
    return promise;
  }

  getProvPerReg(region){
    var logged:any = "asdasd";
    var dis = this;
    var headers = new Headers();
    // headers.append("Access-Control-Allow-Origin", "*");
    let promise = new Promise((resolve,reject) => {
      this.http.get('http://localhost/api/provincesPerRegion/'+region,{
        headers:headers
      })
      .toPromise()
      .then(
        res=>
        {
          dis.aves = res;
          console.log(res)
          resolve();
        },
        err => {
          console.log(err)
          reject(err);
        }
          
      );
    });
    console.log("wawawawat",promise)
    return promise;
  }
  
  getMuns(){
    console.log(JSON.parse(this.muni._body))
    return JSON.parse(this.muni._body)
  }

  getAves(){
    return JSON.parse(this.aves._body)
  }

  

  
  
}
