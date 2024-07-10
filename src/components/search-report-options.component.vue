<script>
import ReportsService from '@/helpers/reports.service.js'

export default {
  name: 'search-report-options',
  data(){
    return {
      reportImg : "",
      type: "",
      ReportsService : new ReportsService(),
      notDataFound: false
    }
  },
  methods: {
    searchReport() {
      this.ReportsService.getReportImageByType(this.type)
        .then((response) => {
          if (response.status === 200) {
            this.reportImg = response.data
            this.notDataFound = false;
          }
        }).catch(() => {
        this.notDataFound = true;
      })
    }
  },
}
</script>

<template>
   <div class="search-report-container w-full flex flex-column gap-5">
    <div class="flex gap-2">
      <pv-inputext v-model="type" placeholder="Search by Name"></pv-inputext>
      <pv-button @click="searchReport">Search</pv-button>
    </div>
     <div class="card" v-if="notDataFound">
       <p class="text-center text-red-800">No data found</p>
     </div>
     <div v-else>
       <iframe :src="reportImg" width="100%" height="630">
         Tu navegador no soporta el elemento <code>iframe</code>.
       </iframe>
     </div>
  </div>
</template>

<style scoped>

</style>