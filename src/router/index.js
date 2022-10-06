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
import Profile from '../views/Profile.vue'
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
import MerchBag from '../views/bags/Merch.vue'
import Tools from '../views/Tools.vue'
import MarketSelection from '../views/MarketSelection.vue'
import Collectables from '../views/bags/Collectables.vue'
import Spend from '../views/Spend.vue'
import Claims from '../views/Claims.vue'
import Friends from '../views/FriendsOfPew.vue'
import Snipers from '../views/secret/Sniper.vue'
import ClaimDrop from '../views/secret/ClaimDrop.vue'
import Airdrop from '../views/secret/Airdrop.vue'
import BingoCardsRelay from '../views/bingo/cards/BuyFromRelay.vue'
import BingoCardsPoo from '../views/bingo/cards/BuyWithPoo.vue'
import MyBingoCards from '../views/bingo/cards/MyCards.vue'
import PlayBingo from '../views/bingo/Play.vue'
import PlayBingo2 from '../views/bingo/Play2.vue'
import BingoAdmin from '../views/BingoAdmin.vue'
import BingoCard from '../views/BingoCard.vue'
import BingoCardList from '../views/BingoCardList.vue'
import HowToBingo from '../views/bingo/HowTo.vue'
//import BingoAd from '../views/BingoAd.vue'
import CardsInSession from "../views/bingo/CardsInSession.vue"
import FlipbookView from "./../views/secret/Flipbook.vue";
import RelayWrapperHome from "./../views/secret/relay-wrapper/HomeView.vue"
import RareCandyWrapperHome from "./../views/secret/rare-candy/HomeView.vue"
import ApeFloor from "./../views/secret/rare-candy/ApeFloor.vue";
import FrogFloor from "./../views/secret/rare-candy/FrogFloor.vue";

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
    path: '/market-selection',
    name: 'Market Selection',
    component: MarketSelection
  },
  {
    path: '/collectables',
    name: 'Collectables',
    component: Collectables
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
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/secret/claim-drop',
    name: 'Claim Drop',
    component: ClaimDrop
  },
  {
    path: '/secret/airdrop',
    name: 'Air Drop',
    component: Airdrop
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
    path: '/bags/merch',
    name: 'Merch Bag',
    component: MerchBag
  },
  {
    path: '/tools',
    name: 'Tools',
    component: Tools
  },
  {
    path: '/bingo/play',
    name: 'Play Bingo',
    component: PlayBingo
  },
  {
    path: '/bingo/play2',
    name: 'Play Bingo2',
    component: PlayBingo2
  },
  {
    path: '/bingo/cards/buy-from-relay',
    name: 'Relay X Bingo Cards',
    component: BingoCardsRelay
  },
  {
    path: '/bingo/cards/buy-with-poo',
    name: 'Buy Bingo Cards',
    component: BingoCardsPoo
  },
  {
    path: '/bingo/cards/my-cards',
    name: 'My Bingo Cards',
    component: MyBingoCards
  },
  {
    path: '/bingo/cards-in-session',
    name: 'My Bingo Cards in Session',
    component: CardsInSession
  },
  {
    path: '/secret/snipers',
    name: 'Snipers',
    component: Snipers
  },
  {
    path: '/bingoAdmin',
    name: 'BingoAdmin',
    component: BingoAdmin
  },
  {
    path: '/bingoCard',
    name: 'BingoCard',
    component: BingoCard
  },
  {
    path: '/bingoCardList',
    name: 'BingoCardList',
    component: BingoCardList
  },
  {
    path: '/bingo/how-to',
    name: 'How To Bingo',
    component: HowToBingo
  },
  {
    path: '/secret/flipbook',
    name: 'Flipbook',
    component: FlipbookView
  },
  {
    path: '/secret/relay-wrapper/home',
    name: 'Relay Wrapper Home',
    component: RelayWrapperHome
  },
  {
    path: '/secret/rare-candy/home',
    name: 'RareCandy Wrapper Home',
    component: RareCandyWrapperHome
  },
  {
    path: '/secret/rare-candy/ape-floor',
    name: 'Ape Floor',
    component: ApeFloor
  },
  {
    path: '/secret/rare-candy/frog-floor',
    name: 'Frog Floor',
    component: FrogFloor
  }
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
  
  
