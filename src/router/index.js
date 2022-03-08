import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import( '../views/About.vue')
  }, 
  {
    path: '/chat',
    name: 'Chat',
    component: () => import( '../views/Chat.vue')
    
  },
  {
    path: '/props',
    name: 'Proposals',
    component: () => import( '../views/Proposals.vue')
  },
  {
    path: '/prop-detail',
    name: 'Proposal-Deatil',
    component: () => import( '../views/ProposalDetails.vue')
  },
  {
    path: '/send-prop',
    name: 'Send-Proposal',
    component: () => import( '../views/NewProposalForm.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import( '../views/Profile.vue')
  },
  {
    path: '/slavettes',
    name: 'Slavettes',
    component: () => import( '../views/Slavettes.vue')
  },
  {
    path: '/slavettes-test',
    name: 'SlavettesTest',
    component: () => import( '../views/SlavettesTest.vue')
  },
  {
    path: '/floor',
    name: 'Floor',
    component: () => import( '../views/Floor.vue')
  },
  {
    path: '/egglist',
    name: 'EggList',
    component: () => import( '../views/EggList.vue')
  },
  {
    path: '/add-jackpot',
    name: 'Add Jackpot',
    component: () => import( '../views/AddJackpot.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
