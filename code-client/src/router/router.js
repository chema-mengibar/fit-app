import * as vueRouter from 'vue-router';

const routes = [{
        path: '/',
        name: 'Home',
        component: () => (
            import ('../views/Home.vue'))
    },
    {
        path: '/panel',
        name: 'Panel',
        component: () => (
            import ('../views/Panel.vue')),

    },

];

const baseUrl = '' // process.env.BASE_URL

const router = vueRouter.createRouter({
    history: vueRouter.createWebHistory(baseUrl),
    routes
});

router.beforeEach(() => { // to, from, next
    window.scrollTo(0, 0)
})

export default router;