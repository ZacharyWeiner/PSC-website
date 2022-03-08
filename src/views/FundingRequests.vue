<template>
    <div>

    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import dashboard from './../assets/slavetteDashboard.png'
export default {
    setup () {
        const state = reactive({
            count: 0,
        })
    
        return {
            ...toRefs(state),
        }
    }
}
</script>

<style lang="scss" scoped>

</style>