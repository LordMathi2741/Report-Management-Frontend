<script>
import ReportsService from '@/helpers/reports.service.js'

export default {
  name: 'search-report-options',
  data(){
    return {
      reports : [],
      type: "",
      ReportsService : new ReportsService(),
      notDataFound: false
    }
  },
  methods: {
    searchReport(){
      if(this.type.trim() === ""){
        this.fetchAllReports()
      }
      else {
        this.ReportsService.getReportByType(this.type)
          .then((response) => {
            if (response.status === 200) {
              this.reports = []
              this.reports.push(response.data)
              this.notDataFound = false;
            }
          }).catch(() => {
          this.notDataFound = true;
        })
      }
    },
    fetchAllReports(){
      this.ReportsService.getAllReports()
      .then((response)=> {
        this.reports = response.data
      })
    }
  },
  created() {
    this.fetchAllReports()
  }
}
</script>

<template>
   <div class="search-report-container flex flex-column gap-5">
    <div class="flex gap-2">
      <pv-inputext v-model="type" placeholder="Search by Name"></pv-inputext>
      <pv-button @click="searchReport">Search</pv-button>
    </div>
     <div class="card" v-if="notDataFound">
       <p class="text-center text-red-800">No data found</p>
     </div>
     <div class="card" v-else>
       <pv-datatable class="custom-table" :value="reports" tableStyle="min-width: 50rem">
         <pv-column field="certificationNumber" header="CertificationNumber"> </pv-column>
         <pv-column field="brand" header="Brand"> </pv-column>
         <pv-column field="madeDate" header="Made Date"> </pv-column>
         <pv-column field="cylinderNumber" header="CylinderNumber"> </pv-column>
         <pv-column field="emitDate" header="EmitDate"> </pv-column>
         <pv-column field="type" header="Type"> </pv-column>
       </pv-datatable>
     </div>
  </div>
</template>

<style scoped>

</style>