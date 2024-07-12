<script>
import ReportsService from '@/helpers/reports.service.js'
import ReportImgService from '@/helpers/report-img.service.js'

export default {
  name: 'search-report-options',
  data(){
    return {
      reportImg : "",
      certifiedNumber: "",
      cylinderNumber: "",
      vehicleIdentifier:"",
      emitDate: null,
      reportsService : new ReportsService(),
      notDataFound: true,
      reportsImgService: new ReportImgService()

    }
  },
  methods: {
    searchReport() {
      this.reportsService.reportExistsByImgByCertifiedNumberAndCylinderNumberAndEmitDateAndVehicleIdentifier(this.certifiedNumber, this.cylinderNumber, this.emitDate, this.vehicleIdentifier)
        .then((response) => {
          if (response.status === 200) {
            this.notDataFound = false;
            this.getReportImg(this.certifiedNumber);
          }
        }).catch(() => {
        this.notDataFound = true;
      })
    },
    async getReportImg(filename){
      await this.reportsImgService.getReportImgByFileName(filename)
        .then((response) => {
          if (response.status === 200) {
            this.reportImg = response.data;
          }
        }).catch(() => {
        this.notDataFound = true;
      })
    },
    clearParameters(){
      this.certifiedNumber = "";
      this.cylinderNumber = "";
      this.vehicleIdentifier = "";
      this.emitDate = null;
    }
  },
  computed: {
    pdfImgUrl() {
      return `http://localhost:3000/pdfs/${this.certifiedNumber}.pdf#toolbar=0`;
    }
  }
}
</script>

<template>
   <div class="search-report-container p-4 flex flex-column lg:flex-row  gap-8" aria-label="Search report options content">
    <div class="flex flex-column   gap-7" aria-label="Search report options parameters">
        <div class="flex flex-column forms-manager lg:flex-row  gap-2">
          <div class="flex flex-row lg:flex-column gap-4">
            <h3 class="text-xs md:text-xl">Numero de certificado:</h3>
            <h3 class="text-xs md:text-xl">Numero de cilindro:</h3>
            <h3 class="text-xs md:text-xl">Identificador de vehiculo:</h3>
            <h3 class="text-xs md:text-xl">Fecha de emision:</h3>
          </div>
          <div class="flex flex-row lg:flex-column gap-2">
            <pv-inputext class="text-xs md:text-xl" v-model="certifiedNumber" placeholder="Enter Certified Number" aria-label="Enter certified number"></pv-inputext>
            <pv-inputext class="text-xs md:text-xl" v-model="cylinderNumber" placeholder="Enter Cylinder Number" aria-label="Enter cylinder number"></pv-inputext>
            <pv-inputext class="text-xs md:text-xl" v-model="vehicleIdentifier" placeholder="Enter Vehicle Identifier" aria-label="Enter vehicle identifier"></pv-inputext>
            <pv-inputext class="text-xs md:text-xl" v-model="emitDate" placeholder="Enter Emit Date" aria-label="Enter emit date"></pv-inputext>
          </div>
        </div>

      <div class="flex gap-3">
        <pv-button @click="searchReport" aria-label="Search report pdf button">Search</pv-button>
        <pv-button severity="danger" @click="clearParameters" aria-label="Clear report parameters button">Clear</pv-button>
      </div>
    </div>
     <div class="card" v-if="notDataFound" aria-label="Not found report section">
       <p class="text-center text-red-800">No data found</p>
     </div>
     <div v-else aria-label="Report content section">
       <iframe :src="pdfImgUrl" class="pdf-screen-manager" width="1000" height="1030">
         Tu navegador no soporta el elemento <code>iframe</code>.
       </iframe>
     </div>
  </div>
</template>

<style scoped>

</style>