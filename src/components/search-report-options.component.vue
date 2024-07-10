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
   <div class="search-report-container p-4 flex flex-column gap-5">
    <div class="flex gap-2">
      <pv-inputext  v-model="certifiedNumber" placeholder="Enter Certified Number"></pv-inputext>
      <pv-inputext v-model="cylinderNumber" placeholder="Enter Cylinder Number"></pv-inputext>
      <pv-inputext v-model="vehicleIdentifier" placeholder="Enter Vehicle Identifier"></pv-inputext>
      <pv-inputext v-model="emitDate" placeholder="Enter Emit Date"></pv-inputext>

      <pv-button @click="searchReport">Search</pv-button>
    </div>
     <div class="card" v-if="notDataFound">
       <p class="text-center text-red-800">No data found</p>
     </div>
     <div v-else>
       <iframe :src="reportImg" class="pdf-screen-manager" width="1000" height="1030">
         Tu navegador no soporta el elemento <code>iframe</code>.
       </iframe>
     </div>
  </div>
</template>

<style scoped>

</style>