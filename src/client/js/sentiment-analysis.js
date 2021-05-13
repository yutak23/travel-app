// for using async/await in babel
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// js module
import { selectFeeling } from './module/select-feeling'
import { removeIcon } from './module/remove-icon'

/**
 * i am module and i judge feeling from input text
 */
export async function sentimentAnalysis(event) {
    event.preventDefault();

    if (txtEl.value) {
        const data = await fetchData('/fetchMeaningCloud', { txt: txtEl.value });
        renderResult(data);
    }
}

// Element
const txtEl = document.querySelector('#txt');
const resultEl = document.querySelector('#results');

const fetchData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const fetchData = await response.json();
        return fetchData;
    } catch (error) {
        console.log("error", error);
    }
}

/**
 * i render result
 * @param {object} data 
 */
function renderResult(data) {
    const addEl = document.createElement('span');
    addEl.innerHTML = `now your feeling is<strong>${selectFeeling(data.score_tag)['value']}</strong>`;
    resultEl.appendChild(addEl);
    resultEl.insertAdjacentHTML('beforeend', `<span class="col">Subjectivity : ${data.subjectivity}</span>`);
    resultEl.insertAdjacentHTML('beforeend', `<span class="col">Agreement : ${data.agreement}</span>`);
    resultEl.insertAdjacentHTML('beforeend', `<span class="col">Irony : ${data.irony}</span>`);
    resultEl.insertAdjacentHTML('beforeend', `<span class="col">Score_tag : ${data.score_tag}</span>`);
    resultEl.insertAdjacentHTML('beforeend', `<span class="col">Confidence : ${data.confidence}</span>`);
}