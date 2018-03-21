<!DOCTYPE html>
<html>
  <head>
    <style>
      /* Always set the map height explicitly to define the size of the div
       * element that contains the map. */
      #map {
        height: 100%;
      }
      /* Optional: Makes the sample page fill the window. */
      html, body {
        height: 100%;
        margin: 0;
        padding: 0;
      }
    </style>
  </head>
  <body>
  asdasdasdasd
    <div id="map" style="width:400px;height:720px;"></div>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script>
    	
		
		var map;
		console.log(this)
		function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
			zoom: 2,
			center: new google.maps.LatLng(2.8,-187.3),
			mapTypeId: 'terrain'
        });
        var geocoder = new google.maps.Geocoder();

        var country = "Philippines";
		var geocoder;

		geocoder.geocode( {'address' : country}, function(results, status) {
		    if (status == google.maps.GeocoderStatus.OK) {
		    	console.log(results[0])
		        map.setCenter(results[0].geometry.location);
		    	map.fitBounds(results[0].geometry.bounds);
		    }
		});
		
		


        map.addListener('click', function(e) {
          geocoder.geocode({
            'latLng': e.latLng
          }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              if (results[0]) {
                console.log(this.parent.frames[1].location)
                console.log(results[0].address_components)
                if(results[0].address_components.length >= 7 && results[0].address_components[6].short_name=="PH"){
                  console.log("Metropolitan Manila")
                  this.parent.frames[1].location="http://127.0.0.1:8080/birt-viewer/preview?__report=C%3A%5Capache-tomcat-7.0.82%5Cwebapps%5Cbirt-viewer%5Crainfall.rptdesign&__format=html&__svg=true&__locale=en_PH&__timezone=CTT&__masterpage=true&__rtl=false&__cubememsize=10&__resourceFolder=C%3A%5Capache-tomcat-7.0.82%5Cwebapps%5Cbirt-viewer&__emitterid=org.eclipse.birt.report.engine.emitter.html&-734436226&NewParameter=Metropolitan Manila";
                } else if(results[0].address_components[4].short_name=="PH"){
                  console.log(results[0].address_components[2].long_name)
                  this.parent.frames[1].location="http://127.0.0.1:8080/birt-viewer/preview?__report=C%3A%5Capache-tomcat-7.0.82%5Cwebapps%5Cbirt-viewer%5Crainfall.rptdesign&__format=html&__svg=true&__locale=en_PH&__timezone=CTT&__masterpage=true&__rtl=false&__cubememsize=10&__resourceFolder=C%3A%5Capache-tomcat-7.0.82%5Cwebapps%5Cbirt-viewer&__emitterid=org.eclipse.birt.report.engine.emitter.html&-734436226&NewParameter="+results[0].address_components[2].long_name;
                }
              }
            }
          });        
        });

        var xhr = new XMLHttpRequest();
		xhr.open('GET', "http://localhost/api/provinces", true);
		xhr.send();
		var compData;
		xhr.onreadystatechange = processRequest;
		var cD = [];

        function processRequest(e) {
        	// console.log(xhr)
        	if(xhr.response.length < 10) {
        		console.log("AAAAAAAAAAAAAAAAAA")
        		return;}
			try {
        	// compData = JSON.parse(xhr.responseText);
			    compData = JSON.parse(xhr.response);
	        	for (var i = 0; i < compData.length; i++) {
	        		cD.push(compData[i] + " Philippines");
	        	}
			}
			catch(err) {
				console.log(xhr.response,err)
			    return;
			}
		 	
			// // for (var i = 0; i < compData.length; i++) {
			// 	// geocodeThat(geocoder,compData[i].province)
			// 	geocoder.geocode( [{'address' : a + " Philippines"}], function(results, status) {
			//     if (status == google.maps.GeocoderStatus.OK) {
			//     	console.log("RESULTS FOR ", a, results);
			    	
			//     }else{
			//     	console.log(a, "FAILED... why :(", status, results)
			//     }
			// });
			// // }
			// console.log(compData.length)
			// cD = 1;
		}

		var addresses = ["Abra Philippines","Agusan del Norte Philippines","Agusan del Sur Philippines","Aklan Philippines","Albay Philippines","Antique Philippines","Apayao Philippines","Aurora Philippines","Basilan Philippines","Bataan Philippines","Batanes Philippines","Batangas Philippines","Benguet Philippines","Biliran Philippines","Bohol Philippines","Bukidnon Philippines","Bulacan Philippines","Cagayan Philippines","Camarines Norte Philippines","Camarines Sur Philippines","Camiguin Philippines","Capiz Philippines","Catanduanes Philippines","Cavite Philippines","Cebu Philippines","Compostela Valley Philippines","Davao del Norte Philippines","Davao del Sur Philippines","Davao Oriental Philippines","Dinagat Islands Philippines","Eastern Samar Philippines","Guimaras Philippines","Ifugao Philippines","Ilocos Norte Philippines","Ilocos Sur Philippines","Iloilo Philippines","Isabela Philippines","Kalinga Philippines","La Union Philippines","Laguna Philippines","Lanao del Norte Philippines","Lanao del Sur Philippines","Leyte Philippines","Maguindanao Philippines","Marinduque Philippines","Masbate Philippines","Metropolitan Manila Philippines","Misamis Occidental Philippines","Misamis Oriental Philippines","Mountain Province Philippines","Negros Occidental Philippines","Negros Oriental Philippines","Northern Samar Philippines","Nueva Ecija Philippines","Nueva Vizcaya Philippines","Occidental Mindoro Philippines","Oriental Mindoro Philippines","Palawan Philippines","Pampanga Philippines","Pangasinan Philippines","Quezon Philippines","Quirino Philippines","Rizal Philippines","Romblon Philippines","Samar Philippines","Sarangani Philippines","Siquijor Philippines","Sorsogon Philippines","South Cotabato Philippines","Southern Leyte Philippines","Sultan Kudarat Philippines","Sulu Philippines","Surigao del Norte Philippines","Surigao del Sur Philippines","Tarlac Philippines","Tawi-Tawi Philippines","Zambales Philippines","Zamboanga del Norte Philippines","Zamboanga del Sur Philippines","Zamboanga Sibugay Philippines"];
		// var cou = 0;
	 //    for (var x = 0; x < addresses.length; x++) {
	 //        $.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address='+addresses[x]+'&sensor=false', null, function (data) {
	 //            var p = data.results[0].geometry.location
	 //            if(p==NULL){
	 //            	cou++;
	 //            }
	 //            var latlng = new google.maps.LatLng(p.lat, p.lng);
	 //            new google.maps.Marker({
	 //                position: latlng,
	 //                map: map
	 //            });

	 //        });
	 //    }
	 //    console.log("ASDASDASDASDASDASDASDA",cou)






      }
        // Create a <script> tag and set the USGS URL as the source.
        // var script = document.createElement('script');
        // // This example uses a local copy of the GeoJSON stored at
        // // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
        // script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
        // document.getElementsByTagName('head')[0].appendChild(script);

      // Loop through the results array and place a marker for each
      // set of coordinates.
      window.eqfeed_callback = function(results) {
        for (var i = 0; i < results.features.length; i++) {
          var coords = results.features[i].geometry.coordinates;
          var latLng = new google.maps.LatLng(coords[1],coords[0]);
          var marker = new google.maps.Marker({
            position: latLng,
            map: map
          });
        }
      }
      
		function geocodeThat(geocoder,a){
	      	geocoder.geocode( {'address' : a + " Philippines"}, function(results, status) {
			    if (status == google.maps.GeocoderStatus.OK) {
			    	console.log("RESULTS FOR ", a, results);
			    	
			    }else{
			    	console.log(a, "FAILED... why :(", status, results)
			    }
			});
		}
      
    </script>
    <script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDAObIZwh-M_0dPGc18GVuXgcZfhnKwXXQ &callback=initMap">
    </script>
  </body>
</html>