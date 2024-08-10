<script>
import UserService from '@/helpers/user.service.js'

export default {
  name: 'sign-up-options',
  data(){
    return {
      username: "",
      password: "",
      email: "",
      ruc: "",
      socialReason: "",
      userService: new UserService()
    }
  },
  methods: {
    async signUp(){
      const user = {
        username: this.username,
        password: this.password,
        email: this.email,
        ruc: this.ruc,
        socialReason: this.socialReason
      }
       await this.userService.signUpUser(user).then((response) =>{
         if(response.status === 201){
           alert("User created successfully")
           this.$router.push('/sign-in')
         }
       }).catch(() =>{
           alert(`User already exists or invalid data, please try again.`)
       })
    }
  },
  computed:{
       rucPlaceholder(){
         return this.$t('ruc')
       },
        emailPlaceholder(){
          return this.$t('email')
        },
        passwordPlaceholder(){
          return this.$t('password')
        },
        usernamePlaceholder(){
          return this.$t('username')
        },
        socialReasonPlaceholder(){
          return this.$t('social_reason')
        }
  }
}
</script>

<template>
   <div class="sign-up-options ml-4 sm:ml-0" aria-label="Sign up options content">
    <div class="bg-white p-7 border-round-xl lg:border-round-2xl shadow-4 flex flex-column gap-4" aria-label="Sign up options parameters content">
      <div class="text-xs text-justify sm:text-sm  lg:text-base sm:w-15rem md:w-25rem flex flex-column gap-2  lg:w-30rem" aria-label="Sign up options title">
        <h3 class="text-center"> {{$t('title_sign_up')}}</h3>
      <div v-html="$t('sign_up_information')">
        </div>
      </div>
      <div class="flex flex-column  w-10em sm:w-15rem md:w-30rem gap-5" aria-label="Sign up options parameters">
        <pv-inputext  class="text-xs sm:text-sm" v-model="this.username"  size="large" type="text" :placeholder="usernamePlaceholder" aria-label="Please enter your username"/>
        <pv-inputext  class="text-xs sm:text-sm" v-model="this.socialReason"  size="large" type="text" :placeholder="socialReasonPlaceholder" aria-label="Please enter your name or social reason"/>
        <div class="flex flex-column gap-2" aria-label="Email given content">
          <small class="text-left  text-green-900" aria-label="Remember your ruc or email must be contain only numbers and have 11. Warning" id="username-help">{{$t('ruc_warning')}}</small>
          <pv-inputext  class="text-xs sm:text-sm" v-model="this.ruc" size="large" type="text" aria-label="Please enter your ruc" :placeholder="rucPlaceholder"/>
        </div>
        <div class="flex flex-column gap-2" aria-label="Email given content">
          <small class="text-left  text-green-900" aria-label="Remember you need to send a valid email. Warning" id="username-help"> {{$t('email_warning')}}</small>
          <pv-inputext  class="text-xs sm:text-sm" v-model="this.email" size="large" type="text" aria-label="Please enter your email" :placeholder="emailPlaceholder"/>
        </div>
        <div class="flex flex-column gap-2" aria-label="Password given content">
          <small class="text-left text-green-900" aria-label="Your password must to be greater than 8 letters and contains @. Warning" id="username-help">{{$t('password_warning')}}</small>
          <pv-inputext  class="text-xs sm:text-sm" v-model="this.password" size="large" type="password" aria-label="Please enter your password" :placeholder="passwordPlaceholder"/>
        </div>
        <pv-button @click="signUp"  class=" text-xs sm:text-base  md:w-15rem lg:w-30rem" aria-label="Sign up button" size="large" severity="warn"> {{$t('sign_up')}} </pv-button>
        <div class="flex flex-column gap-2" aria-label="Go to sign in section">
          <small id="username-help" aria-label="Do you already have an account? Warning">{{$t('warning_sign_up')}}</small>
          <router-link to="/sign-in" aria-label="Go to sign in section">
            <pv-button  class="text-xs sm:text-base  w-15rem lg:w-30rem" aria-label="Sign in button" size="large" severity="primary"> {{$t('sign_in')}} </pv-button>
          </router-link>
        </div>
      </div>
    </div>
   </div>
</template>

<style scoped>

</style>