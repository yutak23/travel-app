import axios from "axios";

const instance = axios.create({
    baseURL: "https://ux9dxt91s2.execute-api.ap-northeast-1.amazonaws.com/dev"
});

export default instance;