import Vue from "vue";
import Router from "vue-router";

import HelloWorld from "../components/HelloWorld.vue";
import CreateTravel from "../views/content/CreateTravel.vue";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [{
        path: "/",
        component: HelloWorld
    }, {
        path: "/new",
        component: CreateTravel,
    }]
})