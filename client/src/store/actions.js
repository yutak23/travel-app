import axios from "../axios-conf";

export default {
    async getCountries({ commit }) {
        const array = [];
        try {
            const res = await axios.get("/allCountries");
            res.data.countries.forEach(item => {
                array.push(item.name);
            });

            commit("getCountries", array);
        } catch (error) {
            console.log(error.message);
            if (error.response) {
                console.log("response.data", error.response.data);
                console.log("response.status", error.response.status);
            }

            commit("getCountries", []);
        }
    }
}