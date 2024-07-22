<script>
import ReportsService from '@/helpers/reports.service.js'
import ReportImgService from '@/helpers/report-img.service.js'
import { isTokenExpired } from '@/helpers/verify-token.service.js'

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

            this.getReportImg(" " + this.certifiedNumber);
          }
        }).catch(() => {
        this.notDataFound = true;
        alert("No report found, please check the parameters");
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
      this.notDataFound = true;
    }
  },
  computed: {
    pdfImgUrl() {
      return `http://localhost:3000/pdfs/${this.certifiedNumber}.pdf#toolbar=0`;
    },
    cylinderNumberPlaceholder() {
      return this.$t('cylinder_number_placeholder');
    },
    vehicleIdentifierPlaceholder() {
      return this.$t('vehicle_identifier_placeholder');
    },
    emitDatePlaceholder() {
      return this.$t('emit_date_placeholder');
    },
    certifiedNumberPlaceholder() {
      return this.$t('certificate_number_placeholder');
    }
  },
 mounted() {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token && isTokenExpired(token)) {
      alert("Your token is expired, please sign in again");
      this.$router.push('/sign-in');
    }
  }
}
</script>

<template>
   <div class=" p-4 flex   flex-row  gap-8" aria-label="Search report options content">
    <div   class="w-full flex  flex-column  pt-8   gap-7" aria-label="Search report options parameters">
        <div v-if="notDataFound" class="flex  flex-column lg:flex-row  gap-2">
          <div class="flex font-bold text-white flex-column gap-4">
            <p class="text-xs md:text-xl">{{$t('certified_number')}}:</p>
            <p class="text-xs md:text-xl">{{$t('cylinder_number')}}:</p>
            <p class="text-xs md:text-xl">{{$t('vehicle_identifier_number')}}:</p>
            <p class="text-xs md:text-xl">{{$t('emit_date')}}:</p>
          </div>
          <div class=" flex flex-column w-10rem sm:w-15rem gap-2">
            <pv-inputext class="text-xs md:text-base" v-model="certifiedNumber" :placeholder="certifiedNumberPlaceholder" aria-label="Enter certified number"></pv-inputext>
            <pv-inputext class="text-xs md:text-base" v-model="cylinderNumber" :placeholder="cylinderNumberPlaceholder" aria-label="Enter cylinder number"></pv-inputext>
            <pv-inputext class="text-xs md:text-base" v-model="vehicleIdentifier" :placeholder="vehicleIdentifierPlaceholder" aria-label="Enter vehicle identifier"></pv-inputext>
            <pv-inputext class="text-xs md:text-base" v-model="emitDate" :placeholder="emitDatePlaceholder" aria-label="Enter emit date"></pv-inputext>
            <div class="flex gap-3 flex ">
              <pv-button @click="searchReport" aria-label="Search report pdf button">{{$t('search_button')}}</pv-button>
              <pv-button severity="warn" @click="clearParameters" aria-label="Clear report parameters button">{{$t('clear_button')}}</pv-button>
            </div>
          </div>
        </div>

      <div v-else class="flex flex-column gap-3" aria-label="Report content section">
        <div class="flex gap-3 flex  ">
          <pv-button @click="searchReport" aria-label="Search report pdf button">{{$t('search_button')}}</pv-button>
          <pv-button severity="warn" @click="clearParameters" aria-label="Clear report parameters button">{{$t('clear_button')}}</pv-button>
        </div>
        <iframe :src="pdfImgUrl" class="pdf-screen-manager" width="900" height="1030">
         {{$t('warning')}} <code>iframe</code>.
        </iframe>
      </div>

    </div>

  </div>
</template>

<style scoped>

</style>