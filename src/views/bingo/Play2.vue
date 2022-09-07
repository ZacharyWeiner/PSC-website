<template>
    <Menu />
    <div>
        

    </div>
    <Footer />
</template>

<script>
import { reactive, toRefs } from 'vue'
import Footer from "./../../components/Footer.vue"
import Menu from "./../../components/MenuComponent2.vue"
import { ref } from 'vue';
// import { useBingo } from "./../../services/bingoGame.js";
// import { useStore } from "vuex";


export default {
    components:{Menu, Footer},
    setup () {
        const sessionId = ref('')
        // const store = useStore();
        // const getCurrentGame = useBingo(store);
        // getCurrentGame();
        // console.log(store.state.currentBingoGame)
        const state = reactive({
            count: 0,
        })
    
        return {
            ...toRefs(state),
            sessionId,
        }
    }
}
</script>

<style lang="scss" scoped>

</style>