import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { chart } from 'highcharts';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
// import { chart } from 'highcharts/modules/heatmap'
import { DatatransService } from '../../services/datatrans.service';
import { } from '@types/googlemaps';

@Component({
  selector: 'app-highcharts',
  templateUrl: './highcharts.component.html',
  styleUrls: ['./highcharts.component.css']
})
export class HighchartsComponent implements OnInit {

  @ViewChild('chartTarget') chartTarget: ElementRef;
  @ViewChild('gmap') gmapElement: any;
  chart: Highcharts.ChartObject;
  map:google.maps.Map;
  geocoder:google.maps.Geocoder;
  samting:any;
  obj:any;
  h:any = "500px";
  municipalData:any;
  provincialData:any;
  chartSeries = [];
  firstVisit = true;
  prabins:any = "Region I - ILOCOS REGION";
  regions = [];
  addresses = ["Abra Philippines","Agusan del Norte Philippines","Agusan del Sur Philippines","Aklan Philippines","Albay Philippines","Antique Philippines","Apayao Philippines","Aurora Philippines","Basilan Philippines","Bataan Philippines","Batanes Philippines","Batangas Philippines","Benguet Philippines","Biliran Philippines","Bohol Philippines","Bukidnon Philippines","Bulacan Philippines","Cagayan Philippines","Camarines Norte Philippines","Camarines Sur Philippines","Camiguin Philippines","Capiz Philippines","Catanduanes Philippines","Cavite Philippines","Cebu Philippines","Compostela Valley Philippines","Davao del Norte Philippines","Davao del Sur Philippines","Davao Oriental Philippines","Dinagat Islands Philippines","Eastern Samar Philippines","Guimaras Philippines","Ifugao Philippines","Ilocos Norte Philippines","Ilocos Sur Philippines","Iloilo Philippines","Isabela Philippines","Kalinga Philippines","La Union Philippines","Laguna Philippines","Lanao del Norte Philippines","Lanao del Sur Philippines","Leyte Philippines","Maguindanao Philippines","Marinduque Philippines","Masbate Philippines","Metropolitan Manila Philippines","Misamis Occidental Philippines","Misamis Oriental Philippines","Mountain Province Philippines","Negros Occidental Philippines","Negros Oriental Philippines","Northern Samar Philippines","Nueva Ecija Philippines","Nueva Vizcaya Philippines","Occidental Mindoro Philippines","Oriental Mindoro Philippines","Palawan Philippines","Pampanga Philippines","Pangasinan Philippines","Quezon Philippines","Quirino Philippines","Rizal Philippines","Romblon Philippines","Samar Philippines","Sarangani Philippines","Siquijor Philippines","Sorsogon Philippines","South Cotabato Philippines","Southern Leyte Philippines","Sultan Kudarat Philippines","Sulu Philippines","Surigao del Norte Philippines","Surigao del Sur Philippines","Tarlac Philippines","Tawi-Tawi Philippines","Zambales Philippines","Zamboanga del Norte Philippines","Zamboanga del Sur Philippines","Zamboanga Sibugay Philippines"];
  ngAfterViewInit() {
    
  }

  ngOnDestroy() {
    this.chart = null;
  }

