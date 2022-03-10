import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import PreorderCheck from '../views/PreorderCheck.vue'
import PreorderStats from '../views/PreorderStats.vue'
import Mint from '../views/Mint.vue'
import Check from '../views/Check.vue'


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
  {
    path: '/check',
    name: 'Check',
    component: Check
  }, 
  {
    path: '/stats',
    name: 'Stats',
    component: PreorderStats
  }, 
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
  
  
