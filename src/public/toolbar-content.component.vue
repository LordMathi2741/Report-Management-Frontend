<script>
export default {
  name: 'toolbar-content'
}
</script>

<template>
   <div class="toolbar-manager flex justify-content-between bg-cyan-800 p-5">
      <div class="text-white flex gap-2">
         <img src="https://hiperfast.pe/images/logo-hiperfast.png" width="150px"/>
      </div>
        <ul class="flex gap-3 sm:text-base md:text-lg">
          <router-link class="router-style" to="/sign-in">
            <li> Home</li>
          </router-link>
          <router-link class="router-style" to="/sign-in">
            <li> Sign in </li>
          </router-link>
          <router-link class="router-style" to="/search">
            <li> Search </li>
          </router-link>
          <router-link class="router-style" to="/">
            <li> My Profile </li>
          </router-link>
        </ul>
   </div>
</template>

<style scoped>

</style>