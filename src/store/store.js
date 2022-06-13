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
    selected_item: {},
    selected_option: '',
    user_rugs: [],
    user_slavettes: [],
    available_moves: 0,
    purchased_moves: 0,
    paidForMint: false,
    hasAction: false,
    selectedFriendCollection:""

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

