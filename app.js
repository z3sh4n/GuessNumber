
$('#loc-input').keypress(function (e) {

  if (e.which === 13) {

    fetchData($('#loc-input').val())
      .then(data => {
        displayWeatherData(data);
        saveSearchData(data.location.name);
      });
    $('#loc-input').val('')
    $('#on-error').text('');
  }
});
const fetchData = async (location) => {
  try {
    const response = await fetch("http://api.weatherapi.com/v1/current.json?key=6560c19d22b041d5b1c34607241103&q="
      + location + "&aqi=no", {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error("Try to Spell Correct City");
    }

    const json = await response.json();


    return json;

  } catch (err) {
    $('#on-error').text(err);
    console.error(err);
  }

}

const displayWeatherData = (json) => {

  $('#weather-icon').attr("src", `https:${json.current.condition.icon}`);

  $('#location').text(json.location.name);

  $(".details").html(`
  <h3>${json.current.temp_c}°C</h3>
  <p>${json.current.condition.text}</p>
  <p>Humidity: ${json.current.humidity}%</p>
  <p>Wind: ${json.current.wind_kph} KPH</p>
  `)
}

const saveSearchData = (search) => {
  let data = JSON.parse(localStorage.getItem('SearchData'));
  if (!Array.isArray(data)) {
    data = []
  }
  data.push(search)
  localStorage.setItem('SearchData', JSON.stringify(data));

  $('#recent').prepend("<li> " + search + " </li>");
}

const displaySearchData = () => {
  const storedData = JSON.parse(localStorage.getItem('SearchData'));
  storedData.forEach((element) => {
    $('#recent').prepend("<li> " + element + " </li>")
  })

  var lis = document.getElementById('recent')
    .getElementsByTagName('li');
  for (i = 0; i < lis.length; i++) {
   
    lis[i].onclick = finalFunc;
  }
  console.log(storedData)

}

function finalFunc() {
const loca = this.innerHTML 
console.log(this)
  fetchData(loca)
      .then(data => {
        displayWeatherData(data);
        saveSearchData(data.location.name);
      });
    $('#loc-input').val(loca)
    $('#on-error').text('');
}

function clearRecentSearch() {
  localStorage.removeItem("SearchData");
}
displaySearchData()