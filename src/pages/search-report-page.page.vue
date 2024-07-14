<script>
import SearchReportOptions from '@/components/search-report-options.component.vue'

export default {
  name: 'search-report-page',
  components: { SearchReportOptions },
  data(){
    return {
      isUserSignIn: false
    }
  },
  mounted(){
    if(sessionStorage.getItem('user') !== null){
      this.isUserSignIn = true
    }
  }
}
</script>

<template>
   <div v-if="isUserSignIn" class="modifiable text-left pl-7 md:pl-8 lg:pl-0 md:text-sm sm:text-xs text-black-alpha-90" aria-label="Report management screen">
     <h1 aria-label="Screen title"> Reports Management Screen </h1>
     <search-report-options/>
   </div>
   <div class="not-sign-in-container" v-else>
       <h1 class="text-base text-white md:text-2xl lg:text-3xl text-center" > {{$t('not_sign_in_warning')}} </h1>
   </div>
</template>

<style scoped>

</style>