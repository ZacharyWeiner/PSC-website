import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import PreorderCheck from '../views/PreorderCheck.vue'
import MintManager from '../views/MintManager.vue'
import Mint from '../views/Mint.vue'
import Check from '../views/Check.vue'
import JSONPage from '../views/JSONPage.vue'
import MintTest from '../views/MintTest.vue'
import MyBag from '../views/MyBag.vue'
import Treasury from '../views/Treasury.vue'
import RelayOrders from '../views/RelayOrders.vue'


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
    path: '/mint-test',
    name: 'Mint Test',
    component: Mint
  }, 
  {
    path: '/check',
    name: 'Check',
    component: Check
  }, 
  {
    path: '/mint-manager',
    name: 'Mint-Manager',
    component: MintManager
  }, 
  {
    path: '/json-page',
    name: 'JSON Page',
    component: JSONPage
  },
  {
    path: '/mint',
    name: 'MINT',
    component: MintTest
  }, 
  {
    path: '/my-bag',
    name: 'My Bag',
    component: MyBag
  },
  {
    path: '/treasury',
    name: 'Treasury',
    component: Treasury
  },
  {
    path: '/relay-orders',
    name: 'Orders',
    component: RelayOrders
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
  
  
