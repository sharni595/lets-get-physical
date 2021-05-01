
var calories = document.getElementById("calories");
var protein = document.getElementById("protein");
var carbs = document.getElementById("carbs");
var fat = document.getElementById("fat");
var nutritionInput = document.getElementById("nutrition-input");
var nutritionSearch = document.getElementById("nutrition-search");
var bodyFocus = document.getElementById("body-focus").selectedIndex;

//chart.js chest tracking chart
var workoutData = JSON.parse(localStorage.getItem("workoutData")) || {
    chest: [0,0,0,0,0,0],
    arms: [0,0,0,0,0,0],
    shoulders: [0,0,0,0,0,0],
    back: [0,0,0,0,0,0],
    legs: [0,0,0,0,0,0],
    abs: [0,0,0,0,0,0]
}
//Basically useless but might be useful later
var chartArray = {
    chest: {},
    arms: {},
    shoulders: {},
    back: {},
    legs: {},
    abs: {}
}

//nutrition api set up
function nutritionApi(food){
    var apiUrl = "https://api.edamam.com/api/food-database/v2/parser?app_id=f6bcb10b&app_key=f433e474ba7ce9d3e2329315b7ff8586&ingr=" + food;
    
    fetch(apiUrl, {method: "GET"})
        .then(function(response){
            return response.json();
        }).then(function(data){
            console.log(data);
            console.log(data.hints[0].food.nutrients.ENERC_KCAL);
            console.log(data.hints[0].food.nutrients.PROCNT)
            console.log(data.hints[0].food.nutrients.CHOCDF);
            console.log(data.hints[0].food.nutrients.FAT);
            calories.textContent = data.hints[0].food.nutrients.ENERC_KCAL.toFixed(2);
            protein.textContent = data.hints[0].food.nutrients.PROCNT.toFixed(2);
            carbs.textContent =  data.hints[0].food.nutrients.CHOCDF.toFixed(2);
            fat.textContent = data.hints[0].food.nutrients.FAT.toFixed(2);
        })
    
}


nutritionSearch.addEventListener("click", function(){
    nutritionApi(nutritionInput.value);
});

function renderCharts(){
    $(`.chart-target`).empty().append(`<canvas width="400" height="400"></canvas>`);
    $(`.chart-target`).each((index,element)=>{
        var canvas = $(element).find('canvas')[0];
        var id = element.id;
        var bodyPart = id.substring(14);
        chartArray[bodyPart] = new Chart(canvas, {
            type: "polarArea",
            data:{
                labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
                datasets: [{
                    label: "Weight Lifted",
                    data: workoutData[bodyPart],
                    backgroundColor: [
                        "#300052",
                        "#5f00a3",
                        "#b247ff",
                        "#bfa3ed",
                        "#e7c6ff",
                        "#f6ebff"
                    ]
                }]
            },
            options:{
                height: 300, 
                width: 300
            }
        });
    });
};


$("#form-button").on("click", getUserInput);

function getUserInput(event){
    event.preventDefault();
    $('#input-modal').removeClass('modal-active');
    var bodyPart = $('#body-focus').val();
    var weekIndex = parseInt($('#date').val());
    var poundsInput = $('#pounds').val();

    workoutData[bodyPart][weekIndex] = poundsInput;
        
    localStorage.setItem("workoutData", JSON.stringify(workoutData));
    renderCharts();
    $('#pounds').val("");

}

renderCharts();