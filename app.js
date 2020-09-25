const express=require("express");
const https=require("https");
const bodyparser=require("body-parser");

const app=express();
app.use(bodyparser.urlencoded({extended:true}));


app.get("/",function(req,res)
{
res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){

  const query=req.body.cityname;
  const key="cca56fe2b21fcab628eccb76691abc9c";
  const units="metric";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+key+"&units="+units;
  https.get(url,function(response) {
    console.log(response.statusCode);
    response.on("data",function(data) {
      const weatherData=JSON.parse(data);
      const temp=weatherData.main.temp;
      const weatherDescription=weatherData.weather[0].description;
      const icon=weatherData.weather[0].icon;
      const imageurl="http://openweathermap.org/img/wn/"+icon+"@2x.png"

      res.write("<p> the weather is currently"+weatherDescription+"<p>");

      res.write("the temperature in "+query+" is "+ temp + "degree celcius");
      res.write("<img src="+imageurl+">");
    
      res.send()
  });
  });
})





app.listen(3000, function()
{
  console.log("server is running");
 })
