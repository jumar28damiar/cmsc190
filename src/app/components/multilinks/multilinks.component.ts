import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { dataLink } from '../../classes/datalink';
import { DatatransService } from '../../services/datatrans.service';
import {trigger,state,style,animate,transition} from '@angular/animations';

@Component({
  selector: 'app-multilinks',
  templateUrl: './multilinks.component.html',
  styleUrls: ['./multilinks.component.css'],
  providers: [DatatransService],
  animations: [
    trigger('readyStates', [
      state('inactive', style({
        'margin-top':"200px",
        width:"100%",
        opacity:0.4
      })),
      state('active',   style({
        'margin-top':"0px",
        width:"100%",
        opacity:0.7,
      })),
      transition('inactive => active', animate('200ms ease-in')),
      transition('active => inactive', animate('200ms ease-out'))
    ]),
    trigger('activ', [
      state('inactive', style({
        transform:'scale(1)'
      })),
      state('active',   style({
        transform:'scale(1.2)',
        'z-index':200
      })),
      transition('inactive => active', animate('200ms ease-in')),
      transition('active => inactive', animate('200ms ease-out'))
    ])
  ]
})
export class MultilinksComponent implements OnInit {
  data;
  name:String;
  descrip;
  multilinkTitle;
  fakeData;
  fakeTitle;
  fakeDesc;
  fakeImg;
  fakeButton;
  dict:any;
  dictAc = {};
  dataToAdd:dataLink;
  dataToEdit:Array<dataLink>;
  private readyState:String;
  
  @Input ()
  set id(id : String){
    this.name = id && id.trim();
  }

  @Input ()
  set title(title:String){
    this.multilinkTitle = title && title.trim();
  }

  @Input() loggedIn:boolean;

  @Input()
  set namae(namae:any){
    this.name = namae;
    // for(var i=0; i<inputs.data.length; i++){
    //   this.data.push(inputs.data[i]);
    // }
    // this.data = inputs.data;
    // // console.log("reached here",this)
    // this.name = inputs.name;
    // this.descrip = inputs.descrip;
  }

  @Output() onInputChange = new EventEmitter();


  tagol(asd:any){
    this.readyState = this.readyState=="active"? "inactive":"active"
    console.log("tagold",this.readyState,asd)
  }

  constructor(private DatatransService: DatatransService) {
    this.dataToAdd = new dataLink('','','','','','');
    this.data = Array<dataLink>();
  }

  enter(name){
    // console.log("Enter:",name)
    this.dict[name]="active"
    this.dictAc[name]="active"
  }

  leave(name){
    // console.log("left: ",name)
    this.dict[name]="inactive"
    this.dictAc[name]="inactive"
  }

  ngOnInit() {
    // console.log(this.data)
    this.dict = {};
    var inputs = this.DatatransService.retrieveData(this.name);
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",inputs)
    this.data = inputs.data;
    // console.log("reached here",this)
    this.name = inputs.name;
    this.descrip = inputs.descrip;
    console.log(this.descrip)
    this.data.forEach(element => {
      this.dict[element.name] = "inactive";
      this.dictAc[element.name] = "inactive";
    });
    console.log(this.data)
    
  }

  copyData(){
    this.fakeData=[];
    this.data.forEach(d => {
      this.fakeData.push(new dataLink(d.name,d.descriptionText,d.actLink,d.actLabel,d.img, d.button))

    });
    this.fakeTitle = this.name;
    this.fakeDesc = this.descrip;
    // console.log(this.fakeData)
  }

  save(){
    this.data=[];
    this.fakeData.forEach(d => {
      this.data.push(new dataLink(d.name,d.descriptionText,d.actLink,d.actLabel,d.img,d.button))
    });
    this.name = this.fakeTitle;
    this.descrip = this.fakeDesc;

    this.onInputChange.emit({name:this.name, descrip:this.descrip, data:this.data});
    // console.log(this.fakeData)
  }

  saveAdd(){
    if(
      this.dataToAdd.descriptionText.length == 0 ||
      ((this.dataToAdd.actLink.length == 0 ||
      this.dataToAdd.actLabel.length == 0) && this.dataToAdd.button)
    ){
      alert("there are empty inputs");
      return;
    }
    this.data.push(new dataLink(
      this.dataToAdd.name,
      this.dataToAdd.descriptionText,
      this.dataToAdd.actLink,
      this.dataToAdd.actLabel,
      this.dataToAdd.img,
      this.dataToAdd.button
    ));

    this.dataToAdd.descriptionText="";
    this.dataToAdd.actLink="";
    this.dataToAdd.actLabel="";
    this.dataToAdd.img = "";
  }

  removeMulti(a){
    this.data.splice(a,1)
    // console.log(this);

  }
}
