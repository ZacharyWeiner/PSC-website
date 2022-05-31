<template>
    <div>

    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
    setup () {
        const state = reactive({
            count: 0,
        })
    
        return {
            ...toRefs(state),
        }
    },
    methods:{
        async spend(){
            let r1 = window.relayone.alpha.run.getOwner();
            console.log(r1)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>