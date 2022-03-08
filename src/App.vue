<template>
<Suspense>
    <template #default>
    <div> 
    <Nav />
  
    <div class="w-full items-justify-center">
      <div class='w-auto flex'>
        <div class='w-full'> .</div>
        <div class='flex text-white pt-1'>
          <div> <a href="https://DISCORD.IO/GOPNIKZ" target="_blank"> <img class='w-16 m-2'  src="https://img.icons8.com/fluency/48/000000/discord-logo.png"/> </a></div> 
          <div class='m-2'> </div> 
          <div> <a href="https://INSTAGRAM.COM/GOPNIKS_NFT" target="_blank"> <img class='w-16 m-2'  src="https://img.icons8.com/color/48/000000/instagram-new.png"/> </a></div>
          <div class='m-2'> </div>  
          <div> <a href="https://TWITTER.COM/GOPNIKZ " target="_blank"> <img class='w-16 m-2'  src="https://img.icons8.com/color/48/000000/twitter--v1.png"/> </a></div> 
        </div>
        <div class='w-full'> </div>
      </div>
      <div class='w-full h-6 mt-4 bg-white '> Powered by: <a href='https://twitter.com/Gopnikz' _target='blank' class='text-green-500'> @Gopnikz </a></div>
    </div>
  </div> 
  </template>
  <template #loading>
    <div> Loading ... </div>
  </template>
</Suspense>
</template>
<script>
import Nav from './components/Nav'


export default {
    components: { Nav  }
}

</script> 

<style>
body {
  background: #000000;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
}

#nav {
  padding: 30px;
}
</style>
