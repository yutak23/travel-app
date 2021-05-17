export const renderImg = (url) => {
    const figureEl = document.querySelector('#location-img');

    const imgEl = document.createElement('img');
    imgEl.setAttribute('src', url);
    imgEl.classList.add('w-100')
    figureEl.append(imgEl);
}