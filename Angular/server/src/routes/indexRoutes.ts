/* Socket configuration */ 
import { Router } from 'express';
import pool from '../database';
import { datacontroller } from '../controllers/dataController';

var dgram = require("dgram");

var serverdb = dgram.createSocket("udp4");


var coord: any;
var lat : any;
var lon :any;
var dt :any;
var h :any;

// Just get data is there is new message
serverdb.on("message", function (msg : any) {

    coord = msg.toString('utf8');
    
    var key=coord.slice(46,54);

    if (key=="DBJ12345" || key=="DBJ12346" ){

    
        console.log(coord);
    
        dt=coord.slice(6,10);
       
        lat=coord.slice(16,19)+"."+coord.slice(19,24);

        lon=coord.slice(24,28)+"."+coord.slice(28,33);
        
        h=coord.slice(11,16);
        
        // Days
        var n = coord[10];
        
        if (key=="DBJ12346"){
            var now = new Date('January 6, 1980 00:00:00 GMT+0:00');
        }
        else{
            var now = new Date('January 6, 1980 00:00:00 GMT+5:00');
        }
        
        
        //Year

        now.setDate(now.getDate()+(dt*7));
        now.setSeconds(now.getSeconds()+h);
        console.log(now);

        //Last day of the current week
        var lastday = new Date(now.setDate(now.getDate() - now.getDay()+6));
        var ld :number = lastday.getDate();
        n=parseInt(n,10);
        

        // The last day of the week change if its over wednesday 12:00
        // To the lastweek day variable remove 7 days
        if (key == "DBJ12345"){
            if (n>=3 && h>43200){//43200
                ld=ld-7;    
            }
    
            if (n>=4){
                ld=ld-7;    
            }
        }
        
        if (key == "DBJ12346"){
            ld=ld-7;
        }
        
        // If its less than 5:00 to the reference hour then keep day as the 
        // addition of lastweek day plus the number given by the syrus

        if (key=="DBJ12345"){
            if (h<18000){
                var day: number= ld+n;
            }
            else{
                // If not add 1 day to because it's already the next day
                var day: number= ld+n+1;
            }
        }
        else{
            var day: number= ld+n+1;
        };
        
        
        // Set the day number to Date
        now.setDate(day);

        // Convert of time format
        var x = now.toISOString().slice(0, 19).replace('T', ' ');;

        // Convert data from string to Float
        lat=parseFloat(lat);
        lon=parseFloat(lon);

        // Json 
        coord = {
            latitud: lat,
            longitud: lon,
            fecha: x
        }
        console.log(coord);
        pool.query('INSERT INTO coord set ?',coord);

    }
});

// Message just to know that the server is listening
serverdb.on("listening", function () {
  var address = serverdb.address();
  console.log("server listening " +
      address.address + ":" + address.port);
});

// Similar to listen the port
serverdb.bind(41231); // Syrus send data to the fixed port





class indexRoutes {

    public router: Router = Router(); 
    

    constructor() {

        this.config();
        
    }
    
    config(): void{
        this.router.get('/data',datacontroller.list); // Route for the requests
        this.router.post('/data/time',datacontroller.dates); // Route for the requests
        
    }

}

const indexroutes = new indexRoutes();
export default indexroutes.router;