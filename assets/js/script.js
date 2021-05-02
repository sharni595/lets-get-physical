//chart.js chest tracking chart
var workoutData = JSON.parse(localStorage.getItem("workoutData")) || {
    chest: [0,0,0,0,0,0],
    arms: [0,0,0,0,0,0],
    shoulders: [0,0,0,0,0,0],
    back: [0,0,0,0,0,0],
    legs: [0,0,0,0,0,0],
    abs: [0,0,0,0,0,0]
}
//Allows for dynamic updating of charts without need for a full rerender
var chartsObj = {
    chest: {},
    arms: {},
    shoulders: {},
    back: {},
    legs: {},
    abs: {}
}

//nutrition api set up
$('#nutrition-search').click(nutritionApi);
function nutritionApi(){
    if(!$('#nutrition-input').val()) return;
    var apiUrl = "https://api.edamam.com/api/food-database/v2/parser?app_id=f6bcb10b&app_key=f433e474ba7ce9d3e2329315b7ff8586&ingr=" + $('#nutrition-input').val();
    fetch(apiUrl, {method: "GET"})
        .then(response => response.json())
        .then(data => {
            $('#calories').text(data.hints[0].food.nutrients.ENERC_KCAL.toFixed(0));
            $('#protein').text(data.hints[0].food.nutrients.PROCNT.toFixed(2));
            $('#carbs').text(data.hints[0].food.nutrients.CHOCDF.toFixed(2));
            $('#fat').text(data.hints[0].food.nutrients.FAT.toFixed(2));
    });
}
//This function deletes all chart canvases and then renders new ones with values from chartsObj
function renderCharts(){
    $(`.chart-target`).empty().append(`<canvas width="400" height="400"></canvas>`);
    $(`.chart-target`).each((index,element)=>{
        var canvas = $(element).find('canvas')[0];
        var id = element.id;
        var bodyPart = id.substring(14);
        chartsObj[bodyPart] = new Chart(canvas, {
            type: "polarArea",
            data:{
                labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
                datasets: [{
                    label: "Weight Lifted",
                    data: workoutData[bodyPart],
                    backgroundColor: [
                        "#9D5096",
                        "#EA963F",
                        "#F1E84C",
                        "#5EB057",
                        "#DA418E",
                        "#3CBCEE"
                    ]
                
                }]
            
            },
            options:{
                height: 300, 
                width: 300,
                plugins: {
                    legend: {
                        display: false,
                    }
                }
            }
        });
    });
};

//Dynamic updating by object modification so don't need to rerender all charts
function updateCharts(){
    for(let [key,chart] of Object.entries(chartsObj)){
        for(let i = 0; i < 6; i++){
            chart.data.datasets[0].data[i] = workoutData[key][i];
        }
        chart.update();
    }
}

//This function pulls the input data from the modal and closes the modal
$("#form-button").click(getUserInput);
function getUserInput(event){
    event.preventDefault();
    var bodyPart = $('#body-focus').val();
    var weekIndex = parseInt($('#date').val());
    var poundsInput = $('#pounds').val();

    workoutData[bodyPart][weekIndex] = Math.abs(poundsInput);
    
    localStorage.setItem("workoutData", JSON.stringify(workoutData));
    updateCharts();
    $('#input-modal').removeClass('modal-active');
    $('#pounds').val("");

}

//motivational quote api
$('#add-new').click(quoteApi);
function quoteApi() {
    fetch("https://type.fit/api/quotes")
        .then(response => response.json())
        .then(data => {
            //randomly choose quote to display
            var value = randomNumber(0, 99);
            var chosenQuote = data[value].text;
            var quoteText = document.getElementById("quote-text");
            quoteText.textContent = chosenQuote;
    });
};

//random number generator
var randomNumber = (min,max) => Math.floor(Math.random() * (max - min + 1) + min);

//Call run on start functions
renderCharts();
