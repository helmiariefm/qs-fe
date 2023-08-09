import {createRouter, createWebHistory} from 'vue-router'
import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'
import OrderDetail from '../pages/OrderDetail.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
          path: '/',
          name: 'home',
          component: Home
        },
        {
          path: '/login',
          name: 'login',
          component: Login
        },
        {
          path: '/order-detail',
          name: 'order-detail',
          component: OrderDetail
        }

    ]
})

router.beforeEach((to, _, next) => {
    const isLogin = localStorage.access_token
    
    if(to.name == 'home' && !isLogin){
      next('/login')
    } else if(to.name == 'login' && isLogin){
      next('/')
    } else {
      next()
    }
})

export default router