import { getCountryList, getCityList } from './service';

export const countrySuggest = () => {
    $('[name="country"]').suggest('#', {
        data: getCountryList(),
        map: function (country) {
            return {
                value: `${country.name}:${country.isoCode}`,
                text: '<strong>' + country.name + '</strong>'
            }
        },
        onselect() {
            const countryEl = document.querySelector('[name="country"]');
            const countryCode = countryEl.value.split(':')[1].trim();
            countryEl.value = countryEl.value.split(':')[0].trim().replace('#', '');
            citySuggest(countryCode);
        }
    })
}

const citySuggest = (code) => {
    $('[name="location"]').suggest('#', {
        data: getCityList(code),
        map: function (city) {
            return {
                value: city.name,
                text: '<strong>' + city.name + '</strong>'
            }
        },
        onselect() {
            const locationEl = document.querySelector('[name="location"]');
            locationEl.value = locationEl.value.toString().trim().replace('#', '');
        }
    })
}