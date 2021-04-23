
function nutritionApi(food){
    var apiUrl = "https://api.edamam.com/api/food-database/v2/parser?app_id=f6bcb10b&app_key=f433e474ba7ce9d3e2329315b7ff8586&ingr=" + food;
    
    fetch(apiUrl, {mode: "no-cors"})
        .then(function(response){
            console.log(response);
        }).then(function(data){
            console.log(data);
        })
}

nutritionApi("Croissant");
//"https://nutrition-api.esha.com/foods?Ocp-Apim-Subscription-Key=62ff5d2ceb0d41a08061f352eb72caab&query=" + food + "&start=0&count=5&spell=true"
//"https://platform.fatsecret.com/js?key=fde4e59ae2ce4159afdabf24776cab60"
//"https://api.edamam.com/api/food-database/v2/parser?app_id=f6bcb10b&app_key=f433e474ba7ce9d3e2329315b7ff8586&ingr=" + food"

//pseudocode:

