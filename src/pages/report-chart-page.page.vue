<script>
import ReportChart from '@/components/report-chart.component.vue'
import userService from '@/helpers/user.service.js'

export default {
  name: 'report-chart-page',
  components: { ReportChart },
  data(){
    return {
      currentRole: ' ',
    }
  },
  mounted() {
    userService.getCurrentRole(JSON.parse(sessionStorage.getItem('user'))?.username).then((response) => {
      this.currentRole = response.data;
    })
  }
}
</script>

<template>
  <div v-if="this.currentRole === 'Admin'">
    <report-chart/>
  </div>
  <div v-else class="text-center text-red-800 unauthorized-container">
    <h1>Unauthorized</h1>
  </div>
</template>

<style scoped>

</style>