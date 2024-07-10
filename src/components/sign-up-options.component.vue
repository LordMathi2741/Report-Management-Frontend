<script>
export default {
  name: 'sign-up-options'
}
</script>

<template>
   <div class="sign-up-options ml-4 sm:ml-0" aria-label="Sign up options content">
    <div class="bg-white p-7 border-round-2xl shadow-4 flex flex-column gap-5" aria-label="Sign up options parameters content">
      <h1 class="text-xs sm:text-sm md:text-base lg:text-xl" aria-label="Sign up options title"> Please give your account details here: </h1>
      <div class="flex flex-column  w-10em sm:w-15rem md:w-30rem gap-5" aria-label="Sign up options parameters">
        <pv-inputext  size="large" type="text" placeholder="Please enter your username" aria-label="Please enter your username"/>
        <div class="flex flex-column gap-2" aria-label="Email given content">
          <small class="text-left  text-green-900" aria-label="Remember you need to send a valid email. Warning" id="username-help">Remember you need to send a valid email.</small>
          <pv-inputext  size="large" type="text" aria-label="Please enter your email" placeholder="Please enter your email"/>
        </div>
        <div class="flex flex-column gap-2" aria-label="Password given content">
          <small class="text-left text-green-900" aria-label="Your password must to be greater than 8 letters and contains @. Warning" id="username-help">Your password must to be greater than 8 letters and contains @.</small>
          <pv-inputext size="large" type="password" aria-label="Please enter your password" placeholder="Please enter your password"/>
        </div>
        <pv-button  class="w-10rem text-xs sm:text-base sm:w-30rem" aria-label="Sign up button" size="large" severity="danger"> Sign up </pv-button>
        <div class="flex flex-column gap-2" aria-label="Go to sign in section">
          <small id="username-help" aria-label="Do you already have an account? Warning">Do you Already have an account?.</small>
          <router-link to="/sign-in" aria-label="Go to sign in section">
            <pv-button  class=" w-10rem text-xs sm:text-base sm:w-30rem" aria-label="Sign in button" size="large" severity="primary"> Sign in </pv-button>
          </router-link>
        </div>
      </div>
    </div>
   </div>
</template>

<style scoped>

</style>