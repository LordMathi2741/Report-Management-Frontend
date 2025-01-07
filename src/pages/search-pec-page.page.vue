<script>

import SearchPecOptions from '@/components/search-pec-options.component.vue'
import SearchScreenHero from '@/components/search-screen-hero.component.vue'
import SearchScreenFooter from '@/components/search-screen-footer.component.vue'

export default {
  name: 'search-report-details-page',
  components: { SearchScreenFooter, SearchScreenHero, SearchPecOptions },
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
      <search-screen-hero :title="$t('search_options_title')" :subtitle="$t('search_report_subcontext')"/>
      <search-pec-options/>
      <search-screen-footer :content="$t('search_report_information')"/>
    </div>
  </div>
  <div class="not-sign-in-container" v-else>
    <h1 class="text-base text-white md:text-2xl lg:text-3xl text-center" > {{$t('not_sign_in_warning')}} </h1>
  </div>
</template>

<style scoped>

</style>