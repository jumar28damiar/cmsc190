create table Provinces(

	province varchar(30) NOT NULL PRIMARY KEY
	);

create table municipalities(
	province varchar(30),
	December float(11),
	January float(11),
	February float(11),
	March float(11),
	April float(11),
	May float(11),
	FOREIGN KEY (province) references provinces(province) on delete cascade
);

