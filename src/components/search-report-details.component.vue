<script>


import ReportsService from '@/helpers/reports.service.js'
export default {
  name: 'search-report-details',
  data(){
    return {
      reports: [],
      cylinderNumber: null,
      vehicleIdentifier: null,
    }
  },
  methods: {
    async searchReportByCylinderNumber() {
      this.clearCurrentReports();
      await ReportsService.getReportByCylinderNumber(this.cylinderNumber).then((response) => {
        alert("Report found");
        this.reports.push(response.data)
      }).catch(() => {
        alert("Report with this cylinder number not found ");
      })
    },
    async searchReportByVehicleIdentifier() {
      this.clearCurrentReports();
      await ReportsService.getReportByVehicleIdentifier(this.vehicleIdentifier).then((response) => {
        this.reports.push(response.data);
        alert("Report found");
      }).catch(() => {
        alert("Report with this vehicle identifier not found ");
      })
    },
    searchReport() {
      this.vehicleIdentifier === null ? this.searchReportByCylinderNumber() : this.searchReportByVehicleIdentifier();
    },
    clearCurrentReports(){
      this.reports = []
    }
  }
}
</script>

<template>
  <div class="search-report-details-container">
    <h1 class="text-sm md:text-base lg:text-2xl"> Por favor, ingrese alguno de los dos campos:</h1>
    <div class="flex flex-column lg:flex-row  gap-3">
      <pv-inputext class="custom-btn-size"  v-model="cylinderNumber" placeholder="Please enter cylinder number" size="large"/>
      <pv-inputext class="custom-btn-size"  v-model="vehicleIdentifier" placeholder="Please enter vehicle identifier" size="large"/>
    </div>
    <pv-button @click="searchReport" size="large" severity="primary"> Search</pv-button>
    <div>
       <pv-datatable :value="reports" table-style="min-width: 50rem">
         <pv-column field="certificationNumber" header="Certification Number"></pv-column>
         <pv-column field="cylinderNumber" header="Cylinder Number"></pv-column>
         <pv-column field="brand" header="Brand"></pv-column>
         <pv-column field="madeDate" header="Made Date"></pv-column>
         <pv-column field="emitDate" header="Emit Date"></pv-column>
         <pv-column field="type" header="Type"></pv-column>
         <pv-column field="operationCenter" header="Operation Center"></pv-column>
       </pv-datatable>
    </div>
  </div>
</template>

<style scoped>

</style>