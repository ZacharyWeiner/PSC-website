<template>
    <div class="w-full text-white text-left ">
        <h2>Welcome to your Pewnicorn Wallet</h2>
        <p>We have created for you the following wallet information:</p>
        <br><br>
        <p>OwnerKey: {{ store.state.ownerKey }}</p>
        <p>OwnerAddress:  {{store.state.ownerAddress}}</p>
        <p>PurseKey:  {{ store.state.purseKey }}</p>
        <p>PurseAddress:  {{ store.state.purseAddress }}</p>
    </div>
</template>

<script>
import { useStore } from 'vuex'

export default {
    async setup() {
        const store = useStore()

        // console.log(store.state)
        let run
        let balance = 0

        // let jigs = []
        if (store.state.ownerKey === '') {
            run = new window.Run()

            const ownerKey = run.owner.privkey
            const ownerAddress = run.owner.address
            const purseKey = run.purse.privkey
            const purseAddress = run.purse.address

            console.log(run.owner.privkey)
            await store.dispatch('setWallet', { ownerKey, ownerAddress, purseKey, purseAddress })
            console.log('new wallet stored')
        }
        else {
            run = new window.Run({ 
                trust: '*',
                owner: store.state.ownerKey,  
                purse: store.state.purseKey,
                logger: console,
                timeout: 1000000
                
            })

        await run.inventory.sync()
        const jigs = run.inventory.jigs
        const pooClassOrigin = 'd0f84d202d91468f9bbdcf6a028e7223abab5a2c935fb347a65bc3ec6d85ddd8_o2'
        let pooClass = await run.load(pooClassOrigin)
        const pooJigs = run.inventory.jigs.filter(j => j instanceof pooClass)
        let poo  = 0
        pooJigs.forEach(j => poo = poo + j.amount)
        console.log(jigs)
        console.log(run.inventory.jigs)
        
        
        balance =  await run.purse.balance()        
        console.log(balance)
        
        console.log('loaded wallet')

        console.log(poo)

        }
        
        
        // console.log(store.state.ownerKey)
        // console.log(store.state.purseKey)

        return { store, balance }
        
    },
}
</script>