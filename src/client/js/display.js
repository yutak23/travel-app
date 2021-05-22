export const renderCurrentWeather = (data, pageData) => {
    renderWeatherAndLocation('current-weather', data.currentWeatherBit, pageData, data.pixabay);
}

export const renderForecastWeather = (data, pageData) => {
    renderWeatherAndLocation('forecast-weather', data.forecastWeatherBit, pageData, data.pixabay);
}

const renderImg = (type, url) => {
    const figureEl = document.querySelector(`#${type} .location-img`);

    const imgEl = document.createElement('img');
    imgEl.setAttribute('src', url);
    imgEl.classList.add('w-100')
    figureEl.append(imgEl);
}

const renderWeatherAndLocation = (type, datas, pageData, url) => {
    renderImg(type, url);

    const locationTitleEl = document.querySelector(`#${type} .location-title`);
    locationTitleEl.innerHTML = `Your trip location is ${pageData.location}, ${pageData.countryName}`;

    const weatherDataEl = document.querySelector(`#${type} .weather-data`);
    const docFrag = document.createDocumentFragment();

    datas.forEach(data => {
        const dumyEl = document.createElement('div');
        const originRow = document.querySelector('#dumy-table #repeat-content').cloneNode(true);
        dumyEl.append(originRow);

        const rowEl = document.createElement('tr');
        dumyEl.querySelectorAll('td').forEach((td) => {
            rowEl.append(td);
        })

        rowEl.querySelector(".weather-icon").setAttribute('src', `${data.weather.icon}.png`);
        rowEl.querySelector(".valid-date").innerHTML = `${data.valid_date}`;
        rowEl.querySelector(".description").innerHTML = `${data.weather.description}`;
        rowEl.querySelector(".max-temp").innerHTML = `${data.max_temp}℃`;
        rowEl.querySelector(".min-temp").innerHTML = `${data.min_temp}℃`;
        rowEl.querySelector(".rainy-percent").innerHTML = `${data.pop}%`;

        docFrag.append(rowEl);
    })

    weatherDataEl.append(docFrag);

    document.querySelector(`#${type}`).classList.remove('display-none');
}