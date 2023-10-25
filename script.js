function showInfo(info){
    document.querySelector("#resultado").innerHTML = "lugar: "+info.name+"<br>"+""+"país: "+info.country+"<br>"+"temperatura (celsius): "+info.temp+"<br>"+`<img src="http://openweathermap.org/img/w/${info.tempIcon}.png">`+"<br>"+"Velocidade do vento: "+info.windSpeed+"<br>"+"Ângulo do vento: "+info.windAngle;
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