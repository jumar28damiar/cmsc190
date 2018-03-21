  'use strict';

// const importer = require('anytv-node-importer');
const path = require('path');
const users = require( __dirname + '/db');
const fs = require('fs');
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
				console.log(workSheetsFromBuffer[0].data[i][0],provs.indexOf(workSheetsFromBuffer[0].data[i][0]),!findTarget(provinces,workSheetsFromBuffer[0].data[i][0]))
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
