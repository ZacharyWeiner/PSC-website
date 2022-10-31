//import Run from 'run-sdk' 
import { computed } from 'vue'
import { useStore } from 'vuex'


export function useRun()  {
    ////let run
    const store = useStore() 

    const isLogin = computed(() => store.state.relayx_handle !== '' )
    const canAccess = computed(() => store.state.relayx_handle !== '' && store.state.user_jigs.length > 0 )

    const signIn = async () => {
        const token = await window.relayone.authBeta()
        const [payload]=token.split(".")
        const data = JSON.parse(atob(payload))
        console.log('paymail', data.paymail)
        const r = await fetch('https://api.relayx.io/v1/paymail/run/' + data.paymail)
        const res = await r.json()
        // console.log('res', res.data)
        let _handle = data.paymail.split('@')[0]
        let _userAddress = res.data
        store.dispatch('login', { _handle, _userAddress } )
        store.commit('setIsLoggingIn', true)
        try{await setJigs()}catch(err){console.log(err)}
        store.commit('setIsLoggingIn', false)
    }
    const signOut = (_store) => {
        _store.dispatch('logout')
    } 


    // const fetchRun = async () => {
    //     console.log('Fetch Run Activated... ', store.state.user_address)
    //     run = new Run({trust:"*", owner: store.state.user_address, timeout:1000000, networkTimeout:1000000, logger: console}) //, logger: console
    //     run.activate()
    //     await run.inventory.sync()
    //     console.log('Fetch Run Sync Complete...')
    //     console.log('Jigs', run.inventory.jigs)
    // }

    const setJigs = async () => {
        console.log(store.state.user_address)
        if(!store.state.user_address){return}
        let walletJSON  = await fetch('https://staging-backend.relayx.com/api/user/balance2/' + store.state.user_address)
        let response_data = await walletJSON.json()
        console.log(response_data)
        let collectibles = response_data.data['collectibles'];
        let balances = response_data.data['balances'];
        console.log({balances})
        let selected = collectibles.filter(c => c.origin === '3ad82590d5d215a5ae04d5c2ed66e7ad711a769ffab42201d77902305a0f3f13_o1')
        let only800 = selected.filter(s => s.props.metadata.no <= 800)
        let pooCount = balances['d0f84d202d91468f9bbdcf6a028e7223abab5a2c935fb347a65bc3ec6d85ddd8_o2']
        let bingoCards = collectibles.filter(c => (c.origin === '1cb775fbe97e85d62daa8cbc813e890c64784ae2922c79fb514c4ed3a82373c8_o2' || c.origin === '270f767308026399229513558a306d27bc46f8f99716b65499a02746e85533df_o2' || c.origin === 'ddb9b7e0d7d4aa4229e03c94dbe4a234c1b5011a0ba70db0eb3c211082a09492_o2'))
        let bingoCardsOrdered = bingoCards.sort( (a,b)  => a.props.no - b.props.no)
        
        console.log(selected)
        console.log({pooCount})
        console.log(bingoCardsOrdered)
        store.commit('setUserJigs', only800)
        store.commit("setCoins", pooCount)
        store.commit('setBingoCards', bingoCardsOrdered)
        if(selected[0]){store.commit('setCornId', selected[0].props.no);}
    }
    return {signIn, signOut, isLogin, canAccess, setJigs}
 
}

