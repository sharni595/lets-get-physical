
var calories = document.getElementById("calories");
var protein = document.getElementById("protein");
var carbs = document.getElementById("carbs");
var fat = document.getElementById("fat");
var nutritionInput = document.getElementById("nutrition-input");
var nutritionSearch = document.getElementById("nutrition-search");
var bodyFocus = document.getElementById("body-focus").selectedIndex;

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



//chart.js chest tracking chart
var daysOfWeek = JSON.parse(localStorage.getItem("days")) || {
    Week1: 0,
    Week2: 0,
    Week3: 0,
    Week4: 0,
    Week5: 0,
    Week6: 0
};

function displayChart(arr){
    //how to make this function more dynamic??target #dynamic-chart-data id
    $(`#dynamic-chart-${bodyFocus}`).empty().append(`<canvas id="fitnessChart" width="400" height="400"></canvas>
    `)
    //var fitnessChart = document.getElementById("fitnessChart").getContext("2d");

    var barChart = new Chart(fitnessChart, {
        type: "polarArea",
        data:{
            labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
            datasets: [{
                label: "Weight Lifted",
                data: arr,
                backgroundColor: [
                    "#ffe66d",
                    "#ff6b6b",
                    "#4ecdc4",
                    "#577590",
                    "#cbc0d3",
                    "#ffbf69"
                ]
            }]
        },
        options:{
            height: 300, 
            width: 300
        }
    });
};

$("#form-button").on("click", getUserInput)

var newData = {
    ...daysOfWeek //spread operator
}
function getUserInput(event){
    event.preventDefault();
    newData[[document.getElementById("date").value]] = parseInt(newData[[document.getElementById("date").value]]) + parseInt(document.getElementById("pounds").value);
    localStorage.setItem("weeks", JSON.stringify(newData));

    displayChart(Object.values(newData));
}
displayChart(Object.values(daysOfWeek));