<script>
import OptionSearchCard from '@/components/option-search-card.component.vue'
import userService from '@/helpers/user.service.js'
import InacalReportSearch from '@/pages/inacal-report-search.page.vue'

export default {
  name: 'choose-option-search',
  components: { InacalReportSearch, OptionSearchCard },
  data() {
    return {
     currentUserType: " "
    }
  },
  mounted() {
    userService.getCurrentRole(JSON.parse(sessionStorage.getItem('user'))?.username).then((response) => {
      this.currentUserType = response.data;
    })
  }
}
</script>

<template>
  <div class="choose-option-container" aria-label=" Choose option to Search section content">
     <div v-if="currentUserType === 'Supervisor'">
       <inacal-report-search/>
     </div>
    <div v-else class="choose-options-manager flex  justify-content-center align-items-center lg:ml-8 gap-8 flex-column">
      <h2 class="text-xs md:text-base lg:text-2xl text-center text-white  "> {{$t('choose_option_title')}} </h2>
      <option-search-card/>
    </div>
  </div>
</template>

<style scoped>
.choose-options-manager {
  margin-top:  300px;
}
</style>