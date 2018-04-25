const users = require( __dirname + '/../config/db');
var bcrypt = require('bcrypt')
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';



exports.register = function(req, res){
	console.log("ASDASDASD")
	const query = "insert into accounts set ?;"
	bcrypt.genSalt(saltRounds, function(err, salt) {
			if(err){
				console.log("WAT ERR",err)
				res.status(500).send(err)
			}
			else{
			    bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
			    	console.log("DONE",hash)
			        users.query(query,
			     			{	username:req.body.username,
			     				password:hash,
			     				name:"BORTON"
			     			},
			        		 function(err, rows, fields)  {
				        if (err) {
				            res.status(500).send(err);
				        } else {
				        	console.log("QUERY DONE")
				           res.status(200).send({});
				           // console.log(stringx)
				        }
					})
			    });
			}
		});
}


exports.login = function(req, res){
  		const query = " select * from accounts where username = ?"
  		console.log("THEBODY",req.body, typeof(req.body));

  		users.query(query,req.body.username,function(err, rows, fields)  {
	        if (err) {
	        	console.log(err)
	            res.status(500).send({message:"username does not exist"});
	        } else {
	        	console.log("AM HERE")
	        	bcrypt.compare(req.body.password, rows[0].password, function(err, result) {
				    if(err){
				    	console.log(err)
				    	res.status(500).send(result)
				    }else{
				    	res.status(200).send({token:"IAMTHERESULTINGTOKENMAMAYAFORJWTHEHE"})
				    }
				});
	           // console.log(stringx)
	        }
		})


		
  	}