  setChart(place:String){
	  //pagraduatein nyo po si melbex
	var dis = this;
    console.log(this.dataService.getMunicipalitiesSolo(place))
    this.samting =this.dataService.getMunicipalitiesSolo(place).then(function () {
      dis.municipalData = dis.dataService.getMuns();
		
	  var dataHolder;
	  var datSeries = [];
	  var yLabels = [];
	  dis.h = dis.municipalData.length * 60 < 740? 740 :dis.municipalData.length * 60
	  dis.h = dis.h + 'px'
	  console.log("DISH",dis.h)
      for(var i = 0 ; i< dis.municipalData.length; i++){ //creates ylabels and data
				dataHolder = {};
				yLabels.push(dis.municipalData[i].municipality);
				
						dataHolder.name = dis.municipalData[i].municipality;
				dataHolder.data = dis.municipalData[i].data;
				for(var j = 0 ; j<dis.municipalData[i].data.length; j++){
					datSeries.push([j,i,dis.municipalData[i].data[j]])
				}
        dis.chartSeries.push(dataHolder)
      }
      console.log(dis.chartSeries)
      const options: Highcharts.Options = {
        chart: {
					type: 'heatmap',
					marginTop: 40,
					marginBottom: 80,
					plotBorderWidth: 1
				},
						title: {
					text: 'Amount of Rainfall for ' + place
				},
			
				xAxis: {
					categories: ['December','January','February','March','April','May']
				},
			
				yAxis: {
					categories: yLabels,
					title: null
				},
				colorAxis: {
					min: 0,
					minColor: '#ff9635',
					maxColor: '#89fffb'
					// minColor: '#ff9635',
					// maxColor: '#89fffb'
				},
				legend: {
					align: 'right',
					layout: 'vertical',
					margin: 0,
					verticalAlign: 'top',
					y: 25,
					symbolHeight: 280
				},
				tooltip: {
					formatter: function () {
						return '<b>' + this.series.yAxis.categories[this.point.y] + '</b> had <br> <b>' + 
							this.point.value + '</b>cm^3 amount of rainfall on  <br><b>' + this.series.xAxis.categories[this.point.x] + '</b>';
					}
				},
						series: [{
					name: 'Sales per employee',
					data: datSeries,
					

				}],
				plotOptions: {
					series: {
						cursor: 'pointer',
						events : {
							click: function(e) {
								// console.log(e.point)
								dis.obj = e.point;
								console.log(dis.obj.value)
								dis.provincialHeatMap(dis.prabins);
								// console.log(this)
							}
						},
						dataLabels:{
							enabled:true
							// format: '{data}'
						}
					}


					
				}
			
				};
				
				let asd:Highcharts.Chart;
			//   asd.chart = options.chart;
			//   asd.dataLabels =  {
			// 	enabled: true,
			// 	color: '#000000'
			// 	}
			// 	asd.rowsize = 4;
				
					dis.chart = chart(dis.chartTarget.nativeElement, options);

				}, function(err){
					console.log(err)
					alert("Server Error")
				});
			}
  
  constructor(private dataService:DatatransService,private http: Http) { }

  setBar(){
		var dis = this
		var months = ['December 2017', 'January 2018', 'February 2018', 'March 2018', 'April 2018', 'May 2018']
		var categories2 = [];
	  	var dataHolder = [];
		var seriesd = [];
		var total = 0;
		for(var i = 0; i<this.provincialData.length; i++){
			seriesd.push(
				{
					name: this.provincialData[i].region,
					data: this.provincialData[i].data
				}
			)	
		}
		// for(var i = 0; i<months.length; i++){
		// 	for(var j = 0; j<this.provincialData.length; j++){
		// 		total += this.provincialData[j].data[i];
		// 		if(categories2.length < this.provincialData.length){
		// 			categories2.push(this.provincialData[j].region)
		// 		}
		// 	}	
		// 	seriesd.push(
		// 		{
		// 			name: months[i],
		// 			data: dataHolder
		// 		}
		// 	)
		// 	dataHolder = [];
		// }
		console.log("THE SERIES",seriesd)
	const options: Highcharts.Options = {
		chart: {
		  type: 'line'
		},
		plotOptions: {
			column: {
				stacking: 'normal'
			},
			series: {
				cursor: 'pointer',
				events : {
					click: function(e) {
						// console.log(e.point)
						dis.obj = e.point;
						console.log(dis.obj.series.name)
						dis.provincialHeatMap(dis.obj.series.name)
						// console.log(this)
					}
				},
				dataLabels:{
					enabled:true
					// format: '{data}'
				}
			}
		},
		title: {
		  text: 'Regional Total Rainfall'
		},
		xAxis: {
			title:{
				text: 'Month'
			},
		  categories: months
		},
		yAxis: {
		  title: {
			text: ' Amount of Rainfall'
		  }
		},
		series: seriesd
	  };
	
	  this.chart = chart(this.chartTarget.nativeElement, options);
  }

  onChange(event){
	//   console.log(event)
	this.prabins = event;
	this.provincialHeatMap(event)
  }

  ngOnInit() {
	console.log(window.location.hostname)
	var dis = this;
    this.samting =this.dataService.getRegionAve().then(function () {
		dis.provincialData = dis.dataService.getAves();
		for(var i = 0; i<dis.provincialData.length; i++){
			dis.regions.push(dis.provincialData[i].region)
		}		
		console.log("ASDASDASD",dis.regions)
		dis.setMap()
		this.provincialHeatMap("Region I - ILOCOS REGION")
    }, function(err){
		console.log(err)
		alert("Server Error")
    });
    
    console.log("APOL")
	////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////
	console.log(typeof google)
	if(typeof google =="undefined"){
		console.log("WAKSJDHKAJSHDKJASHDKJASHDKJASHDKJASHD")
	}
	this.provincialHeatMap("Region I - ILOCOS REGION")	
	console.log("TANDAAAAAAAAAANG",this.getLocation("Philippines"))
	
  }
  
