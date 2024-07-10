<script>
export default {
  name: 'profile-management',
  data(){
    return {
       currentUserName: JSON.parse(sessionStorage.getItem('user'))?.name
    }
  }
}
</script>

<template>
   <h1 class="text-center">Profile Management</h1>
   <div class="flex flex-column justify-content-center">
      <i class="pi pi-user"></i>
      <p>UserName: {{currentUserName}}</p>
   </div>
</template>

<style scoped>

</style>