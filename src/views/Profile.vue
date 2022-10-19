<template>
<Menu />
    <div class="shadow px-4 py-5 sm:rounded-lg sm:p-6">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <h3 class="text-lg font-medium leading-6 text-gray-100">Profile</h3>
          <p class="mt-1 text-sm text-gray-500">This information will be displayed publicly so be careful what you share.</p>
        </div>
        <!-- Display --> 
        <div v-if="!isEdit" class="mt-5 md:mt-0 md:col-span-2">
          <div class="space-y-6">
            <div class="grid grid-cols-3 gap-6">
              <div class="col-span-3 sm:col-span-2">
                <!-- <label for="company-website" class="block text-sm font-medium text-gray-700"> RelayX </label> -->
                <div class="mt-1 flex rounded-md shadow-sm">
                  <span class="w-32 inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"> RelayX Handle </span>
                  <input disabled :value="selectedProfile.relay_handle" type="text" name="company-website" id="company-website" class=" bg-gray-50 h-12 pl-2 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" />
                </div>
              </div>
              <div class="col-span-3 sm:col-span-2">
                <!-- <label for="company-website" class="block text-sm font-medium text-gray-700"> RelayX Address </label> -->
                <div class="mt-1 flex rounded-md shadow-sm">
                  <span class="w-32 inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"> RelayX Address</span>
                  <input disabled :value="selectedProfile.ownerAddress" type="text" name="company-website" id="company-website" class=" bg-gray-50 h-12 pl-2 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="www.example.com" />
                </div>
              </div>
              <div class="col-span-3 sm:col-span-2">
                <!-- <label for="company-website" class="block text-sm font-medium text-gray-700"> Handcash Handle </label> -->
                <div class="mt-1 flex rounded-md shadow-sm">
                  <span class="w-32 inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"> Handcash </span>
                  <input disabled :value="selectedProfile.handcashHandle" type="text" name="company-website" id="company-website" class=" bg-gray-50 h-12 pl-2 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="www.example.com" />
                </div>
              </div>
              <div class="col-span-3 sm:col-span-2">
                <!-- <label for="company-website" class="block text-sm font-medium text-gray-700"> Twitter Handle </label> -->
                <div class="mt-1 flex rounded-md shadow-sm">
                  <span class="w-32 inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"> Twetch</span>
                  <input disabled :value="selectedProfile.twetchHandle" type="text" name="company-website" id="company-website" class=" bg-gray-50 h-12 pl-2 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="www.example.com" />
                </div>
              </div>
              <div class="col-span-3 sm:col-span-2">
                <!-- <label for="company-website" class="block text-sm font-medium text-gray-700"> Twitter Handle </label> -->
                <div class="mt-1 flex rounded-md shadow-sm">
                  <span class="w-32 inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"> Twitter</span>
                  <input disabled :value="selectedProfile.twitterHandle" type="text" name="company-website" id="company-website" class=" bg-gray-50 h-12 pl-2 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="www.example.com" />
                </div>
              </div>
              <div class="col-span-3 sm:col-span-2">
                <!-- <label for="company-website" class="block text-sm font-medium text-gray-700"> Email </label> -->
                <div class="mt-1 flex rounded-md shadow-sm">
                  <span class="w-32 inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"> Email </span>
                  <input disabled :value="selectedProfile.email" type="text" name="company-website" id="company-website" class=" bg-gray-50 h-12 pl-2 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="www.example.com" />
                </div>
              </div>
              <div class="col-span-3 sm:col-span-2">
                <!-- <label for="company-website" class="block text-sm font-medium text-gray-700"> Phone </label> -->
                <div class="mt-1 flex rounded-md shadow-sm">
                  <span class="w-32 inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"> Phone </span>
                  <input disabled :value="selectedProfile.phone" type="text" name="company-website" id="company-website" class="bg-gray-50 h-12 pl-2 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="www.example.com" />
                </div>
              </div>
            </div>
          </div>
          <div class="pt-2"> 
          <button @click="edit" 
            class="w-full text-white bg-gradient-to-r from-pink-400 via-red-500 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-bold rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                Edit
          </button>
          </div>
        </div>
        <!-- End Display --> 
        <!-- Edit --> 
        <div v-else class="mt-5 md:mt-0 md:col-span-2">
          <div class="space-y-6">
            <div class="grid grid-cols-3 gap-6">
              <div class="col-span-3 sm:col-span-2">
                <!-- <label for="company-website" class="block text-sm font-medium text-gray-700"> RelayX </label> -->
                <div class="mt-1 flex rounded-md shadow-sm">
                  <span class="w-32 inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm h-12 pl-2 "> RelayX Handle </span>
                  <input disabled  v-model="selectedProfile.relay_handle" type="text" name="company-website" id="company-website" class="bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" />
                </div>
              </div>
              <div class="col-span-3 sm:col-span-2">
                <!-- <label for="company-website" class="block text-sm font-medium text-gray-700"> RelayX Address </label> -->
                <div class="mt-1 flex rounded-md shadow-sm">
                  <span class="w-32 inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm h-12 pl-2 "> RelayX Address</span>
                  <input disbaled v-model="selectedProfile.ownerAddress" type="text" name="company-website" id="company-website" class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="www.example.com" />
                </div>
              </div>
              <div class="col-span-3 sm:col-span-2">
                <!-- <label for="company-website" class="block text-sm font-medium text-gray-700"> Handcash Handle </label> -->
                <div class="mt-1 flex rounded-md shadow-sm">
                  <span class="w-32 inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm h-12 pl-2 "> Handcash </span>
                  <input v-model="edit_handcash" type="text" name="company-website" id="company-website" class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="www.example.com" />
                </div>
              </div>
              <div class="col-span-3 sm:col-span-2">
                <!-- <label for="company-website" class="block text-sm font-medium text-gray-700"> Phone </label> -->
                <div class="mt-1 flex rounded-md shadow-sm">
                  <span class="w-32 inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm h-12 pl-2 "> Twetch </span>
                  <input v-model="edit_twetch" type="text" name="company-website" id="company-website" class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="www.example.com" />
                </div>
              </div>
              <div class="col-span-3 sm:col-span-2">
                <!-- <label for="company-website" class="block text-sm font-medium text-gray-700"> Twitter Handle </label> -->
                <div class="mt-1 flex rounded-md shadow-sm">
                  <span class="w-32 inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm h-12 pl-2 "> Twitter</span>
                  <input v-model="edit_twitter" type="text" name="company-website" id="company-website" class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="www.example.com" />
                </div>
              </div>
              <div class="col-span-3 sm:col-span-2">
                <!-- <label for="company-website" class="block text-sm font-medium text-gray-700"> Email </label> -->
                <div class="mt-1 flex rounded-md shadow-sm">
                  <span class="w-32 inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm h-12 pl-2 "> Email </span>
                  <input v-model="edit_email" type="text" name="company-website" id="company-website" class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="www.example.com" />
                </div>
              </div>
              <div class="col-span-3 sm:col-span-2">
                <!-- <label for="company-website" class="block text-sm font-medium text-gray-700"> Phone </label> -->
                <div class="mt-1 flex rounded-md shadow-sm">
                  <span class="w-32 inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm h-12 pl-2 "> Phone </span>
                  <input v-model="edit_phone" type="text" name="company-website" id="company-website" class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="www.example.com" />
                </div>
              </div>
            </div>
            <div class="flex">
            <button @click="saveUserProfile" 
            class="w-full text-white bg-gradient-to-r from-teal-400 via-green-500 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-bold rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                Save
          </button>
            <button @click="isEdit = false" 
            class="w-full text-white bg-gradient-to-r from-pink-400 via-red-500 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-bold rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                Cancel
          </button>
          </div> 
          </div>
        </div>
        <!-- End Edit --> 
      </div>
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import Menu from '../components/MenuComponent2.vue'
import {userProfiles} from "./../services/firebase.js"
import {useStore} from "vuex";
export default {
  components: { Menu },
    setup () {
        let {findProfileByHandle, addUserProfile, updateUserProfile} = userProfiles()
        let store = useStore();
        let profile = findProfileByHandle(store.state.relayx_handle)
        const state = reactive({
            isEdit: false,
            edit_handcash:"",
            edit_twitter:"",
            edit_email:"",
            edit_phone:"",
            edit_twetch: "",
        })
    
        return {
            ...toRefs(state), findProfileByHandle, addUserProfile, updateUserProfile, profile
        }
    },
    methods:{
        edit(){
            if(!this.profile[0]){
                this.addProfile()
                this.profile = this.findProfileByHandle(this.$store.state.relayx_handle)
            }
            this.edit_handcash = this.profile[0].handcashHandle
            this.edit_twitter = this.profile[0].twitterHandle
            this.edit_email = this.profile[0].email
            this.edit_phone = this.profile[0].phone
            this.edit_twetch = this.profile[0].twetchHandle
            this.isEdit = true;

        },
        findProfile(){
            this.findProfileByHandle(this.$store.state.relayx_handle)
        },
        addProfile(){
            this.addUserProfile(this.$store.state.relayx_handle, this.$store.state.user_address, "", "", "", "", "")
        },
        saveUserProfile(){
            this.updateUserProfile(this.profile[0].id, this.$store.state.relayx_handle, this.$store.state.user_address, this.edit_handcash, this.edit_twitter,this.edit_email, this.edit_phone, this.edit_twetch)
            this.isEdit = false
        }
    },
    computed:{
        selectedProfile(){
            if(this.profile && this.profile[0]){
                console.log(this.profile[0].id)
                return this.profile[0]
            }
            return {relay_handle: this.$store.state.relayx_handle, ownerAddress: this.$store.state.user_address}
        }
    }
}
</script>

<style lang="scss" scoped>

</style>