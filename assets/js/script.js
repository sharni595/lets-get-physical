
//nutrition api set up

function nutritionApi(food){
    var apiUrl = "https://api.edamam.com/api/food-database/v2/parser?app_id=f6bcb10b&app_key=f433e474ba7ce9d3e2329315b7ff8586&ingr=" + food;
    
    fetch(apiUrl, {method: "GET"})
        .then(function(response){
            return response.json();
        }).then(function(data){
            console.log(data);
            console.log(data.hints[0].food.nutrients.ENERC_KCAL);
        })
    
}

nutritionApi("pear");


//chart api set up. Commented out while experimenting with chart.js
// google.charts.load('current', {packages: ['corechart']});
// google.charts.setOnLoadCallback(drawChart);

// function drawChart(mon, tue, wed, thur, fri, sat, sun){
//     var data = google.visualization.arrayToDataTable([
//         ["Day", "Minutes of Exercise", {role: "style"}],
//         ["Monday", 25, "red"],
//         ["Tuesday", 40, "red"],
//         ["Wednesday", 13, "red"],
//         ["Thursday", 35, "red"],
//         ["Friday", 30, "red"],
//         ["Saturday", 35, "red"],
//         ["Sunday", 10, "green"]
//     ]);

//     var options = {
//         height: 200,
//         width: 300
//     };
//     var chart = new google.visualization.ColumnChart(document.getElementById("fitnessChart"));
//     chart.draw(data, options);
// }

//chart.js playground



var fitnessChart = document.getElementById("fitnessChart").getContext("2d");

var barChart = new Chart(fitnessChart, {
    type: "bar",
    data:{
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        datasets: [{
            label: "Minutes of Exercise",
            data: ["10", "20", "45", "32", "26", "30", "38"]
        }]
    },
    options:{
        height: 300, 
        width: 300
    }
});