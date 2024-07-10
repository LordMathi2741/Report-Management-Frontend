<script>
import ReportsService from '@/helpers/reports.service.js'

export default {
  name: 'search-report-options',
  data(){
    return {
      reportImg : "",
      certifiedNumber: "",
      cylinderNumber: "",
      vehicleIdentifier:"",
      emitDate: null,
      ReportsService : new ReportsService(),
      notDataFound: false
    }
  },
  methods: {
    searchReport() {
      this.ReportsService.getReportImgByCertifiedNumberAndCylinderNumberAndEmitDateAndVehicleIdentifier(this.certifiedNumber, this.cylinderNumber, this.emitDate, this.vehicleIdentifier)
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
   <div class="search-report-container p-4 flex flex-column gap-5" aria-label="Search report options content">
    <div class="flex gap-2" aria-label="Search report options parameters">
      <pv-inputext  v-model="certifiedNumber" placeholder="Enter Certified Number" aria-label="Enter certified number"></pv-inputext>
      <pv-inputext v-model="cylinderNumber" placeholder="Enter Cylinder Number" aria-label="Enter cylinder number"></pv-inputext>
      <pv-inputext v-model="vehicleIdentifier" placeholder="Enter Vehicle Identifier" aria-label="Enter vehicle identifier"></pv-inputext>
      <pv-inputext v-model="emitDate" placeholder="Enter Emit Date" aria-label="Enter emit date"></pv-inputext>

      <pv-button @click="searchReport" aria-label="Search report pdf button">Search</pv-button>
    </div>
     <div class="card" v-if="notDataFound" aria-label="Not found report section">
       <p class="text-center text-red-800">No data found</p>
     </div>
     <div v-else aria-label="Report content section">
       <iframe :src="reportImg" class="pdf-screen-manager" width="1000" height="1030">
         Tu navegador no soporta el elemento <code>iframe</code>.
       </iframe>
     </div>
  </div>
</template>

<style scoped>

</style>