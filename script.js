function showInfo(info){
    var deg = Math.floor(info.windAngle);
  switch (true) {
    case deg >= 360 || deg <= 21:
      deg = "N";
      break;
    case deg >= 22 && deg <= 44:
      deg = "NNE";
      break;
    case deg >= 45 && deg <= 66:
      deg = "NE";
      break;
    case deg >= 67 && deg <= 89:
      deg = "ENE";
      break;
    case deg >= 90 && deg <= 111:
      deg = "E";
      break;
    case deg >= 112 && deg <= 134:
      deg = "ESE";
      break;
    case deg >= 135 && deg <= 156:
      deg = "SE";
      break;
    case deg >= 157 && deg <= 179:
      deg = "SSE";
      break;
    case deg >= 180 && deg <= 201:
      deg = "S";
      break;
    case deg >= 202 && deg <= 224:
      deg = "SSO";
      break;
    case deg >= 225 && deg <= 246:
      deg = "SO";
      break;
    case deg >= 247 && deg <= 269:
      deg = "OSO";
      break;
    case deg >= 270 && deg <= 291:
      deg = "O";
      break;
    case deg >= 292 && deg <= 314:
      deg = "ONO";
      break;
    case deg >= 315 && deg <= 336:
      deg = "NO";
      break;
    case deg >= 337 && deg <= 359:
      deg = "NNO";
      break;
    default:
      deg = "no data";
  }

    document.querySelector("#resultado").innerHTML = "lugar: "+info.name+"<br>"+""+"país: "+`<img src="https://flagsapi.com/${info.country}/flat/64.png" width="30px">`+"<br>"+"temperatura (celsius): "+info.temp+"<br>"+`<img src="http://openweathermap.org/img/w/${info.tempIcon}.png">`+"<br>"+"Velocidade do vento: "+info.windSpeed+"<br>"+"Ângulo do vento: "+deg+"<br> <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Brosen_windrose-it.svg/2048px-Brosen_windrose-it.svg.png' width='250px'>";
}

function showWarning(texto){
    document.querySelector("#resultado").innerHTML = texto;
}

function clearInfo(){
    document.querySelector("#resultado").innerHTML = "";
}

document.querySelector('.busca').addEventListener('click', async (event) => {

    event.preventDefault();

    let input = document.querySelector('#searchInput').value;

    if(input !== '') {

        clearInfo();

        showWarning('Carregando...');

        let results = await fetch((`https://api.openweathermap.org/data/2.5/weather?q=     ${encodeURI(input)}&units=metric&lang=pt_br&appid=e8f1178d7e3a0d1a08902eb6aaa6407c`));

        let json = await results.json();

        if(json.cod === 200) {

            showInfo({

                name: json.name,

                country: json.sys.country,

                temp: json.main.temp,

                tempIcon: json.weather[0].icon,

                windSpeed: json.wind.speed,

                windAngle: json.wind.deg

            });

        } else {

            clearInfo();

            showWarning('Não encontramos esta localização.');

        }

    } else {

        clearInfo();

    }

});