<script>

import SearchPecOptions from '@/components/search-pec-options.component.vue'

export default {
  name: 'search-report-details-page',
  components: { SearchPecOptions },
  data(){
    return {
      isUserSignIn: false
    }
  },
  mounted() {
    if (sessionStorage.getItem('user') !== null) {
      this.isUserSignIn = true
    }

  }

}
</script>

<template>
  <div v-if="isUserSignIn"  class="search-container">
    <div class="modifiable text-left pl-7 md:pl-8 lg:pl-0 md:text-sm sm:text-xs text-black-alpha-90" aria-label="Report management screen">
      <search-pec-options/>
    </div>
  </div>
  <div class="not-sign-in-container" v-else>
    <h1 class="text-base text-white md:text-2xl lg:text-3xl text-center" > {{$t('not_sign_in_warning')}} </h1>
  </div>
</template>

<style scoped>

</style>