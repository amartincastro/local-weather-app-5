$(document).ready(function() {
  // Chrome insists on HTTPS for geolocation, hence we need to do a check for Chrome and let the user know
  function checkChrome() {
    var isChromium = window.chrome,
      winNav = window.navigator,
      vendorName = winNav.vendor,
      isOpera = winNav.userAgent.indexOf("OPR") > -1,
      isIEedge = winNav.userAgent.indexOf("Edge") > -1,
      isIOSChrome = winNav.userAgent.match("CriOS");

    if (isIOSChrome) {
      return true;
    } else if (isChromium !== null && isChromium !== undefined && vendorName === "Google Inc." && isOpera == false && isIEedge == false) {
      return true;
    } else {
      return false;
    }
  }

  function getPosition(position) {
    var longitude = position.coords.longitude;
    var latitude = position.coords.latitude;
    var userLocation = {
      'long': longitude,
      'lat': latitude
    };

    setWeather(userLocation);
  }

  function setWeather(loc) {
    var urlWeather = 'https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=' + String(loc.lat) + '&lon=' + String(loc.long) + '&appid=8a46bdb4e2124cd94984644ea2e38715&units=imperial'

    // Openweathermap doesn't give us the state in the U.S. the city is in.  Google maps helps us here
    var urlLocation = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + String(loc.lat) + ',' + String(loc.long) + '&sensor=true';

    $.getJSON(urlWeather, function(data) {
      $('#temp').html(String(Math.round(data.main.temp)) + '<span id="grade" style="font-size: 20px; position: relative; bottom: 20% ">&deg;<span id="gradeLetter">F</span></span>');
      $('#weather').text(data.weather[0].main);
      $('#icon').html('<i class="wi wi-owm-' + data.weather[0].id + '"></i>');
    });

    $.getJSON(urlLocation, function(data) {
      $('#guidebar').text(data.results[1].formatted_address);
    })
  }

  function parseError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        var msg = "User denied the request for geolocation."
        break;
      case error.POSITION_UNAVAILABLE:
        var msg = "Location information is unavailable."
        break;
      case error.TIMEOUT:
        var msg = "The request to get user location timed out."
        break;
      case error.UNKNOWN_ERROR:
        var msg = "An unknown error occurred."
        break;
    }

    showError(msg);
  }

  function showError(msg) {
    $('#warning').css('display', 'block').html(msg);
    $('#temp').text('X');
    $('#weather').text('X').css('font-size', '60px');
    $('#icon').text('X');
  }

  // ##### Main ##### 

  if (checkChrome() && window.location.protocol != "https:") {
    showError("You need to use HTTPS. Click here: <a target='_top' href='https://codepen.io/crownedjitter/pen/AXzdvQ'>Local Weather</a>")
  } else {
    navigator.geolocation.getCurrentPosition(getPosition, parseError);
  }
})

$('#temp').click(function() {
  var tempVal = $('#gradeLetter').html();
  var tempNum = ($('#temp').text()).slice(0, -2);

  if ( tempVal === 'F') {
    var celsNum = Math.round((Number(tempNum) - 32) * 0.5556);
    $('#temp').html(celsNum + '<span id="grade" style="font-size: 20px; position: relative; bottom: 20% ">&deg;<span id="gradeLetter">C</span></span>');
  } else {
    var fahrNum = Math.round((Number(tempNum) * 1.8) + 32);
    $('#temp').html(fahrNum + '<span id="grade" style="font-size: 20px; position: relative; bottom: 20% ">&deg;<span id="gradeLetter">F</span></span>');
  }
  
  var weather = json.data.weather[0].main;
  
  console.log(data.weather[0].main);
	
	if(weather.indexOf("rain") >= 0) {
		skycons.set("animated-icon", Skycons.RAIN);
	}

	else if (weather.indexOf("sunny") >= 0) {
		skycons.set("animated-icon", Skycons.CLEAR_DAY);
	}

	else if (weather.indexOf("clear") >= 0) {
		console.log(bla);
		}

		else {
			skycons.set("animated-icon", Skycons.CLEAR_NIGHT);
		}		
  
})