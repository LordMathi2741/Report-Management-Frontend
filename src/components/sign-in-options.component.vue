<script>

import UserService from '@/helpers/user.service.js'

export default {
  name: 'sign-in-options',
  data(){
    return {
      email: '',
      password: '',
      userService: new UserService(),
    }
  },
  methods:{
      signIn(){
        this.userService.getUserByEmailAndPassword(this.email, this.password).then((response) => {
          if(response.status === 200){
            alert("Sign in success")
            sessionStorage.setItem('user', JSON.stringify(response.data))
          }
        }).catch(() => {
          alert("Email or password wrong")
        });
      }
  }
}
</script>

<template>
  <div class="sign-in-options ml-4 sm:ml-0 " aria-label="Sign in options section content">
    <div class="sign-in-scalable-size bg-white flex flex-column gap-4 p-7 border-round-2xl shadow-3" aria-label="Sign in sections parameters">
      <h1 class="text-center text-black-alpha-90 text-sm md:text-base lg:text-2xl" aria-label="Sign in section title"> Please enter your account details: </h1>
      <div class="flex flex-column  w-10em sm:w-15rem md:w-30rem gap-2" aria-label="Sign in parameters">
        <pv-inputext class="text-xs md:text-base" v-model="email"  size="large" type="text" placeholder="Please enter your email" aria-label="Please enter your email"/>
        <pv-inputext class="text-xs md:text-base" v-model="password" size="large" type="password" placeholder="Please enter your password" aria-label="Please enter your password"/>
      </div>
      <div>
        <pv-button @click="signIn" class="w-10rem  text-xs  sm:text-base" size="large" severity="primary" aria-label="Sign in button"> Sign in </pv-button>
      </div>
      <div class="flex flex-column gap-2">
        <small id="username-help" aria-label="Do you dont have an account yet? Warning">Do you dont have an account yet?.</small>
        <router-link to="/sign-up" aria-label="Go to sign up section">
          <pv-button  class=" w-10rem text-xs sm:text-base sm:w-30rem" aria-label="Sign up button"  size="large" severity="danger"> Sign up </pv-button>
        </router-link>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>