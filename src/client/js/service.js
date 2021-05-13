// for using async/await in babel
import 'core-js/stable';
import 'regenerator-runtime/runtime';

export const fetchData = async (url = '', country, location, departure) => {
    const response = await fetch(`${url}?country=${country}&location=${location}&departure=${departure}`);

    try {
        const fetchData = await response.json();
        return fetchData;
    } catch (error) {
        console.log("error", error);
    }
}