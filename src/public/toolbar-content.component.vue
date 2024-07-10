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
   <div class="toolbar-manager flex justify-content-between bg-black-alpha-90 p-5" aria-label="Toolbar content">
      <div class="text-white flex gap-2" aria-label="Company logo">
         <img src="https://hiperfast.pe/images/logo-hiperfast.png" class="logo-size" alt="Brand logo"/>
      </div>
        <ul class="flex flex-column md:flex-row gap-3 sm:text-base md:text-lg">
          <router-link class="router-style" to="/sign-in" aria-label="Go to home section">
            <li> Home</li>
          </router-link>
          <router-link class="router-style" to="/sign-in" aria-label="Go to sign in section">
            <li> Sign in </li>
          </router-link>
          <router-link class="router-style" to="/search" aria-label="Go to search report pdf section">
            <li> Search </li>
          </router-link>
          <router-link class="router-style" to="/profile" aria-label="Go to my profile section">
            <li> My Profile </li>
          </router-link>
          <li v-if="currentUserName" aria-label="Username details">
            <pv-button icon="pi pi-user" severity="primary" aria-label="User" />
            <p class="text-white">{{currentUserName}}</p>
          </li>
          <li v-else>
            <router-link class="router-style" to="/sign-in" aria-label="Go to sign in section">
              <pv-button severity="primary" class="text-white" aria-label="Sign in button">Sign in</pv-button>
            </router-link>
          </li>
        </ul>
   </div>
</template>

<style scoped>

</style>