  redir(x){
	  this.provincialHeatMap(x)
  }

  setMap(){
	var dis = this;
	if(typeof google == 'undefined'){
		setTimeout(this.setMap(),1000);
		return;
	}

	this.getLocation("Philippines")
	var bounds = {northeast
	:
	{lat: 21.2412572, lng: 127.6444784},
	southwest
	:
	{lat: 4.2259, lng: 116.1474999}}
	var mapProp = {
		center: new google.maps.LatLng(12.879721, 121.774017),
		zoom: 6,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	  };
	this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
	

	

	this.map.addListener('click', function(e){
		var result = "";
		this.geocoder = new google.maps.Geocoder();
		this.geocoder.geocode({
            'latLng': e.latLng
          }, function(results, status) {
			 if (status == google.maps.GeocoderStatus.OK) {
				 
				if (results[0] && results[results.length-1].address_components[0].short_name) {
					
					console.log("RESUUUULTS",results)
					// if(results[0].address_components.length >= 7 && results[0].address_components[6].short_name=="PH"){
					// 	console.log("Metropolitan Manila")
					// } else if(results[0].address_components[4].short_name=="PH"){
					// 	console.log(results[0].address_components[2].long_name)
					// }
					for(var i =0; i<results.length; i++){
						if(results[i].types.indexOf("administrative_area_level_2")==0){
							console.log(results[i])
							result = results[i].address_components[0].long_name;
							dis.setChart(result);
							break;
						}
					}
				}
			 }
		  })
	})
  }
  
  	getLocation(term: string):Promise<any> {
		  term = "Region I - ILOCOS REGION"
	return this.http.get('http://maps.google.com/maps/api/geocode/json?address=' + term + 'CA&sensor=false')
		.toPromise()
		.then(
			(res) =>{
				console.log(res.json().results[0].geometry) 
				Promise.resolve(res.json())},
			(err) => {Promise.resolve(err.json())}
		);
	}

	provincialHeatMap(region){
		var dis = this;
		var data:any;
    this.samting =this.dataService.getProvPerReg(region).then(function () {
	  data = dis.dataService.getAves();
	  dis.provHeatMapGen(data,region)
    }, function(err){
      console.log(err)
      alert("Server Error")
    });
	}

	provHeatMapGen(data,region){
		var dis = this;
		// console.log(data)
		var dataSeries:any = [];
		var yLabels:any = [];
		var dataHolder;
		for(var i = 0 ; i< data.length; i++){ //creates ylabels and data
			dataHolder = {};
			yLabels.push(data[i].region);
			
					dataHolder.name = data[i].region;
			dataHolder.data = data[i].data;
			for(var j = 0 ; j<data[i].data.length; j++){
				dataSeries.push([j,i,data[i].data[j]])
			}
			// dis.chartSeries.push(dataHolder)
		}
		
		console.log("DATASERIES",dataSeries,yLabels)
		const options: Highcharts.Options = {
			chart: {
				type: 'heatmap',
				marginTop: 40,
				marginBottom: 80,
				plotBorderWidth: 1
			},
					title: {
				text: 'Amount of Rainfall for ' + region
			},
		
			xAxis: {
				categories: ['December','January','February','March','April','May']
			},
		
			yAxis: {
				categories: yLabels,
				title: null
			},
			colorAxis: {
				min: 0,
				minColor: '#ff9635',
				maxColor: '#89fffb'
			},
			legend: {
				align: 'right',
				layout: 'vertical',
				margin: 0,
				verticalAlign: 'top',
				y: 25,
				symbolHeight: 280
			},
			tooltip: {
				formatter: function () {
					return '<b>' + this.series.yAxis.categories[this.point.y] + '</b> had <br> <b>' + 
						this.point.value + '</b>cm^3 amount of rainfall on  <br><b>' + this.series.xAxis.categories[this.point.x] + '</b>';
				}
			},
					series: [{
				name: 'Sales per employee',
				data: dataSeries,
				

			}],
			plotOptions: {
				series: {
					cursor: 'pointer',
					events : {
						click: function(e) {
							// console.log(e.point)
							dis.obj = e.point;
							console.log("THIS",dis.obj.value,"ASD",yLabels[dis.obj.y],"ASD")
							dis.setChart(yLabels[dis.obj.y]);
							// console.log(this)
						}
					},
					dataLabels:{
						enabled:true
						// format: '{data}'
					}
				}


				
			}
		
			};
			let asd:Highcharts.Chart;	
				dis.chart = chart(dis.chartTarget.nativeElement, options);
			}
	


  

  

}
