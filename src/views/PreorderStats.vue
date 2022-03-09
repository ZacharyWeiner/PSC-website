<template>
    <div>

    </div>
</template>

<script>
import { ref, 
//reactive, toRefs 
} from 'vue'
import Run from "run-sdk"
export default {
    async setup () {
        let decimals = ref(0)
      let purseBalance = ref(0)
      let searching = ref(false);
      let utxos = ref([])
      let handle = ref('');
      let userRunAddress = ref('')

      
       
        return {
            decimals, purseBalance, searching, utxos, handle, userRunAddress
        }
    },
    methods:{
        async findStats(){
             let _run = new Run({
                trust: "*",
                timeout: 1000000,
                logger: console,
                owner: "1Np9babREvhcHpNgd1RaoCfaokQRSxqnxV",
                //preorders_test
                //owner: "1GqbnK9xVK5HuWNAtyVYm3AmAdempjct3E",
            });
            await _run.inventory.sync();
            let CoinsClass = await _run.load(
                "d0f84d202d91468f9bbdcf6a028e7223abab5a2c935fb347a65bc3ec6d85ddd8_o2"
            );
            console.log("POO decimals:", CoinsClass.decimals);
            this.decimals = CoinsClass.decimals;
            this.utxos = _run.inventory.jigs.filter(
                (jig) => jig instanceof CoinsClass
            );

        }
    }
}
</script>

<style lang="scss" scoped>

</style>