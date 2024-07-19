<script>


import ReportsService from '@/helpers/reports.service.js'
import { isTokenExpired } from '@/helpers/verify-token.service.js'
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
  },
  computed: {
     cylinderNumberPlaceholder() {
       return this.$t('cylinder_number_placeholder');
     },
      vehicleIdentifierPlaceholder() {
        return this.$t('vehicle_identifier_placeholder');
      },
      certificateNumberHeader() {
        return this.$t('certificate_number_header');
      },
      cylinderNumberHeader() {
        return this.$t('cylinder_number_header');
      },
      brandHeader() {
        return this.$t('brand_header');
      },
      madeDateHeader() {
        return this.$t('made_date_header');
      },
      emitDateHeader() {
        return this.$t('emit_date_header');
      },
      typeHeader() {
        return this.$t('type_header');
      },
      operationCenterHeader() {
        return this.$t('operation_center_header');
      },
     vehicleIdentifierHeader() {
       return this.$t('vehicle_identifier_header');
     },
  },
  created() {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token && isTokenExpired(token)) {
      alert("Your token is expired, please sign in again");
      this.$router.push('/sign-in');
    }
  }
}
</script>

<template>
  <div class="search-report-details-container">
    <h1 class="text-sm md:text-base lg:text-2xl text-center"> {{$t('search_report_details_title')}}:</h1>
    <div class="flex flex-column lg:flex-row  gap-3">
      <pv-inputext class="custom-btn-size text-sm"  v-model="cylinderNumber" :placeholder="cylinderNumberPlaceholder" size="large"/>
      <pv-inputext class="custom-btn-size text-sm"  v-model="vehicleIdentifier" :placeholder="vehicleIdentifierPlaceholder" size="large"/>
    </div>
    <pv-button @click="searchReport" size="large" severity="primary"> {{$t('search_report_details_button')}}</pv-button>
    <div class="search-report-details-table-container ">
       <pv-datatable class=" border-3 border-black-alpha-20 "  resizable-columns column-resize-mode="expand" :value="reports" table-style="min-width: 50rem">
         <pv-column class=" border-1  bg-green-400 text-black-alpha-90 font-bold" field="certificationNumber" :header="certificateNumberHeader"></pv-column>
         <pv-column  class="border-1   bg-green-400 text-black-alpha-90 font-bold" field="cylinderNumber" :header="cylinderNumberHeader"></pv-column>
          <pv-column  class="border-1   bg-green-400 text-black-alpha-90 font-bold" field="vehicleIdentifier" :header="vehicleIdentifierHeader"></pv-column>
         <pv-column  class="border-1   bg-green-400 text-black-alpha-90 font-bold" field="brand" :header="brandHeader"></pv-column>
         <pv-column  class="border-1  bg-green-400 text-black-alpha-90 font-bold" field="madeDate" :header="madeDateHeader"></pv-column>
         <pv-column  class="border-1  bg-green-400 text-black-alpha-90 font-bold" field="emitDate" :header="emitDateHeader"></pv-column>
         <pv-column  class="border-1  bg-green-400 text-black-alpha-90 font-bold" field="type" :header="typeHeader"></pv-column>
         <pv-column  class="border-1 bg-green-400 text-black-alpha-90 font-bold" field="operationCenter" :header="operationCenterHeader"></pv-column>
       </pv-datatable>
    </div>
  </div>
</template>

<style scoped>

</style>