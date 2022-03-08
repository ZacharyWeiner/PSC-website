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
        
        try{await setJigs()}catch(err){console.log(err)}
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
        let selected = collectibles.filter(c => c.origin === '1ba1080086ca6624851e1fbff18d903047f2b75d3a9ffe5cc8bf49ed0fdb36a0_o2')
        let slavettes = collectibles.filter(c => c.origin === '84769a5ac4cec62270093648c9978016640aeccb62c11b717313d41a4c74640c_o2')

        let rugOptions = [
            // //Live Rugs //
            collectibles.filter(c => c.origin === '99658f360f9a5f5ce70f6100b1ffbea1fc385a4f44e156f1c1e4fd5e6d1d6232_o2').length,   //Red            
            collectibles.filter(c => c.origin === 'a2feebf63bf84ed28945372a4b2ed43ce84dcd0df312bf4c1308b0bca574e11f_o2').length,    //Green
            collectibles.filter(c => c.origin === '54e23ac33b311538f3b07a3579c83cab1fb5effa6e13f8f14408849515f6f3fc_o2').length,   //Gold
            //TEST RUGS //
            // collectibles.filter(c => c.origin === 'da7a276e3a146ff273decc2211b0acd0ca4fce026801c0f5610e259efda84d87_o2').length,   //Red            
            // collectibles.filter(c => c.origin === '72ee29bac1db5e23ad6a179b0feb427fbfaf7cc101ea43697327a54b1522af73_o2').length,    //Green
            // collectibles.filter(c => c.origin === 'a074a8ecb0d777b8a753d14366203b8c904283eeadf91f6fb65fafd04c494800_o2').length,   //Gold
        ]
        let cigCount = balances['c8c3771f07da180ab76ba2f4a273c3298f1584ad1bcde1e04e0926174e3e432b_o2']
        console.log(selected)
        console.log({cigCount})
        store.commit('setUserJigs', selected)
        store.commit("setCigs", cigCount);
        store.commit('setUserRugs', rugOptions)
        store.commit('setUserSlavettes', slavettes)
        if(selected[0]){store.commit('setGopnikId', selected[0].props.no);}
    }
    return {signIn, signOut, isLogin, canAccess, setJigs}
 
}

