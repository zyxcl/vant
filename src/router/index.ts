import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/home/Home.vue'
import Gohome from '@/pages/home/gohome/Gohome.vue'
import Cart from '@/pages/home/cart/Cart.vue'
import Mine from '@/pages/home/mine/Mine.vue'
import Detail from '@/pages/detail/Detail.vue'
import Address from '@/pages/address/Address.vue'
import CreateAddress from '@/pages/createAddress/CreateAddress.vue'
import Login from '@/pages/login/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/gohome',
      meta: {
        isLogin: true
      },
      children: [
        {
          path: '/gohome',
          name: 'gohome',
          component: Gohome
        },
        {
          path: '/cart',
          name: 'cart',
          component: Cart
        },
        {
          path: '/mine',
          name: 'mine',
          component: Mine
        }
      ]
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail,
      meta: {
        isLogin: true
      }
    },
    {
      path: '/address',
      name: 'address',
      component: Address,
      meta: {
        isLogin: true
      }
    },
    {
      path: '/createAddress',
      name: 'createAddress',
      component: CreateAddress,
      meta: {
        isLogin: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

router.beforeEach((to, from) => {
  if (to.matched.some(v => v.meta.isLogin)) {
    const token = localStorage.getItem('token')
    if (!token) {
      return {
        path: '/login',
        query: {
          redirect: encodeURIComponent(to.fullPath)
        }
      }
    }
  }
})

export default router
