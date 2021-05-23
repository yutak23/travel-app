export const renderCurrentWeather = (data, pageData) => {
    renderWeatherAndLocation('current-weather', data.currentWeatherBit, pageData, data);
}

export const renderForecastWeather = (data, pageData) => {
    renderWeatherAndLocation('forecast-weather', data.forecastWeatherBit, pageData, data);
}

const renderWeatherAndLocation = (type, datas, pageData, data) => {
    const tripListEl = document.querySelector('#trip-list');

    const container = document.createElement('div');
    container.classList.add('col-6');
    const formate = document.querySelector('#formate').cloneNode(true);
    container.append(formate);

    // delete id to prevent bugs even if you add more than one
    container.querySelector('#formate').removeAttribute('id');

    // location img
    const imgEl = document.createElement('img');
    imgEl.setAttribute('src', data.pixabay);
    imgEl.classList.add('w-100')
    container.querySelector(`.location-img`).append(imgEl);

    // in the case of the image could not be obtained by the city name
    if (data.pixabayResOp !== 'location') {
        container.querySelector(`.alert-warning`).classList.remove('display-none');
    }

    // location info
    container.querySelector(`.location-title`).innerHTML = `Your trip location is ${pageData.location}, ${pageData.countryName}`;

    // forecast or current
    if (type === 'current-weather') {
        container.querySelector('.card-header').innerHTML = 'The departure date you input is within a week, we tell you "Current Weather Forecast"';
    } else {
        container.querySelector('.card-header').innerHTML = 'The departure date you input is 1 week later, we tell you "Forecast Weather"';
    }

    const docFrag = document.createDocumentFragment();
    datas.forEach(data => {
        const dumyEl = document.createElement('div');
        const originRow = document.querySelector('#repeat-content').cloneNode(true);
        dumyEl.append(originRow);

        const rowEl = document.createElement('tr');
        dumyEl.querySelectorAll('td').forEach((td) => {
            rowEl.append(td);
        })

        // weather data
        rowEl.querySelector(".weather-icon").setAttribute('src', `${data.weather.icon}.png`);
        rowEl.querySelector(".description").innerHTML = `${data.weather.description}`;

        if (type === 'current-weather') {
            // in the case of "Current Weather Forecast"
            container.querySelector(`.case-of-current`).classList.remove('display-none');
            rowEl.querySelector(".valid-date").innerHTML = `${data.datetime.split(':')[0]}`;
            rowEl.querySelector(".max-temp").innerHTML = `ー`;
            rowEl.querySelector(".min-temp").innerHTML = `ー`;
            rowEl.querySelector(".rainy-percent").innerHTML = `ー`;
        } else {
            rowEl.querySelector(".valid-date").innerHTML = `${data.valid_date}`;
            rowEl.querySelector(".max-temp").innerHTML = `${data.max_temp}℃`;
            rowEl.querySelector(".min-temp").innerHTML = `${data.min_temp}℃`;
            rowEl.querySelector(".rainy-percent").innerHTML = `${data.pop}%`;
        }

        docFrag.append(rowEl);
    })

    container.querySelector('.weather-data').append(docFrag);
    tripListEl.append(container);
}