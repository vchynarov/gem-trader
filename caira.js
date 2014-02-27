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


alexandria = new City("alexandria", ["ruby", "silver", "diamond"]);
babylon = new City("babylon", ["ruby", "topaz", "emerald"]);
cairo = new City("cairo", ["diamond", "topaz", "silver"]);


function Gem(name, low, high) {
    this.name = name;
    this.low = low;
    this.high = high;
    gemMap[name] = this;
}

Gem.prototype.getPrice = function() { 
    var range = this.high - this.low;
    return Math.round(((Math.random()*1000) % range) + this.low);
}


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
    $(parentid)[0].innerHTML+= divString;
    for(var i=0; i<list.length; i++) {
        listString="<li>" + list[i] + "</li>"
        $("#" + gemSelector)[0].innerHTML += listString;
    }
}

function divPrint(parent, list) {
    //parent is the CSS selector of the parent
    for(var i=0; i<list.length; i++) {
        //this works, now each city has the proper id.
        city = list[i]
        listString='<div class="cityName" id="' + city + '">' + city +"</div>"
        $(parent)[0].innerHTML += listString;
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
                currentCity = city;
                display();
            }
            
        });

        
    }
    
    
}

$(document).ready(function() { 
    divPrint(game, Object.keys(cities)); 
    display();
    setCityProperties()

});



