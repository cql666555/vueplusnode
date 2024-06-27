import Vue from "vue";
import VueRouter from "vue-router";

import Index from "../views/Index.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import NotFound from "../views/404.vue";
import Home from "../views/Home.vue";
import Info from "../views/InfoShow";
import FundList from "../views/FundList";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        redirect: "/index",
    },
    {
        path: "/index",
        name: "index",
        component: Index,
        children: [
            {
                path: "",
                component: Home,
            },
            {
                path: "/home",
                component: Home,
            },
            {
                path: "/info",
                component: Info,
            },
            {
                path: "/fundlist",
                component: FundList,
            },
        ],
    },
    {
        path: "/register",
        name: "register",
        component: Register,
    },
    {
        path: "/login",
        name: "login",
        component: Login,
    },
    {
        path: "*",
        name: "NotFound",
        component: NotFound,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

// 路由守卫
router.beforeEach((to, from, next) => {
    const isLogin = localStorage.getItem("eleToken") ? true : false;
    if (to.path === "/login" || to.path === "/register") {
        next();
    } else {
        isLogin ? next() : next("/login");
    }
});

export default router;
