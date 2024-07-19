<script>
import { isTokenExpired } from '@/helpers/verify-token.service.js'

export default {
  name: 'profile-management',
  data(){
    return {
       currentUserName: JSON.parse(sessionStorage.getItem('user'))?.username
    }
  },
  created() {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token && isTokenExpired(token)) {
      alert("Your token is expired, please sign in again");
      this.$router.push('/sign-in');
    }
  }
}
</script>

<template>
   <div class="profile-manager" aria-label="Profile manager content">
     <h1 class="text-center text-white" aria-label="Profile manager screen title">{{$t('profile_section')}}</h1>
     <div v-if="currentUserName" class="profile-section" aria-label="Profile section content">
       <div class="bg-white flex flex-column gap-3 p-8 shadow-7 border-round-2xl" aria-label="User profile content">
          <i class="pi pi-user text-6xl" aria-label="User profile icon"></i>
          <p class="text-2xl" aria-label="User profile username">{{$t('current_username')}}: {{currentUserName}}</p>
         </div>
     </div>
     <div class="profile-section" aria-label="Profile section container"  v-else>
       <div  aria-label="User profile content" class="bg-white flex flex-column gap-3 p-8 shadow-7 border-round-2xl">
         <i aria-label="User profile icon" class="pi pi-user text-6xl"></i>
         <p aria-label="User profile username" class="text-2xl">{{$t('current_username')}}: </p>
       </div>
     </div>
   </div>
</template>

<style scoped>

</style>