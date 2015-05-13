//Global variables
//Number of hours the shops are open
var numHours = 12;

function DonutShop(minCustomers, maxCustomers, numDonutsHour, hoursOfOperation){

  //Private Members
  var donutsPerHourArray = [];
  var donutsPerCustomer = numDonutsHour;
  var hoursOpen = hoursOfOperation;


  //Private Methods
  //Generate Data for the day based on hoursOfOperation argument.
  var generateShopData = function(){
    for (var i = 0; i < hoursOfOperation; i++) {
      var customersHour = randomInt(minCustomers, maxCustomers);
      var donutsSoldHour = customersHour * donutsPerCustomer;
      var hourObject = {}
        hourObject.customerHour = customersHour;
        hourObject.donutHour = donutsSoldHour;
      donutsPerHourArray.push(hourObject);
    };
    //console.log(donutsPerHourArray);
  }

  //Public Methods
  //Returns the total number of donuts for the day
  this.donutsPerDay = function(){
    var totalDonuts = 0;
    for (var i = 0; i < donutsPerHourArray.length; i++) {
      totalDonuts += donutsPerHourArray[i].donutHour;
    };
    return Math.floor(totalDonuts);
  }

  //Returns the average donuts sold per hour
  this.averageDonutsPerHour = function(){
    var totalHours = 0;
    for (var i = 0; i < donutsPerHourArray.length; i++) {
      totalHours += donutsPerHourArray[i].donutHour;
    };

    return Math.floor(totalHours/hoursOpen);
  }

  //Returns the total number of customers for the day
  this.customersPerDay = function(){
    var totalCustomers = 0;
    for (var i = 0; i < donutsPerHourArray.length; i++) {
      totalCustomers += donutsPerHourArray[i].customerHour;
    };
    return Math.floor(totalCustomers);
  }

  //Returns the average number of customers hour
  this.averageCustomersPerHour = function(){
    var totalCustomers = 0;

    for (var i = 0; i < donutsPerHourArray.length; i++) {
      totalCustomers += donutsPerHourArray[i].customerHour;
    };

    return Math.floor(totalCustomers/hoursOpen);
  }

  //Private Utility methods
  //returns a int between min and max inclusive.
  function randomInt(min, max){
    return Math.floor(Math.random() * (1 + max - min) + min);
  }

  //returns a number between min and max inclusive.
  function randomNumber(min, max){
    return Math.random() * (1 + max - min) + min;
  }

  //generate shop data
  generateShopData();
}

