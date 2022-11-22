import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'


const vuexLocal = new VuexPersistence({
  key: 'PEWNICORN',
  storage: window.localStorage
})

export default createStore({
  state: {
    // save variables
    relayx_handle: '',
    user_address: '',
    user_jigs: [],
    selected_proposalId: '',
    cornId: '', 
    last_offers: [],
    last_offers_last_checked: '',
    coins: "",
    balances: [],
    collectibles: [],
    selected_item: {},
    selected_option: '',
    user_rugs: [],
    user_slavettes: [],
    available_moves: 0,
    purchased_moves: 0,
    paidForMint: false,
    hasAction: false,
    selectedFriendCollection:"",
    bingoCards: '',
    selectedBingoCard: [],
    bingoCurrenGame: 0, 
    lastAirdroppedList:[],
    viewedAdvertisement: 0,
    marketContractLocation:"",
    marketContractImageUrl:"",
    marketContractName:"",
    marketContractFloor: 0,
    relayTopCoins: [],
    relayTopNFTS: [],
    marketOrders: [],
    sevenDayVol: 0, 
    thirtyDayVol: 0,
    rareCandies: [],
    weeklyClaimTotal:0,
    weeklyClaimsPaid:[],
    isLoggingIn: false,
    isLoggingInText: "Finding NFTs",
    burnAddress: "",
    burnPrivateKey: "",
    originNames: {},
  },
  mutations: {
    // change state
    setRelayxHandle(state, _handle) {
      state.relayx_handle = _handle
    },
    setUserAddress(state, _userAddress) {
      state.user_address = _userAddress
    },
    setUserJigs(state, _userJigs) {
      state.user_jigs = _userJigs
    },
    setSelectedProposalId(state, _propId) {
      state.selected_proposalId = _propId
    },
    setCornId(state, id){
      state.cornId = id;
    },
    setLastOffers(state, offers){
      state.last_offers = offers
    },
    setLastOffersLastChecked(state, time){
      state.last_offers_last_checked = time;
    },
    setCoins(state, coins){
      state.coins = coins
    },
    setSelectedItem(state, _item) {
      state.selected_item = _item
    },
    setSelectedOption(state, _option) {
      state.selected_option = _option
    },
    setUserRugs(state, _userRugs) {
      state.user_rugs = _userRugs
    },
    setUserSlavettes(state, _slavettes) {
      state.user_slavettes = _slavettes
    },
    setMoveCount(state, _moves) {
      state.available_moves = _moves
    },
    setPurchasedMoves(state, count){
      state.purchased_moves = count
    },
    setPaidForMint(state, paid){
      state.paidForMint = paid
    },
    setHasAction(state, hasAction){
      state.hasAction = hasAction
    },
    setSelectedFriendCollection(state, collectionName){
      state.selectedFriendCollection = collectionName;
    },
    setBingoCards(state, _bingoCards) {
      state.bingoCards = _bingoCards
    },
    setSelectedCard(state, _selectedBingoCard) {
      state.selectedBingoCard = _selectedBingoCard
    },
    setBingoCurrenGame(state, _bingoCurrenGame) {
      state.bingoCurrenGame = _bingoCurrenGame
    },
    addToLastAirdroppedList(state, _addition){
      state.lastAirdroppedList.push(_addition)
    },
    clearLastAirdroppedList(state){
      while (state.lastAirdroppedList.length > 0) {
        state.lastAirdroppedList.pop()
      }
    },
    setViewedAdvertisement(state, _viewed) {
      state.viewedAdvertisement = _viewed
    },
    setMarketContractLocation(state, location){
      state.marketContractLocation = location;
    },
    setMarketContractImageUrl(state, location){
      state.marketContractImageUrl = location;
    },
    setMarketContractName(state, name){
      state.marketContractName = name;
    },
    setMarketOrders(state, orders){
      state.marketOrders = orders;
    },
    setMarketContractSevenDayVol(state, vol){
      state.sevenDayVol = vol;
    },
    setMarketContractThirtyDayVol(state, vol){
      state.thirtyDayVol = vol;
    },
    setMarketContractFloor(state, floor){
      state.marketContractFloor = floor;
    },
    setBalances(state, _balances){
      state.balances = _balances;
    },
    setCollectibles(state, collectibles){
      state.collectibles = collectibles;
    },
    setRareCandies(state, items){
      state.rareCandies = items;
    },
    addRareCandies(state, items){
      state.rareCandies = [...state.rareCandies, items]
    },
    addToWeeklyClaimTotal(state, update){
      state.weeklyClaimTotal = state.weeklyClaimTotal + update
    },
    resetWeeklyClaimTotal(state){
      state.weeklyClaimTotal = 0
    },
    addToWeeklyClaimsPaid(state, update){
      state.weeklyClaimsPaid.push(update)
    },
    resetWeeklyClaimsPaid(state){
      state.weeklyClaimsPaid = []
    },
    setIsLoggingIn(state, _bool){
      state.isLoggingIn = _bool
    },
    setBurnAddress(state, _burnAddress){
      state.burnAddress = _burnAddress
    },
    setBurnPrivateKey(state, _pk){
      state.burnPrivateKey = _pk;
    },
    addOriginName(state, {name, origin}){
      state.originNames[origin] = name; 
    }
  },
  actions: {
    // call multiple mutation routines
    login({commit}, {_handle, _userAddress}) {
      commit('setRelayxHandle', _handle)
      commit('setUserAddress', _userAddress)
    },
    logout({commit}) {
      commit('setRelayxHandle', '')
      commit('setUserAddress', '')
      commit('setUserJigs', [])
      commit('setHasAction', false)
    }

    
  },
  plugins: [vuexLocal.plugin],
  getters: {
    
  },
})

