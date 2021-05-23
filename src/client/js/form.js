import Toastify from 'toastify-js'

/**
 * Display an error toaster when the search content is incorrect
 */
export const viewBadSearch = () => {
    Toastify({
        text: "Please input 'Country' and 'Location' before click 'Submit' button.",
        duration: 3000,
        newWindow: true,
        gravity: "top",
        position: "left",
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
    }).showToast();
}

/**
 * Make the Submitting button draw
 */
export const drewSubmittingBtn = () => {
    hiddenSubmitBtn();
    displayLoadingBtn();
}

/**
 * Make the Submit button draw
 */
export const drewSubmitBtn = () => {
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