function ShopManager(){

  //Array containing list of shop objects
  var shopList = [];
  var donutImage = "";

  //Adds shops to the shopList array
  this.addShop = function(shopName, minCustomers, maxCustomers, numDonutsHour, operationHours){
    var shop = new DonutShop(minCustomers, maxCustomers, numDonutsHour, operationHours);
    var shopObject = {};
      shopObject.shopName = shopName;
      shopObject.shopData = shop;
    shopList.push(shopObject);
  }


  this.totalDonutsAllShops = function(){
    var totalAllShops = 0;
    for (var i = 0; i < shopList.length; i++) {
      totalAllShops += shopList[i].shopData.donutsPerDay();
    };
    return totalAllShops;
  }

  this.totalCustomersAllShops = function(){
     var totalAllShops = 0;
    for (var i = 0; i < shopList.length; i++) {
      totalAllShops += shopList[i].shopData.customersPerDay();
    };
    return totalAllShops;
  }

  this.addImageToReport = function(path){
    donutImage = path;
  }

  //Generate simple report
  this.generateReport = function(){
    var newLine  = "\n";

    var reportText = "  <table>\n";
    reportText = reportText + "   <thead>" + newLine;
    reportText = reportText + "     <th colspan='2'>" + newLine;
    reportText = reportText + "       <h1><img src='"+donutImage+"'>Donut Shop Report</h1>" + newLine;
    reportText = reportText + "     </th>" + newLine;
    reportText = reportText + "   </thead>" + newLine;

    for (var i = 0; i < shopList.length; i++) {
      //shopList[i]
      console.log(shopList[i].shopName+" Donut Shop");
      console.log("Average Donuts Hour: " + shopList[i].shopData.averageDonutsPerHour());
      console.log("Average Customers Hour: " +shopList[i].shopData.averageCustomersPerHour());
      console.log("Total Donuts: " +shopList[i].shopData.donutsPerDay());
      console.log("Total Customers: " +shopList[i].shopData.customersPerDay());
      console.log("_________________________________");


      reportText = reportText + "   <tbody class='shop"+ i +"'>" + newLine;

      reportText = reportText + "   <tr class='title'>" + newLine;
      reportText = reportText + "     <th colspan='2' width='300'><h3>"+shopList[i].shopName+" Donut Shop<h3></th>" + newLine;
      reportText = reportText + "   </tr>" + newLine;

      reportText = reportText + "     <tr class='even'>" + newLine;
      reportText = reportText + "       <th>Average Donuts Hour: </th>" + newLine;
      reportText = reportText + "       <td>"+shopList[i].shopData.averageDonutsPerHour()+"</td>" + newLine;
      reportText = reportText + "     </tr>" + newLine;

      reportText = reportText + "     <tr class='odd'>" + newLine;
      reportText = reportText + "       <th>Average Customers Hour: </th>" + newLine;
      reportText = reportText + "       <td>"+shopList[i].shopData.averageCustomersPerHour()+"</td>" + newLine;
      reportText = reportText + "     </tr>" + newLine;

      reportText = reportText + "     <tr class='even'>" + newLine;
      reportText = reportText + "       <th>Total Donuts: </th>" + newLine;
      reportText = reportText + "       <td>"+shopList[i].shopData.donutsPerDay()+"</td>" + newLine;
      reportText = reportText + "     </tr>" + newLine;

      reportText = reportText + "     <tr class='odd'>" + newLine;
      reportText = reportText + "       <th>Total Customers: </th>" + newLine;
      reportText = reportText + "       <td>"+shopList[i].shopData.customersPerDay()+"</td>" + newLine;
      reportText = reportText + "     </tr>" + newLine;

      reportText = reportText + "   </tbody>" + newLine;
    };

    reportText = reportText + "   <tfoot class='footer'>" + newLine;

    reportText = reportText + "     <tr class='title'>" + newLine;
    reportText = reportText + "       <th colspan='3' width='700'><h3 class='footerTitle'>Total of all Shops<h3></th>" + newLine;
    //reportText = reportText + "       <td></td>" + newLine;
    reportText = reportText + "     </tr>" + newLine;

    reportText = reportText + "     <tr class='even'>" + newLine;
    reportText = reportText + "       <td width='700'></td>" + newLine;
    reportText = reportText + "       <th>Total Donuts All Shops: </th>" + newLine;
    reportText = reportText + "       <td>"+this.totalDonutsAllShops()+"</td>" + newLine;
    reportText = reportText + "     </tr>" + newLine;

    reportText = reportText + "     <tr class='odd'>" + newLine;
    reportText = reportText + "       <td width='700'></td>" + newLine;
    reportText = reportText + "       <th>Total Customers All Shops: </th>" + newLine;
    reportText = reportText + "       <td>"+this.totalCustomersAllShops()+"</td>" + newLine;
    reportText = reportText + "     </tr>" + newLine;

    reportText = reportText + "   </tfoot>" + newLine;

    reportText = reportText + "</table>";
    //
    //document.getElementById('ID_OF_YOUR_ELEMENT').innerHTML += '<tr><td>' + string + '</td></tr>'; 

    addDataById("report", reportText);
  }
}

//Instatiate Shop Manager.
var shopManager = new ShopManager();
shopManager.addShop("Downtown", 8, 43, 4.5, numHours);
shopManager.addShop("Capitol Hill", 4, 37, 2, numHours);
shopManager.addShop("South Lake Union", 9, 23, 6.33, numHours);
shopManager.addShop("Wedgewood", 2, 28, 1.25, numHours);
shopManager.addShop("Ballard", 8, 58, 3.75, numHours);

shopManager.addImageToReport("http://www.shawnfiske.com/schoolImages/theDonut.jpg");

shopManager.generateReport();

function addDataById(id, data) {
  console.log(id +"\n"+ data);
  var elem = document.getElementById(id);
  elem.innerHTML = data;
}
