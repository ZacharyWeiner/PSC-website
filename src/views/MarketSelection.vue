<template>
<menu-component-2> </menu-component-2>
    <div class='text-white'>
        <div class='w-full grid  bg-black'>
            <div v-for="contract in contracts" :key="contract.name" class=" pt-4"> 
                <div class="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-400 to-purple-700"> 
                            {{contract.title}}
                        </div>
                <div v-if="contract.classes?.length >= 1" class="grid grid-cols-1 lg:grid-cols-3 p-2 m-2 bg-gradient-to-r from-blue-400 via-teal-500 to-blue-500 rounded"> 
                    <div v-for="sub in contract.classes" :key="sub.name" class="col-span-1 bg-gray-900 rounded p-1 m-1">
                        <div class="flex items-center">
                            <div class="w-full">
                                <img class='w-36 rounded-xl' :src="sub.berryUrl" />
                            </div>
                            <div class="w-full flex place-items-center"> 
                                <div class="text-2xl text-left font-bold "> 
                                    {{sub.name}}
                                </div>
                            </div>
                            <div class="w-full flex place-items-center">
                                <div class=''>
                                    <!-- <button @click="navigateTo('poo', sub.contractLocation, sub.berryUrl)" class="p-2 m-2 rounded font-medium text-md text-white bg-gradient-to-r from-purple-400 via-blue-500 to-teal-600"> Buy With $POO </button> -->
                                    <button  @click="navigateTo('bsv', sub.contractLocation, sub.berryUrl)" class="p-2 m-2 rounded font-medium text-md text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600"> Buy With Bitcoin </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class=' col-span-3 p-2 m-2 bg-gray-900 rounded'>
                    <div class="flex text-left">
                        <div class="text-xl w-full">
                            <img class='w-48 rounded-xl' :src="contract.berryUrl" />
                        </div>
                        <div class='w-full place-items-center w-full'> 
                            <div class="text-3xl font-bold pt-4 pl-4"> 
                                {{contract.title}}
                            </div>
                            <!--  -->
                        </div>
                        <div class="w-full flex place-items-center">
                            <div> 
                                <button class="p-2 m-2 rounded font-medium text-md text-white bg-gradient-to-r from-purple-600 via-blue-500 to-teal-600"> Buy With $POO </button>
                                <button class="p-2 m-2 rounded font-medium text-md text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600"> Buy With Bitcoin </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import MenuComponent2 from '../components/MenuComponent2.vue';

const contracts = [ {title: "Pewnicorn Research Division", link:"", contractLocation: "3ad82590d5d215a5ae04d5c2ed66e7ad711a769ffab42201d77902305a0f3f13_o1", berryUrl: "https://berry2.relayx.com/feca781862b91f4957fdf38bbce3f52c3f898e46d38c2c30785f79b893fa28d7"},
                    {title: "Pewnicorn Concert Series Collection: Episode 1",
                        classes:[
                            {name: "Exotic", link:"", contractLocation:"ec2340440280d2cbe288c10f7dc60ec05243f719518e5c682be7c4a6e0796ce1_o2", berryUrl:"https://berry2.relayx.com/ec2340440280d2cbe288c10f7dc60ec05243f719518e5c682be7c4a6e0796ce1_o1"},
                            {name: "Legendary", link:"", contractLocation:"dec21c4f9f1068d13d8adca3e264c98c62fa33145d8b4be37a930c957cd2c79a_o2", berryUrl:"https://berry2.relayx.com/dec21c4f9f1068d13d8adca3e264c98c62fa33145d8b4be37a930c957cd2c79a_o1"},
                            {name: "Epic", link:"", contractLocation:"a9aa40cc186672f54736c26c4b3808c9400d4fd4416d6f51bb532fccee083932_o2", berryUrl:"https://berry2.relayx.com/a9aa40cc186672f54736c26c4b3808c9400d4fd4416d6f51bb532fccee083932_o1"},
                            {name: "Rare", link:"", contractLocation:"8f79f09f6dc53d08fdd88c2680bddb6561aab5a5cf2102f46cea5bf3325cb8a1_o2", berryUrl:"https://berry2.relayx.com/8f79f09f6dc53d08fdd88c2680bddb6561aab5a5cf2102f46cea5bf3325cb8a1_o1"},
                        ],
                    }, 
                    {title: "Pewnicorn Concert Performers Collection",
                        classes:[
                            {name: "Ill Fella", contractLocation:"01bbf56a04eb210b278cec475d4feccdf3108cb1fad07c4745f821bcb2db5617_o2", berryUrl:"https://berry2.relayx.com/01bbf56a04eb210b278cec475d4feccdf3108cb1fad07c4745f821bcb2db5617_o1"},
                            {name: "Lords Of The Sun", contractLocation:"740b80012b261597d5bc0ec7735499b56873dc140bb971ccc56a19daf492b24d_o2", berryUrl:"https://berry2.relayx.com/740b80012b261597d5bc0ec7735499b56873dc140bb971ccc56a19daf492b24d_o1"},
                            {name: "Mandeep The MC", contractLocation:"ae6e1e8a248ef7084f7ab2d348373d6e0f8746b29ca5cb6ad254e90315fc387c_o2", berryUrl:"https://berry2.relayx.com/ae6e1e8a248ef7084f7ab2d348373d6e0f8746b29ca5cb6ad254e90315fc387c_o1"},
                        ],
                    }, 
                 ];
export default {
  components: { MenuComponent2 },
    setup () {
        const state = reactive({
            count: 0,

        })
    
        return {
            ...toRefs(state), contracts
        }
    },
    methods:{
        navigateTo(_currency, _location, _imgUrl){
            console.log(_currency, _location, _imgUrl)
            this.$store.commit("setMarketContractLocation", _location)
            this.$store.commit("setMarketContractImageUrl", _imgUrl)
            if(_currency === "bsv"){
                this.$router.push('/collectables')
            } else {
                this.$router.push('/treasury')
            }
        }
    },
}
</script>

<style lang="scss" scoped>

</style>