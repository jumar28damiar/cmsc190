import { Input,Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgIf } from '@angular/common';
import { DatatransService } from '../../services/datatrans.service';
import { NgModel } from '@angular/forms';
import { CarouselItems } from '../../classes/carousel-items';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  providers: [DatatransService]
})
export class CarouselComponent implements OnInit {
  name: String;
  title: String;
  desc: String;
  h = (window.innerHeight*0.9) + 'px';
  isTnDVisible: boolean;
  dummyData={
    title:"",
    desc:"",
    isTnDVisible:true
  };
  hasItems = false;
  newItem(head, des, img, act, actlink){
    return {
      header : head,
      desc : des,
      img : img,
      actbutton: act,
      actlink: actlink,
      class : "carousel-item"+"?"
    }
  }
  dataToEdit:any;
  dataToAdd:any;
  
  
  copy(ent){
    return {
      header : ent.header,
      desc : ent.desc,
      img : ent.img,
      actbutton : ent.actbutton,
      actlink : ent.actlink
    }
  }
 
  public data = Array<any>();
  
  @Output() onInputChange = new EventEmitter();
  

  constructor(private myService: DatatransService) {
    // console.log("cons") 
    this.data.push( new CarouselItems("1","description here", "notfavicon.png", true, "#") )
    // this.data.push( this.newItem("2","description here", "notfavicon.png", true, "#") )
    // this.data.push( this.newItem("3","description here", "notfavicon.png", false, "#") )
    // this.data.push( this.newItem("4","description here", "notfavicon.png", true, "#") )
    // this.data.push( this.newItem("5","description here", "notfavicon.png", false, "#") )
    this.data[0].class = "carousel-item active"
    this.dataToEdit = new CarouselItems("","","",false,"");
    this.dataToAdd = new CarouselItems("","","",false,"");
    if(this.data.length>0){
      this.hasItems = true;
    }
  }

  editCarouselElement(elem, i){
    this.dataToEdit = this.copy(elem);
    this.dataToEdit.index = i;
    // console.log(elem, this.dataToEdit)
  }

  addCarouselElement(){
    if(!this.hasItems){
      this.data.pop();
      this.hasItems = true;
    }
    this.data.push(this.copy(this.dataToAdd));
    this.data[this.data.length-1].class= this.data.length==1? "carousel-item active" : "carousel-item";
    this.dataToAdd = new CarouselItems("","","",false,"");
  }  

  ngOnInit() {
    this.myService.saveData(this.data);
    
    var samp = this.myService.retrieveData(this.name);
    // console.log("SAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMP",samp.data.length)
    if(samp.data.length > 0){
      this.data[0].header = samp.data[0].header;
      this.data[0].desc = samp.data[0].desc;
      this.data[0].img = samp.data[0].img;
      this.data[0].actbutton = samp.data[0].actbutton;
      this.data[0].actlink = samp.data[0].actlink;
      for(var i=1 ; i<samp.data.length ; i++){
        this.data.push(samp.data[i]);
      };
      this.title = samp.title;
      this.desc = samp.desc;
      this.isTnDVisible = samp.isTnDVisible;
      // console.log("DETAAAAAAAAAAAAAAAAAAA",this.data)
    }
  }

  saveEdit(){
    // console.log(this.dataToEdit.index, this.data[this.dataToEdit.index])
    
    this.data[this.dataToEdit.index].header = this.dataToEdit.header;
    this.data[this.dataToEdit.index].desc = this.dataToEdit.desc;
    this.data[this.dataToEdit.index].img = this.dataToEdit.img;
    this.data[this.dataToEdit.index].actbutton = this.dataToEdit.actbutton;
    this.data[this.dataToEdit.index].actlink = this.dataToEdit.actlink;
    // console.log(this.data)
  }

  @Input ()
  set namae(namae : String){
    this.name = namae && namae.trim();
    // console.log(this.name)
  }

  @Input() 
  set datae(datae: any){
    // console.log("input")
    // this.data[0].header = datae.data[0].header;
    // this.data[0].desc = datae.data[0].desc;
    // this.data[0].img = datae.data[0].img;
    // this.data[0].actbutton = datae.data[0].actbutton;
    // this.data[0].actlink = datae.data[0].actlink;
    // for(var i=1 ; i<datae.data.length ; i++){
    //   this.data.push(datae.data[i]);
    // };
    // this.title = datae.title;
    // this.desc = datae.desc;
    // this.isTnDVisible = datae.isTnDVisible;
    // // console.log(this.data)
  };

  deleteItem(a){
    this.data.splice(a,1);
    if(this.data.length==0){
      this.data.push(new CarouselItems("NO ITEMS","NO ITEMS","",false,"any"))
      this.hasItems = false;
    }
    this.data[0].class="carousel-item active"
  }

  editDescTitle(){
    this.dummyData.title = this.title.toString();
    this.dummyData.desc = this.desc.toString();
    this.dummyData.isTnDVisible = this.isTnDVisible;
  }

  saveDescTitle(){
    this.title = this.dummyData.title.toString() ;
    this.desc = this.dummyData.desc.toString() ;
    this.isTnDVisible = this.dummyData.isTnDVisible ;
    this.onInputChange.emit({name:this.name, descrip:this.desc, data:this.data});
  }

  @Input() loggedIn:boolean;
}
