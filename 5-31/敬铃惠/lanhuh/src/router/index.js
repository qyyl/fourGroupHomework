import Vue from 'vue'
import VueRouter from 'vue-router'
import indexLink from '../views/indexLink.vue'
import Login from '../views/Login.vue'
import productList from '../views/productList.vue'
import addProduct from '../views/addProduct.vue'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/index',
    name: 'Index',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Index.vue'),
    children: [
      {
        path: '/userList',
        name: 'UserList',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/UserList.vue')
      },
      {
        path: '/indexLink',
        name: 'indexLink',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: indexLink
      },
      {
        path: '/productList',
        name: 'productList',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: productList
      },
      {
        path: '/addProduct',
        name: 'addProduct',
        component: addProduct
      }
    ]
  }
]

const router = new VueRouter({
  routes,
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active'
})

export default router
