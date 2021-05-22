export const doneSubmit = () => {
    hiddenSubmitBtn();
    displayLoadingBtn();
}

export const doneResponse = () => {
    displaySubmitBtn();
    hiddenLoadingBtn();
}

const hiddenSubmitBtn = () => {
    document.querySelector('#submit-btn').classList.add('display-none');
}

const hiddenLoadingBtn = () => {
    document.querySelector('#loading-btn').classList.add('display-none');
}

const displaySubmitBtn = () => {
    document.querySelector('#submit-btn').classList.remove('display-none');
}

const displayLoadingBtn = () => {
    document.querySelector('#loading-btn').classList.remove('display-none');
}

