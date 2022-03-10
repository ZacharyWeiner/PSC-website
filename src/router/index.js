import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import PreorderCheck from '../views/PreorderCheck.vue'
import Mint from '../views/Mint.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/preorder-check',
    name: 'Preorder Check',
    component: PreorderCheck
  },
  {
    path: '/mint',
    name: 'Mint',
    component: Mint
  }, 
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
