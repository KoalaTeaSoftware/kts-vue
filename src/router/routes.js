import Home from "@/views/Home";

export const routes = [
    {
        id: 0,
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        id: 1,
        path: '/witomh',
        name: 'WIDOMH',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Widomh.vue')
    },
    {
        id: 2,
        path: '/citb',
        name: 'CITB',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Citb.vue')
    }
]
