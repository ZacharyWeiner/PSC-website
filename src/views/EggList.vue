<template>
    <div class='w-full text-white p-32'>
        <div class='text-4xl underline text-left'> MADE EGGS </div>
        <div v-for='jp in ascending' :key="jp.id" class='w-full text-left'>
            <div v-if='jp.slavetteId !== "craigtester" && jp.slavetteId !== "stevenk"' class='grid grid-cols-5'>
            <div class='col-span-1'>{{jp.userName}} </div>
            <div class='col-span-1'> {{jp.slavetteId}}</div>
            <div class='col-span-1'> {{countdown(jp.slavetteId)}}</div>
            <div class='col-span-1'> {{new Date(jp.createdAt.seconds*1000).toDateString()}}</div>
           <div class='col-span-1'> <button class='text-red-600' @click='removeJackpot(jp.id)'> delete </button></div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { getJackpots, getAllJackpots } from './../services/firebase'
import {useRouter} from "vue-router"
import {useStore} from 'vuex'
const whitelist = ['gopniks', 'zackwins', 'stevenk', 'pewparty']
export default {
    async setup () {
        const { deleteJackpot }  = getJackpots();
        const { allJackpots } = getAllJackpots()
        let router = useRouter()
        let store = useStore()
        let whitelisted = whitelist.filter(un => un === store.state.relayx_handle)
        if(whitelisted.length === 0){
            router.push('/')
        }
        const state = reactive({
            count: 0,
        })

        return {
            ...toRefs(state), allJackpots, deleteJackpot
        }
    },
    methods:{
        async removeJackpot (id){
            try{
                let response = await this.deleteJackpot(id)
                console.log(response)
            }catch(err){alert(err)}
        },
        countdown(slavette){
            let newestObj = this.slavetteLastEgg(slavette)        
            if(newestObj?.createdAt){
                let lastDate = new Date(newestObj.createdAt.seconds*1000)
                let futureDate = new Date() 
                
                // setterDate = new Date(lastDate.getDate() + -22)
                futureDate.setDate(lastDate.getDate() + 7);
                console.log(`The date of slavette ${slavette}'s last egg was made on: ${lastDate.toLocaleDateString("EN")} by ${newestObj?.userName}`)
                console.log(`Slavette ${slavette}'s can egg again on: ${futureDate.toLocaleDateString("EN")}`)
                if(futureDate < new Date()){return "now"}
                else return futureDate.toLocaleDateString("EN")
            }       
        },
        slavetteEggs(id){
            return this.allJackpots.filter(se => se.slavetteId  === id)
        },
        slavetteLastEgg(id){
           let jps = this.slavetteEggs(id)
           console.log("JPS:", jps)
           if(jps?.length > 1){
                let  newestObj = jps.reduce((a, b) => {
                        //return new Date(a.createdAt?.seconds*1000) > new Date(b.createdAt?.seconds*1000) ? a : b;
                        return a.createdAt > b.createdAt ? a : b
                    });

            return newestObj
           }else if (jps?.length === 1){
               return jps[0]
           }
          
            return null
        }
    },
    computed:{
        ascending(){
            let _list = this.allJackpots;
            // _list.sort((a,b)=>a.getTime()-b.getTime());
            return _list.sort((a,b) => {
                     var c = new Date(a.createdAt.seconds * 1000);
                    var d = new Date(b.createdAt.seconds * 1000);
                    return d-c;
                })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>