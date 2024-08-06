<script>
import userService from '@/helpers/user.service.js'
import TotalReportsChart from '@/components/total-reports-chart.component.vue'
export default {
  name: 'total-reports-chart-page',
  components: { TotalReportsChart },
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
    <total-reports-chart/>
  </div>
  <div v-else class="text-center text-red-800 unauthorized-container">
    <h1>Unauthorized</h1>
  </div>
</template>

<style scoped>

</style>