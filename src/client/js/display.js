export const renderImg = (url) => {
    const figureEl = document.querySelector('#location-img');

    const imgEl = document.createElement('img');
    imgEl.setAttribute('src', url);
    imgEl.classList.add('w-100')
    figureEl.append(imgEl);
}

export const renderCurrentWeather = (weatherData, pageData) => {
    const locationTitleEl = document.querySelector('#location-title');
    locationTitleEl.innerHTML = `Your trip location is ${pageData.location}, ${pageData.countryName}`;

    const forcastImgEl = document.querySelector('#curr-img');
    forcastImgEl.setAttribute('src', `${weatherData.icon}.png`);

    const forcastDescriptionEl = document.querySelector('#curr-forc');
    forcastDescriptionEl.innerHTML = `The weather forecast for <span class="fst-italic">${pageData.location}</span> at your destination is <span class="fw-bold">${weatherData.description}</span>.`;
}