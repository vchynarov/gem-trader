cities = new Object();
gemMap = new Object();
game = "#gameContainer";
currentCity = "";
money = 0;

function City(name, gems) {
    //gems is going to be passed as an array
    this.name = name;
    this.gems = gems;
    cities[name] = this;
}

function Gem(name, low, high) {
    this.name = name;
    this.low = low;
    this.high = high;
    this.price = 0;
    gemMap[name] = this;
}

Gem.prototype.getPrice = function() { 
    var range = this.high - this.low;
    return Math.round(((Math.random()*1000) % range) + this.low);
}

Gem.prototype.newPrice = function() { 
    var range = this.high - this.low;
    this.price = Math.round(((Math.random()*1000) % range) + this.low);
}


alexandria = new City("alexandria", ["ruby", "silver", "diamond"]);
babylon = new City("babylon", ["ruby", "topaz", "emerald"]);
cairo = new City("cairo", ["diamond", "topaz", "silver"]);

ruby = new Gem("ruby", 30, 80);
silver = new Gem("silver", 1, 10);
diamond = new Gem("diamond", 100, 200);
topaz = new Gem("topaz", 10, 25);
emerald = new Gem("emerald", 20, 50);


function listPrint(parent, list) {
    //parent is the CSS selector of the parent
    var gemSelector = parent + "Gems"
    var divString = "<div class='gemListing' id='" + gemSelector + "'></div>";

    parentid = "#" + parent;
    $(parentid).append(divString);
    $(parentid).append("<ul>");
    for(var i=0; i<list.length; i++) {
        gem = list[i]
        listString="<li>" + "<span class='gemName'>" + gem + "</span>"+ "<span class='gemPrice'>" + gemMap[gem].getPrice() + "</span>" + "</li>";
        $("#" + gemSelector).append(listString);
    }
    $(parentid).append("</ul>");
}

function divPrint(parent, list) {
    //parent is the CSS selector of the parent
    for(var i=0; i<list.length; i++) {
        //this works, now each city has the proper id.
        city = list[i]
        listString='<div class="cityName" id="' + city + '">' + city +"</div>"
        $(parent).append(listString);
        listPrint(city, cities[city].gems);
    }
}

function display() {
    citiesList = Object.keys(cities)
    for(var i=0; i<citiesList.length; i++) {
        city = citiesList[i];
        if(city == currentCity) {
            $("#" + city + "Gems").slideDown();
        }
        else {
            $("#" + city + "Gems").slideUp();
        }
    }
}

function setCityProperties() {
    citiesList = Object.keys(cities)
    for(var i=0; i<citiesList.length; i++) {
        city = citiesList[i];
        $("#" + city).click(function () {
            city = this.id;
            if(city==currentCity) {
                display();
            }
            else {
                updatePrices(city);
                currentCity = city;
                display();
            }
        });
    }
}

function updatePrices(city) {
    for(var i=0; i<cities[city].gems; i++) {
        gemMap[cities[city].gems[i]].newPrice();
    }
}
function tick() {
    
    
}
$(document).ready(function() { 
    divPrint(game, Object.keys(cities)); 
    
    setCityProperties();
    display();

});



