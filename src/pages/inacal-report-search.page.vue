<script>
import ReportsService from '@/helpers/reports.service.js'
import SearchScreenHero from '@/components/search-screen-hero.component.vue'
import SearchScreenFooter from '@/components/search-screen-footer.component.vue'
import { isTokenExpired } from '@/helpers/verify-token.service.js'

export default {
   name: "inacal-report-search",
  components: { SearchScreenFooter, SearchScreenHero},
   data(){
     return {
       certifiedNumber : "",
       reportService: new ReportsService(),
       isUserSignIn: false,
       notDataFound: true
     }
   },
  methods: {
    searchReport() {
      this.reportService.reportExistsByCertifiedNumber(this.certifiedNumber)
        .then((response) => {
          if (response.status === 200) {
            this.notDataFound = false;
          }
        }).catch(() => {
        this.notDataFound = true;
        alert("No report found, please check the parameters");
      })
    },
    clearParameters() {
      this.certifiedNumber = "";
      this.notDataFound = true;
    }
  },
  mounted() {
    const token = JSON.parse(sessionStorage.getItem('token'));
    if (token && isTokenExpired(token)) {
      sessionStorage.removeItem("token");
      alert("Your token is expired, please sign in again");
      this.$router.push('/sign-in').then(() => {
        location.reload();
      })
    }
  },
  computed:{
    pdfImgUrl() {
      return `http://38.25.38.94:3000/pdfs/${this.certifiedNumber}.pdf#toolbar=0`;
    },
  }
}
</script>

<template>
  <div v-if="notDataFound"  class="search-container">
    <div class="modifiable text-left pl-7 md:pl-8 lg:pl-0 md:text-sm sm:text-xs text-black-alpha-90" aria-label="Report management screen">
      <search-screen-hero :title="$t('search_options_title')" :subtitle="$t('search_report_subcontext')"/>
       <div class="flex justify-content-center align-items-center flex-column">
         <div class="flex flex-column justify-content-start align-items-start lg:flex-row lg:justify-content-evenly xl:justify-content-between lg: w-full gap-5">
           <h1 class="text-white text-xs md:text-xl"> Numero de Certificado: </h1>
           <pv-inputext class="text-xs xl:text-base" v-model="certifiedNumber" placeholder="Numero de Certificado" aria-label="Enter your certified number" />
         </div>
       </div>
      <div class="flex gap-3 mt-8 lg:justify-content-center xl:justify-content-start">
        <pv-button @click="searchReport" aria-label="Search report pdf button">{{$t('search_button')}}</pv-button>
        <pv-button severity="warn" @click="clearParameters" aria-label="Clear report parameters button">{{$t('clear_button')}}</pv-button>
      </div>
      <search-screen-footer :content="$t('search_report_information')"/>
    </div>
  </div>
  <div v-else class="flex flex-column gap-3 justify-content-center align-items-center mt-8 w-full h-full" aria-label="Report content section">
    <div class="flex gap-3 mt-8">
      <pv-button @click="searchReport" aria-label="Search report pdf button">{{$t('search_button')}}</pv-button>
      <pv-button severity="warn" @click="clearParameters" aria-label="Clear report parameters button">{{$t('clear_button')}}</pv-button>
    </div>
        <iframe :src="pdfImgUrl" class="pdf-screen-manager" width="800" height="1030">
          {{$t('warning')}} <code>iframe</code>.
        </iframe>
  </div>
</template>

<style scoped>

</style>