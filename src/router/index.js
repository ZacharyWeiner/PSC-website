import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import PreorderCheck from '../views/PreorderCheck.vue'
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
    path: '/check',
    name: 'Check',
    component: Check
  }, 
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
  
  
