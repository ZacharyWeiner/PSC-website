import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Home2 from '../views/Home2.vue'
import PreorderCheck from '../views/PreorderCheck.vue'
import MintManager from '../views/MintManager.vue'
import Mint from '../views/Mint.vue'
import Check from '../views/Check.vue'
import JSONPage from '../views/JSONPage.vue'
import MintTest from '../views/MintTest.vue'
import MyBag from '../views/MyBag.vue'
import Treasury from '../views/Treasury.vue'
import RelayOrders from '../views/RelayOrders.vue'
import Votes from '../views/Votes.vue'
import Gopniks from '../views/friends/Gopniks.vue'
import Quokkas from '../views/friends/Quokkas.vue'
import Popsicle from '../views/friends/Popsicle.vue'
import Savages from '../views/friends/Savages.vue'
import SavagesBag from '../views/bags/Savages.vue'
import StickDoodz from '../views/friends/StickDoodz.vue'
import FriendsBag from '../views/bags/FriendBag.vue'
import Moose from '../views/friends/Moose.vue'
import Tools from '../views/Tools.vue'
import Spend from '../views/Spend.vue'
import Claims from '../views/Claims.vue'
import Friends from '../views/FriendsOfPew.vue'
import Snipers from '../views/secret/Sniper.vue'


const routes = [
  {
    path: '/2',
    name: 'Home',
    component: Home
  },
  {
    path: '/',
    name: 'Home2',
    component: Home2
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
  {
    path: '/votes',
    name: 'Votes',
    component: Votes
  },
  {
    path: '/friends',
    name: 'Friends',
    component: Friends
  },
  {
    path: '/friends/bag',
    name: 'FriendsBag',
    component: FriendsBag
  },
  {
    path: '/claims',
    name: 'Claims',
    component: Claims
  },
  {
    path: '/spend',
    name: 'Spend',
    component: Spend
  },
  {
    path: '/friends/gopniks',
    name: 'Gopniks Orders',
    component: Gopniks
  },
  {
    path: '/friends/popsicle-sticks',
    name: 'Popsicle Orders',
    component: Popsicle
  },
  {
    path: '/friends/moose',
    name: 'Generative Moose',
    component: Moose
  },
  {
    path: '/friends/wokka-quokkas',
    name: 'Quokka Orders',
    component: Quokkas
  },
  {
    path: '/friends/savages',
    name: 'Sabertooth Savages',
    component: Savages
  },
  {
    path: '/friends/stick-doodz',
    name: 'Stick Doodz',
    component: StickDoodz
  },
  {
    path: '/bags/savages',
    name: 'Sabertooth Savages Bag',
    component: SavagesBag
  },
  {
    path: '/tools',
    name: 'Tools',
    component: Tools
  },
  {
    path: '/secret/snipers',
    name: 'Snipers',
    component: Snipers
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
  
  
