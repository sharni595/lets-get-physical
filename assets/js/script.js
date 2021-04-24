
function nutritionApi(food){
    var apiUrl = "https://api.edamam.com/api/food-database/v2/parser?app_id=f6bcb10b&app_key=f433e474ba7ce9d3e2329315b7ff8586&ingr=" + food;
    
    fetch(apiUrl, {method: "GET"})
        .then(function(response){
            return response.json();
        }).then(function(data){
            console.log(data);
        })
    
    console.log(hints[0].food.nutrients.ENERC_KCAL.value);
}

nutritionApi("apple");

//path to get to caloric value:
