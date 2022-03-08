<template>
    <div>
        {{status}}
        <img :src='img' class='max-w-4xl'/>
    </div>
</template>

<script>
import { reactive, toRefs, ref } from 'vue'
import Jimp from "jimp"
export default {
    async setup (props) {
        let img = ref(null)
        let status = ref('')
        let eyes_attribute = props.metadata.attributes.filter(a => a.trait_type === "Eyes")
        let top_attribute = props.metadata.attributes.filter(a => a.trait_type === "Top")
        let bra_attribute = props.metadata.attributes.filter(a => a.trait_type === "Bra")
        let hands_attribute = props.metadata.attributes.filter(a => a.trait_type === "Hands")
        let pants_attribute = props.metadata.attributes.filter(a => a.trait_type === "Pants")
        let panties_attribute = props.metadata.attributes.filter(a => a.trait_type === "Panties")
        let hair_attribute = props.metadata.attributes.filter(a => a.trait_type[0].includes("Hair"))
        let mouth_attribute = props.metadata.attributes.filter(a => a.trait_type === "Mouth")
        console.log(eyes_attribute[0].value)
        status.value = "loading"
        const constructLayers = async (status, _eyes, _hair, _mouth, _top, _bra, _hands, _pants, _panties) =>{
            
            let background = await Jimp.read('https://slavettes-layers.s3.amazonaws.com/Base/Naked+Body%23100.png')
            let eyes = await Jimp.read(`https://slavettes-layers.s3.amazonaws.com/Eyes/${_eyes[0].value.replace(" ", "+")}.png`)
            let top = await Jimp.read(`https://slavettes-layers.s3.amazonaws.com/Top/${_top[0].value.replace(" ", "+")}.png`)
            let bra = await Jimp.read(`https://slavettes-layers.s3.amazonaws.com/Bra/${_bra[0].value.replace(" ", "+")}.png`)
            let hands = await Jimp.read(`https://slavettes-layers.s3.amazonaws.com/Hands/${_hands[0].value.replace(" ", "+")}.png`)
            let pants = await Jimp.read(`https://slavettes-layers.s3.amazonaws.com/Pants/${_pants[0].value.replaceAll(" ", "+")}.png`)
            let panties = await Jimp.read(`https://slavettes-layers.s3.amazonaws.com/Panties/${_panties[0].value.replaceAll(" ", "+")}.png`)
            let hair = await Jimp.read('https://slavettes-layers.s3.amazonaws.com/Hair/Headscarf+Gold%2310.png')
            let mouth = await Jimp.read('https://slavettes-layers.s3.amazonaws.com/Mouth/Bandage%2340.png')
            console.log(_eyes, _hair, _mouth, _top, _bra, _hands, _pants, _panties)
            console.log({background}) 
            background.composite(eyes, 0, 0, {
                mode: Jimp.BLEND_SOURCE_OVER,
                opacityDest: 1,
                opacitySource: 1
            })
             if(props.availableMoves < 3){
                background.composite(bra, 0, 0, {
                    mode: Jimp.BLEND_SOURCE_OVER,
                    opacityDest: 1,
                    opacitySource: 1
                })
             }
            if(props.availableMoves < 1){
                background.composite(top, 0, 0, {
                    mode: Jimp.BLEND_SOURCE_OVER,
                    opacityDest: 1,
                    opacitySource: 1
                })
            }
             if(props.availableMoves < 4){
                background.composite(panties, 0, 0, {
                    mode: Jimp.BLEND_SOURCE_OVER,
                    opacityDest: 1,
                    opacitySource: 1
                })
             }
             if(props.availableMoves < 2){
                background.composite(pants, 0, 0, {
                    mode: Jimp.BLEND_SOURCE_OVER,
                    opacityDest: 1,
                    opacitySource: 1
                })
             }
            background.composite(hands, 0, 0, {
                mode: Jimp.BLEND_SOURCE_OVER,
                opacityDest: 1,
                opacitySource: 1
            })
            background.composite(hair, 0, 0, {
                mode: Jimp.BLEND_SOURCE_OVER,
                opacityDest: 1,
                opacitySource: 1
            })
            background.composite(mouth, 0, 0, {
                mode: Jimp.BLEND_SOURCE_OVER,
                opacityDest: 1,
                opacitySource: 1
            })
            let base = await background.getBase64Async(Jimp.MIME_JPEG);
            return base;
        } 
        img.value = await constructLayers(status, eyes_attribute, hair_attribute, mouth_attribute, top_attribute, bra_attribute, hands_attribute, pants_attribute, panties_attribute)
        console.log(img.value)
        const state = reactive({
            count: 0,
        })
    
        return {
            ...toRefs(state), img, status //constructLayers
        }
    },
    props: ["availableMoves", "metadata"]
}
</script>

<style lang="scss" scoped>

</style>