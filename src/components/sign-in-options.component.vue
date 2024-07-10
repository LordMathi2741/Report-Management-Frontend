<script>

export default {
  name: 'sign-in-options',
}
</script>

<template>
  <div class="sign-in-options  ml-4 sm:ml-0 ">
    <h1 class="text-center text-cyan-800 text-sm md:text-base lg:text-2xl"> Please enter your account details: </h1>
    <div class="flex flex-column  w-20rem md:w-30rem gap-2">
      <pv-inputext  size="large" type="text" placeholder="Please enter your email"/>
      <pv-inputext size="large" type="password" placeholder="Please enter your password"/>
    </div>
   <div>
     <pv-button class="w-10rem" size="large" severity="primary"> Sign in </pv-button>
   </div>
    <div class="sign-up-options">
      <small id="username-help">Do you dont have an account yet?.</small>
      <pv-button  class=" w-20rem sm:w-30rem" size="large" severity="danger"> Sign up </pv-button>
    </div>
  </div>

</template>

<style scoped>

</style>