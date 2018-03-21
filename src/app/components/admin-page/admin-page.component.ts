import { Component, OnInit } from '@angular/core';
import { DatatransService } from '../../services/datatrans.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  private bodyData:any;
  private subSheds:any;
  private currentSubshed:any;
  private tempoSubShed:any;
  private firstVisit = true;

  constructor(
    private dataService:DatatransService

  ) { }

  ngOnInit() {
    var dis = this;
    var getALlSubs = this.dataService.getShedDataSolo("aborlan").then(function () {
      dis.bodyData = JSON.parse(dis.dataService.getShedsData()); 
      console.log(dis.bodyData[0].Subwatershed); 
      dis.currentSubshed = dis.bodyData[0];
      dis.tempoSubShed = Object.assign({},dis.currentSubshed);
      console.log("TEMPO",dis.tempoSubShed)
      var temp = dis.currentSubshed;
      //LINEAR ASPECT
      temp.Mean_Stream_length_ = temp.Total_Stream_Length_km * temp.Total_Number_of_streams;
      
      temp.Basin_Length_km = ((temp.Max_Elev - temp.Min_elev)/temp.Slope_Percent)/100;

      temp.Rho_Coefficient = temp.Mean_Stream_length_ / temp.Mean_Bifurcation_ratio;
      
      //RELIEF ASPECT
      temp.Basin_relief = temp.Max_Elev - temp.Min_elev;

      temp.Relief_ratio = temp.Basin_relief/temp.Basin_Length_km;

      

      temp.Meltons_Ruggedness_nuber = Math.sqrt(temp.Basin_relief*temp.Area_km2);

      //AREAL ASPECT
      temp.Drainage_Density = temp.Total_Stream_Length_km/temp.Area_km2;

      //for relief but needs drainage density
      temp.Ruggedness_number = temp.Basin_relief / temp.Drainage_Density;
      //end for relief insert

      temp.Constant_of_Channel_maintenance = 1 / temp.Drainage_Density;

      temp.Elongation_Ratio = (2/temp.Basin_Length_km)*(Math.sqrt(temp.Area_km2/3.14))

      temp.Compactness_constant = temp.Perimeter_km / (Math.sqrt(4*3.14*temp.Area_km2))

      temp.Stream_Frequency = temp.Total_Number_of_streams / temp.Area_km2;

      temp.Drainage_Texture = temp.Drainage_Density * temp.Stream_Frequency;

      temp.Form_Factor = temp.Area_km2 / temp.Basin_Length_km*temp.Basin_Length_km;

      temp.Texture_Ratio = 47/temp.Perimeter_km;

      temp.Shape_Index = temp.Basin_Length_km / temp.Area_km2;

      temp.Length_of_overland_Flow = 1/(2*temp.Drainage_Density);

      temp.Lemniscate_Ratio = (temp.Basin_Length_km*temp.Basin_Length_km)/4
      dis.tempoSubShed = temp;


    }, function(err){
      console.log(err)
      alert("Server Error")
    });

    

 
  }

  changeData(){
    console.log("weeeee");
  }

}
