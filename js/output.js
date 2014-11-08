// http://erikflowers.github.io/weather-icons/

var icons = {
	"clear-day" : "wi-day-sunny", 
	"clear-night": "wi-night-clear", 
	"rain": "wi-rain",
	"snow": "wi-snow",
	"sleet": "wi-rain-mix",
	"wind": "wi-cloudy-windy",
	"fog": "wi-fog",
	"cloudy": "wi-cloudy",
	"partly-cloudy-day": "wi-day-cloudy",
	"partly-cloudy-night": "wi-night-cloudy"
};

function createRow(row, time, icon, summary, temp, cloud) {
	var timec =    row.insertCell(0)
	var iconc =    row.insertCell(1);
	var summaryc = row.insertCell(2);
	var tempc =    row.insertCell(3);
	var cloudc =   row.insertCell(4);

	timec.innerHTML    = time;
	iconc.innerHTML    = icon;
	summaryc.innerHTML = summary;
	tempc.innerHTML    = temp;
	cloudc.innerHTML   = cloud;
}

function addItem ( time, data, elementId) {
	var el = document.getElementById(elementId);
	var itemStr = document.createElement("p");
	itemStr.className = "important";
	itemStr.innerHTML = elementId + " time: " + (time == null ? "NA" : (format(time) +
						  ((time.getDay() != (new Date().getDay())) ? " (tomorrow)" : "")));

	var table  = document.createElement("TABLE");

	for ( i = 0; i < data.length; ++i ) {
		var datapoint = data[i];

		var row = table.insertRow();
		createRow(row, 
			format(new Date(datapoint.time * 1000)), 
			"<i class=\"wi " + icons[datapoint.icon] + "\"></i>", datapoint.summary, 
			round((datapoint.temperature - 32.0) * 5 / 9, 1) + "°C", 
			round(datapoint.cloudCover * 100, 2) + "%");

		console.log(datapoint.icon);
	}

	var header = table.createTHead();
	var hrow    = header.insertRow(0);
	createRow(hrow, "Time", "Icon", "Summary", "Temperature", "Cloud Cover");

	el.innerHTML = "";
	el.appendChild(itemStr);
	el.appendChild(table);
	el.style.display = "block";
}


function output(sunset, sunsetData, sunrise, sunriseData) {
	addItem(sunset, sunsetData, "sunset");
	if ( sunrise != null)
		addItem(sunrise, sunriseData, "sunrise");
}
