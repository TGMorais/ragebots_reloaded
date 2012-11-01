var request = require('request');
var fs = require('fs');
//var im = require('imagemagick');


//https://services.sapo.pt/Codebits/botmake/01,02,03,04,05,06,07,08,I%20Rule!
//Returns the bot image. Format as follows body,bgcolor,grad,eyes,mouth,legs,head,arms,balloon.

var urlname = "https://services.sapo.pt/Codebits/botmake/"

var folder = 'img/';
var filename = '';
var ext = '.png';
var i = 0;
var part = 'body';

var parts = ['body','eyes','mouth','legs','head','arms']
var nparts = 25;
console.log("nparts : " +nparts);

for(x = 0; x<= parts.length-1; x++){
	var tmpurl = urlname
	var part = parts[x];
	if(x==1 )tmpurl += "00,00,00,";
	if(x==2 )tmpurl += "00,00,00,00,";
	if(x==3 )tmpurl += "00,00,00,00,00,";
	if(x==4 )tmpurl += "00,00,00,00,00,00,";
	if(x==5 )tmpurl += "00,00,00,00,00,00,00,";
	var foldername = folder + part;
			
	console.log("foldername : " +foldername);
	console.log("tmpurl : " +tmpurl);
 	fs.mkdir(foldername,function(err){/**/});
		  
	for (i = 1; i<= nparts; i++){

		var id = i;
		if(i<10)
			id = '0' + i;
			
		var suburl = tmpurl + id;			
		filename = folder + part+'/' + i + '_big'+ ext;

		request(suburl).pipe(fs.createWriteStream(filename));

		console.log("tempurl : " + tmpurl);
		console.log("filename : " + filename);
		console.log("suburl : " +suburl);
		console.log("--------"); 
			
		//IMAGE CROPING is made in python, cause nodejs package for image manipulation can't seem to work...
		}
}
 