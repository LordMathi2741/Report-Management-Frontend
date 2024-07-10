<script>
export default {
  name: 'sign-up-options'
}
</script>

<template>
   <div class="sign-up-options ml-4 sm:ml-0">
    <div class="bg-white p-7 border-round-2xl shadow-4 flex flex-column gap-5">
      <h1 class="text-xs sm:text-sm md:text-base lg:text-xl"> Please give your account details here: </h1>
      <div class="flex flex-column  w-10em sm:w-15rem md:w-30rem gap-5">
        <pv-inputext  size="large" type="text" placeholder="Please enter your username"/>
        <div class="flex flex-column gap-2">
          <small class="text-left  text-green-900" id="username-help">Remember you need to send a valid email.</small>
          <pv-inputext  size="large" type="text" placeholder="Please enter your email"/>
        </div>
        <div class="flex flex-column gap-2">
          <small class="text-left text-green-900" id="username-help">Your password must to be greater than 8 letters and contains @.</small>
          <pv-inputext size="large" type="password" placeholder="Please enter your password"/>
        </div>
        <pv-button  class="  w-10rem text-xs sm:text-base sm:w-30rem" size="large" severity="danger"> Sign up </pv-button>
        <div class="flex flex-column gap-2">
          <small id="username-help">Do you Already have an account?.</small>
          <router-link to="/sign-in">
            <pv-button  class="  w-10rem text-xs sm:text-base sm:w-30rem" size="large" severity="primary"> Sign in </pv-button>
          </router-link>
        </div>
      </div>
    </div>
   </div>
</template>

<style scoped>

</style>