  'use strict';

// const importer = require('anytv-node-importer');
const path = require('path');
const users = require( __dirname + '/db');
const accounts = require(__dirname + '/../controllers/accounts.js')
const fs = require('fs');
const formidable = require('formidable'),util = require('util');
const provs = ["Abra","Agusan del Norte","Agusan del Sur","Aklan","Albay","Antique","Apayao","Aurora","Basilan","Bataan","Batanes","Batangas","Benguet","Biliran","Bohol","Bukidnon","Bulacan","Cagayan","Camarines Norte","Camarines Sur","Camiguin","Capiz","Catanduanes","Cavite","Cebu","Compostela Valley","Cotabato","Davao del Norte","Davao del Sur","Davao Occidental","Davao Oriental","Dinagat Islands","Eastern Samar","Guimaras","Ifugao","Ilocos Norte","Ilocos Sur","Iloilo","Isabela","Kalinga","La Union","Laguna","Lanao del Norte","Lanao del Sur","Leyte","Maguindanao","Marinduque","Masbate","Metropolitan Manila","Misamis Occidental","Misamis Oriental","Mountain Province","Negros Occidental","Negros Oriental","Northern Samar","Nueva Ecija","Nueva Vizcaya","Occidental Mindoro","Oriental Mindoro","Palawan","Pampanga","Pangasinan","Quezon","Quirino","Rizal","Romblon","Samar","Sarangani","Siquijor","Sorsogon","South Cotabato","Southern Leyte","Sultan Kudarat","Sulu","Surigao del Norte","Surigao del Sur","Tarlac","Tawi-Tawi","Zambales","Zamboanga del Norte","Zamboanga del Sur","Zamboanga Sibugay" ]
var xlsx = require('node-xlsx').default;
module.exports = (router) => {

	// const __ = importer.dirloadSync(__dirname + '/../controllers/');
	router.get('/api/subSheds', function(req,res){
		const query = 'select * from sub_sheds;'
			users.query(query, function(err, rows, fields)  {
	        if (err) {
	            res.status(500).send(err);
	        } else {
	        	// res.setheader('Allow-Access-Control-Origin','*');
	           res.status(200).send(rows);
	        }
			});
	});

	router.post('/api/updateData',function(req,res){
		var form = new formidable.IncomingForm();
	    form.parse(req, function(err, fields, files) {
	      res.writeHead(200, {'content-type': 'text/csv'});
	      res.write('received upload:\n\n');
	      res.end(util.inspect({fields: fields, files: files}));
	    });
	    // file.name = "theData"
	    form.keepExtensions = true;
 		form.uploadDir = `${__dirname}`;
 		form
 		.on('error', function(err) {
        	res.status(500).send(err)
    	})
 		.on('file', function(field, file) {
            //rename the incoming file to the file's name
                // fs.rename(file.path, form.uploadDir + "/" + "TheFile.xlsx");
                const workSheetsFromBuffer = xlsx.parse(file.path);

				const workSheetsFromFile = xlsx.parse(file.path);
				var stringx = "";
				for (var i = 2; i<workSheetsFromFile[0].data.length-1; i++) {
					// if(provs.indexOf(workSheetsFromBuffer[0].data[i][0])!=-1 && !findTarget(provinces,workSheetsFromBuffer[0].data[i][0])){
					// 	console.log(workSheetsFromBuffer[0].data[i][0],provs.indexOf(workSheetsFromBuffer[0].data[i][0]),!findTarget(provinces,workSheetsFromBuffer[0].data[i][0]))
					// 	provinces.push([workSheetsFromBuffer[0].data[i][0]])
					// 	currProv = workSheetsFromBuffer[0].data[i][0]
					// }else{
					// 	workSheetsFromBuffer[0].data[i].push(currProv)
					// 	municipalities.push(workSheetsFromBuffer[0].data[i])

					// }
					// console.log(workSheetsFromFile[0].data[i][0]+","+workSheetsFromFile[0].data[i][1]+","+workSheetsFromFile[0].data[i][2]+","+workSheetsFromFile[0].data[i][3]+","+workSheetsFromFile[0].data[i][4]+","+workSheetsFromFile[0].data[i][5]+","+workSheetsFromFile[0].data[i][6]+","+workSheetsFromFile[0].data[i][7]+","+workSheetsFromFile[0].data[i][8]+","+workSheetsFromFile[0].data[i][9]+","+workSheetsFromFile[0].data[i][10]+","+workSheetsFromFile[0].data[i][11]+","+workSheetsFromFile[0].data[i][12]+","+workSheetsFromFile[0].data[i][13]+","+workSheetsFromFile[0].data[i][14]+","+workSheetsFromFile[0].data[i][15]+","+workSheetsFromFile[0].data[i][16]+","+workSheetsFromFile[0].data[i][17]+","+workSheetsFromFile[0].data[i][18]+","+workSheetsFromFile[0].data[i][19]+","+workSheetsFromFile[0].data[i][20]+","+workSheetsFromFile[0].data[i][21]+","+workSheetsFromFile[0].data[i][22]+","+workSheetsFromFile[0].data[i][23]+","+workSheetsFromFile[0].data[i][24]+","+workSheetsFromFile[0].data[i][25]+","+workSheetsFromFile[0].data[i][26]+","+workSheetsFromFile[0].data[i][27]+","+workSheetsFromFile[0].data[i][28]+","+workSheetsFromFile[0].data[i][29]+","+workSheetsFromFile[0].data[i][30]+","+workSheetsFromFile[0].data[i][31]+","+workSheetsFromFile[0].data[i][32]+","+workSheetsFromFile[0].data[i][33]+","+workSheetsFromFile[0].data[i][34]+","+workSheetsFromFile[0].data[i][35]+","+workSheetsFromFile[0].data[i][36]+","+workSheetsFromFile[0].data[i][37]+","+workSheetsFromFile[0].data[i][38]);
					// stringx.push(workSheetsFromFile[0].data[i]);
					stringx  = stringx + "("+"'"+workSheetsFromFile[0].data[i][0]+"'"+","+"'"+workSheetsFromFile[0].data[i][1]+"'"+","+"'"+workSheetsFromFile[0].data[i][2]+"'"+","+"'"+workSheetsFromFile[0].data[i][3]+"'"+","+"'"+workSheetsFromFile[0].data[i][4]+"'"+","+"'"+workSheetsFromFile[0].data[i][5]+"'"+","+"'"+workSheetsFromFile[0].data[i][6]+"'"+","+"'"+workSheetsFromFile[0].data[i][7]+"'"+","+"'"+workSheetsFromFile[0].data[i][8]+"'"+","+"'"+workSheetsFromFile[0].data[i][9]+"'"+","+"'"+workSheetsFromFile[0].data[i][10]+"'"+","+"'"+workSheetsFromFile[0].data[i][11]+"'"+","+"'"+workSheetsFromFile[0].data[i][12]+"'"+","+"'"+workSheetsFromFile[0].data[i][13]+"'"+","+"'"+workSheetsFromFile[0].data[i][14]+"'"+","+"'"+workSheetsFromFile[0].data[i][15]+"'"+","+"'"+workSheetsFromFile[0].data[i][16]+"'"+","+"'"+workSheetsFromFile[0].data[i][17]+"'"+","+"'"+workSheetsFromFile[0].data[i][18]+"'"+","+"'"+workSheetsFromFile[0].data[i][19]+"'"+","+"'"+workSheetsFromFile[0].data[i][20]+"'"+","+"'"+workSheetsFromFile[0].data[i][21]+"'"+","+"'"+workSheetsFromFile[0].data[i][22]+"'"+","+"'"+workSheetsFromFile[0].data[i][23]+"'"+","+"'"+workSheetsFromFile[0].data[i][24]+"'"+","+"'"+workSheetsFromFile[0].data[i][25]+"'"+","+"'"+workSheetsFromFile[0].data[i][26]+"'"+","+"'"+workSheetsFromFile[0].data[i][27]+"'"+","+"'"+workSheetsFromFile[0].data[i][28]+"'"+","+"'"+workSheetsFromFile[0].data[i][29]+"'"+","+"'"+workSheetsFromFile[0].data[i][30]+"'"+","+"'"+workSheetsFromFile[0].data[i][31]+"'"+","+"'"+workSheetsFromFile[0].data[i][32]+"'"+","+"'"+workSheetsFromFile[0].data[i][33]+"'"+","+"'"+workSheetsFromFile[0].data[i][34]+"'"+","+"'"+workSheetsFromFile[0].data[i][35]+"'"+","+"'"+workSheetsFromFile[0].data[i][36]+"'"+","+"'"+workSheetsFromFile[0].data[i][37]+"'"+","+"'"+workSheetsFromFile[0].data[i][38]+"'"+"),"
					// console.log(workSheetsFromFile[0].data[i][38]);
					// const query = "delete from sub_sheds where location = ? and watershed = ? and subwatershed = ?; insert into sub_sheds values ?;"
					// users.query(query,prabins, function(err, rows, fields)  {
				 //        if (err) {
				 //            res.status(500).send(err);
				 //        } else {
				 //           res.status(200).send(sendingmodeOn);
				 //        }
					// })

				}

				// const query = "REPLACE into sub_sheds values ?"
				// 	users.query(query,stringx, function(err, rows, fields)  {
				//         if (err) {
				//             res.status(500).send(err);
				//         } else {
				//            // res.status(200).send("DONE");
				//            console.log(query,stringx)
				//         }
				// 	})
				stringx = stringx.replace(/.$/,";")
				stringx = "REPLACE INTO sub_sheds values " + stringx;
				users.query(stringx, function(err, rows, fields)  {
				        if (err) {
				            res.status(500).send(err);
				        } else {
				           // res.status(200).send("DONE");
				           console.log(stringx)
				        }
					})
				// console.log(stringx);
        });


	    
	 
	    return;
	});

  	router.post('/api/login', accounts.login)

	router.get('/api/adminView/:watershed',function(req,res){
		const query = "select * from sub_sheds where watershed = ?";
		users.query(query,req.params.watershed,function(err,rows,fields){
			if(err){
				res.status(500).send(err);
			}else{
				res.status(200).send(rows);
			}
		})
	})

	router.get('/api/watersheds', function(req,res){
		const query = 'select watershed from sub_sheds group by watershed;'
			users.query(query, function(err, rows, fields)  {
	        if (err) {
	            res.status(500).send(err);
	        } else {
	        	// res.setheader('Allow-Access-Control-Origin','*');
	           res.status(200).send(rows);
	        }
			});
	});

	router.get('/api/provinces', function(req,res){
		const query = 'select * from provinces;'
			users.query(query, function(err, rows, fields)  {
	        if (err) {
	            res.status(500).send(err);
	        } else {
	        	// res.setheader('Allow-Access-Control-Origin','*');
	           res.status(200).send(rows);
	        }
		});
	});

	router.get('/api/municipalities/:province', function(req,res){
		let prabins = req.params.province
		let newData = {};
		let sendingmodeOn = [];
		const query = 'select municipality,truncate((december),2) december,truncate((january),2) january,truncate((february),2) february,truncate((march),2) march,truncate((april),2) april,truncate((may),2) may from municipalities where province = ? order by municipality desc'
			users.query(query,prabins, function(err, rows, fields)  {
	        if (err) {
	            res.status(500).send(err);
	        } else {
	        	// res.setheader('Allow-Access-Control-Origin','*');
	        	for(var i =0 ; i < rows.length ; i++){
	        		newData.municipality = rows[i].municipality;
	        		newData.data = [];
	        		newData.data.push(rows[i].december)
	        		newData.data.push(rows[i].january);
	        		newData.data.push(rows[i].february)
	        		newData.data.push(rows[i].march)
	        		newData.data.push(rows[i].april)
	        		newData.data.push(rows[i].may)
	        		sendingmodeOn.push(newData);
	        		newData = {};
	        	}
	           res.status(200).send(sendingmodeOn);
	        }
		});
	});

	router.get('/api/countryAve', function(req,res){
		var newData = {};
		var sendingmodeOn = [];
		const query = 'select truncate(avg(december),2) december,truncate(avg(january),2) january,truncate(avg(february),2) february,truncate(avg(march),2) march,truncate(avg(april),2) april,truncate(avg(may),2) may, province from municipalities group by province;'

			users.query(query, function(err, rows, fields)  {
	        if (err) {
	            res.status(500).send(err);
	        } else {
	        	for(var i =0 ; i < rows.length ; i++){
	        		newData.province = rows[i].province;
	        		newData.data = [];
	        		newData.data.push(rows[i].december)
	        		newData.data.push(rows[i].january);
	        		newData.data.push(rows[i].february)
	        		newData.data.push(rows[i].march)
	        		newData.data.push(rows[i].april)
	        		newData.data.push(rows[i].may)
	        		sendingmodeOn.push(newData);
	        		newData = {};
	        	}
	        	// res.setheader('Allow-Access-Control-Origin','*');
	           res.status(200).send(sendingmodeOn);
	        }
		});
	});



	router.get('/api/regionalAve', function(req,res){
		var newData = {};
		var sendingmodeOn = [];
		const query = 'select truncate(sum(december),2) december,truncate(sum(january),2) january,truncate(sum(february),2) february,truncate(sum(march),2) march,truncate(sum(april),2) april,truncate(sum(may),2) may, region from municipalities group by region;'

			users.query(query, function(err, rows, fields)  {
	        if (err) {
	            res.status(500).send(err);
	        } else {
	        	for(var i =0 ; i < rows.length ; i++){
	        		newData.region = rows[i].region;
	        		newData.data = [];
	        		newData.data.push(rows[i].december)
	        		newData.data.push(rows[i].january);
	        		newData.data.push(rows[i].february)
	        		newData.data.push(rows[i].march)
	        		newData.data.push(rows[i].april)
	        		newData.data.push(rows[i].may)
	        		sendingmodeOn.push(newData);
	        		newData = {};
	        	}
	        	// res.setheader('Allow-Access-Control-Origin','*');
	           res.status(200).send(sendingmodeOn);
	        }
		});
	});


	router.get('/api/provincesPerRegion/:region', function(req,res){
		var newData = {};
		var sendingmodeOn = [];
		const query = 'select province, truncate(AVG(december),2) december,truncate(AVG(january),2) january,truncate(AVG(february),2) february,truncate(AVG(march),2) march,truncate(AVG(april),2) april,truncate(AVG(may),2) may, region from municipalities where region = ? group by province;'

			users.query(query, req.params.region,function(err, rows, fields)  {
	        if (err) {
	            res.status(500).send(err);
	        } else {
	        	for(var i =0 ; i < rows.length ; i++){
	        		newData.region = rows[i].province;
	        		newData.data = [];
	        		newData.data.push(rows[i].december)
	        		newData.data.push(rows[i].january);
	        		newData.data.push(rows[i].february)
	        		newData.data.push(rows[i].march)
	        		newData.data.push(rows[i].april)
	        		newData.data.push(rows[i].may)
	        		sendingmodeOn.push(newData);
	        		newData = {};
	        	}
	        	// res.setheader('Allow-Access-Control-Origin','*');
	           res.status(200).send(sendingmodeOn);
	        }
		});
	});

	router.get('/api/subSheds/:waters', function(req,res){
		const query = 'select Location,COUNT(subwatershed) "numSheds", SUM(total_number_of_streams) "numStreams", SUM(total_stream_length_km) "sumStreamLength", SUM(Basin_Length_km) "sumBasinLength", SUM(Area_km2) "totalArea" from sub_sheds where watershed = ? group by watershed;'
			users.query(query,req.params.waters, function(err, rows, fields)  {
	        if (err) {
	            res.status(500).send(err);
	        } else {
	        	// res.setheader('Allow-Access-Control-Origin','*');
	           res.status(200).send(rows);
	        }
			});
	});



	router.get('/api/readFile',function(req,res){
		const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(`${__dirname}/data.xlsx`));
		// Parse a file
		const workSheetsFromFile = xlsx.parse(`${__dirname}/data.xlsx`);
		// console.log(workSheetsFromFile);
		// console.log(workSheetsFromBuffer[0].data);
		var provinces = [];
		var municipalities = [];
		var something = []
		var currProv = "";
		var addedProvinceFlag = 0;
		for (var i = 1; i<workSheetsFromFile[0].data.length; i++) {
			if(provs.indexOf(workSheetsFromBuffer[0].data[i][0])!=-1 && !findTarget(provinces,workSheetsFromBuffer[0].data[i][0])){
				// console.log(workSheetsFromBuffer[0].data[i][0],provs.indexOf(workSheetsFromBuffer[0].data[i][0]),!findTarget(provinces,workSheetsFromBuffer[0].data[i][0]))
				provinces.push([workSheetsFromBuffer[0].data[i][0]])
				currProv = workSheetsFromBuffer[0].data[i][0]
			}else{
				workSheetsFromBuffer[0].data[i].push(currProv)
				municipalities.push(workSheetsFromBuffer[0].data[i])

			}
		}
		console.log(provinces)
		var query1 = "insert into provinces values ?;";
		var query2 = "insert into municipalities(municipality,december,january,february,march,april,may,province) values ?"
		users.query(query1,[provinces], function(err,rows,fields){
				if(!err){
					users.query(query2,[municipalities], function(err,rows,fields){
						if(err){
								console.log(err);
								res.status(500).send(err)
						}else{
							res.send(provinces)
						}
					})
				}else{
					res.send(err)
				}
		})

	})
	router.all('*', (req, res) => {
		res.status(404).send({message : 'Unmatched route. =(('});
	});

	return router;

	function findTarget(arrayofarray,target){
		for(var i=0; i<arrayofarray.length; i++){
			if(arrayofarray[i][0]==target){
				return true;
			}
		}
		return false;
	}
};
