/*
 * 
 * START DEFINITiONS
 * */
cities = new Object();
gemMap = new Object();
inventory = new Object();
inventory["coins"] = 100; //initialize this!
game = "#gameContainer";
currentCity = "";
day = 0;


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


Gem.prototype.newPrice = function() { 
    var range = this.high - this.low;
    this.price = Math.round(((Math.random()*1000) % range) + this.low);
    return this.price;
}

Gem.prototype.buy = function() {
    if(inventory["coins"] >= this.price) {
        inventory["coins"] -= this.price;
        inventory[this.name] += 1;
        displayInventory();
    }
}

Gem.prototype.sell = function() {
    if(inventory[this.name] > 0) {
        inventory["coins"] += this.price;
        inventory[this.name] -= 1;
        displayInventory();
    }
    
}


alexandria = new City("alexandria", ["ruby", "silver", "diamond"]);
babylon = new City("babylon", ["ruby", "topaz", "emerald"]);
cairo = new City("cairo", ["diamond", "topaz", "silver"]);

ruby = new Gem("ruby", 30, 80);
silver = new Gem("silver", 1, 10);
diamond = new Gem("diamond", 100, 200);
topaz = new Gem("topaz", 10, 25);
emerald = new Gem("emerald", 20, 50);

function initializeInventory() {
    gemsList = Object.keys(gemMap);
    for(var i=0; i<gemsList.length; i++) {
        gem = gemsList[i]
        inventory[gem] = 0;
    }
}

/*
 * 
 * END OF DEFINITIONS
 * 
 * */
function listPrint(parent, list) {
    //parent is the CSS selector of the parent
    var gemSelector = parent + "Gems"
    var divString = "<div class='gemListing' id='" + gemSelector + "'></div>";

    parentid = "#" + parent;
    $(parentid).append(divString);
    $(parentid).append("<ul>");
    for(var i=0; i<list.length; i++) {
        gem = list[i]
        listingString="<li>" + "<span class='gemName'>" + gem + "</span>"+ "<span gemType='" + gem + "' class='sell " + gem + "'>Sell</span>" ;
        tradeString="<span gemType='" + gem + "' class='buy " + gem + "'>Buy</span><span class='gemPrice " + gem + "'></span></li>";
        finalString = listingString + tradeString;
        $("#" + gemSelector).append(finalString);
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
    $("#days").text(day);
}

function setProperties() {
    citiesList = Object.keys(cities)
    for(var i=0; i<citiesList.length; i++) {
        city = citiesList[i];
        $("#" + city).click(function () {
            city = this.id;
            if(city==currentCity) {
                display();
            }
            else {
                currentCity = city;
                updatePrices();
                day += 1;
                display();
            }
        });
    }
    
    $(".buy").click(function() {
        gem = this["attributes"].getNamedItem("gemType").value;
        gemMap[gem].buy();
    });
    
    $(".sell").click(function() {
        gem = this["attributes"].getNamedItem("gemType").value;
        gemMap[gem].sell();
    });

}

function updatePrices() {
    gemsList = Object.keys(gemMap);
    for(var i=0; i<gemsList.length; i++) {
        gem = gemsList[i]
        $(".gemPrice."+gem).text(gemMap[gem].newPrice());
    }
}

function displayInventory() {
    itemsList = Object.keys(inventory);
    for(var i=0; i<itemsList.length; i++) {
        item = itemsList[i]
        $("#"+item).text(inventory[item]);
    }
}


$(document).ready(function() { 
    divPrint(game, Object.keys(cities));     
    setProperties();
    initializeInventory();
    display();
    displayInventory();

});



