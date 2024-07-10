<script>
export default {
  name: 'toolbar-content',
  data(){
    return {
      currentUserName : JSON.parse(sessionStorage.getItem('user'))?.username
    }
  }
}
</script>

<template>
   <div class="toolbar-manager flex justify-content-between bg-black-alpha-90 p-5">
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
          <li v-if="currentUserName">
            <pv-button icon="pi pi-user" severity="primary" aria-label="User" />
            <p class="text-white">{{currentUserName}}</p>
          </li>
          <li v-else>
            <router-link class="router-style" to="/sign-in">
              <pv-button icon="pi pi-user" severity="primary" aria-label="User" />
              <p class="text-white">Sign in</p>
            </router-link>
          </li>
        </ul>
   </div>
</template>

<style scoped>

</style>