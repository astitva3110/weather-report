const https=require("https");
const express=require("express");
const app=express();
const bodypar=require("body-parser");
const  get  = require("http");
app.use(express.static("public"));
app.use(bodypar.urlencoded({extended:true}));
app.get("/" ,function(req,res){
 res.sendFile(__dirname+"/index.html");
})
app.post("/",function(req,res){
    console.log(req.body.cityname);
    const quary=req.body.cityname;
    const keyid="b83903721167cc2a3bc6fde3c27834b1";
    const url="https://api.openweathermap.org/data/2.5/weather?q=" +quary+ "&appid="+keyid+"&units=metric";
     https.get(url,function(response){
        console.log(response.statusCode);
        if(response.statusCode==200){
        response.on("data",function(data){
            const weatherdata=JSON.parse(data);
            const temp=weatherdata.main.temp;
            const weatherdesc=weatherdata.weather[0].description;
            const icon=weatherdata.weather[0].icon;
            const image="http://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<p>The weather is currently ..."+weatherdesc+"</p>") 
            res.write("<h1>The temperature in " +quary+" is "+temp+" degree Celeius</h1>")
            res.write("<img src="+image+">");
            res.send();
        }) 
    }
    else{
            res.sendFile(__dirname+"/fail.html");
    }
     })
})
app.listen(3000,function(){
    console.log("Server is on 3000 port");
})