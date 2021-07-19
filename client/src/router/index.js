import Vue from "vue";
import Router from "vue-router";

import CreateTravel from "../views/content/CreateTravel.vue";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [{
        path: "/new",
        component: CreateTravel,
    }]
})