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
  methods: {
    async signIn() {
      try {
        const response = await this.userService.signInUser(this.email, this.password);
        localStorage.setItem('token', JSON.stringify(response.data));
        alert("Sign in success, your token will expire in 1 hour");
        await this.fetchAndStoreUserInfo();
      } catch (error) {
        alert("Email or password wrong");
      }
    },
    async fetchAndStoreUserInfo() {
      try {
        const response = await this.userService.getUserNameByEmail(this.email);
        if (response.status === 200) {
          sessionStorage.setItem('user', JSON.stringify(response.data));
        }
      } catch (error) {
        alert("Error");
      }
    }
  },
    computed: {
      email_placeholder() {
        return this.$t('email')
      },
      password_placeholder() {
        return this.$t('password')
      }
    },
}
</script>

<template>
  <div class="sign-in-options ml-4 sm:ml-0 " aria-label="Sign in options section content">
    <div class="sign-in-options-container bg-white flex flex-column gap-4 p-7 border-round-2xl shadow-3" aria-label="Sign in sections parameters">
      <h1 class="text-center text-black-alpha-90 text-sm md:text-base lg:text-2xl" aria-label="Sign in section title"> {{$t('title_sign_in')}}: </h1>
      <div class="flex flex-column  w-10em sm:w-15rem md:w-30rem gap-2" aria-label="Sign in parameters">
        <pv-inputext class="text-xs md:text-base" v-model="email"  size="large" type="text" :placeholder="email_placeholder" aria-label="Please enter your email"/>
        <pv-inputext class="text-xs md:text-base" v-model="password" size="large" type="password" :placeholder="password_placeholder" aria-label="Please enter your password"/>
      </div>
      <div>
        <pv-button @click="signIn" class="w-10rem  text-xs  sm:text-base" size="large" severity="primary" aria-label="Sign in button"> {{$t('sign_in_section')}} </pv-button>
      </div>
      <div class="flex flex-column gap-2">
        <small id="username-help" aria-label="Do you dont have an account yet? Warning">{{$t('warning_sign_in')}}</small>
        <router-link to="/sign-up" aria-label="Go to sign up section">
          <pv-button  class=" w-10rem text-xs sm:text-base sm:w-20rem md:w-30rem" aria-label="Sign up button"  size="large" severity="warn"> {{$t('sign_up')}} </pv-button>
        </router-link>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>