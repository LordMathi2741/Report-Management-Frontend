<script>
import reportsService from '@/helpers/reports.service.js'
import { isTokenExpired } from '@/helpers/verify-token.service.js'
import * as XLSX from 'xlsx'

export default {
  name: 'report-chart-type',
  data() {
    return {
      chartData: null,
      chartOptions: {
        cutout: '60%'
      },
      year: null,
      month: null,
      reports: null
    };
  },

  computed: {
    monthPlaceHolder() {
      return this.$t('report_chart_month_placeholder');
    },
    yearPlaceHolder() {
      return this.$t('report_chart_year_placeholder');
    },
  },
  methods: {
    setChartData() {
      const documentStyle = getComputedStyle(document.body);

      return {
        labels: Object.keys(this.reports),
        datasets: [
          {
            data: Object.values(this.reports),
            backgroundColor: [documentStyle.getPropertyValue('--p-cyan-500'), documentStyle.getPropertyValue('--p-orange-500'), documentStyle.getPropertyValue('--p-gray-500')],
            hoverBackgroundColor: [documentStyle.getPropertyValue('--p-cyan-400'), documentStyle.getPropertyValue('--p-orange-400'), documentStyle.getPropertyValue('--p-gray-400')]
          }
        ]
      };
    },
    exportCurrentReport(){
      const ws_name = "Report Information";
      const wb = XLSX.utils.book_new();
      const ws_data = [
        ["Operation Center", "Total Reports"],
        ...Object.entries(this.reports).map(([key, value]) => [key, value])
      ];
      const ws = XLSX.utils.aoa_to_sheet(ws_data);
      XLSX.utils.book_append_sheet(wb, ws, ws_name);
      XLSX.writeFile(wb, "total-cilindros-tipo.xlsx");
    },
    setChartOptions() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');

      return {
        plugins: {
          legend: {
            labels: {
              cutout: '60%',
              color: textColor
            }
          }
        }
      };
    },
    searchReportsByYearAndMonth() {
      reportsService.countReportsTypeByYearAndMonth(this.year, this.month)
        .then((response) => {
          this.reports = response.data;
          this.chartData = this.setChartData();
          this.chartOptions = this.setChartOptions();
        })
        .catch((error) => {
            console.error(error);
          }
        );
    },
  },
  mounted() {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token && isTokenExpired(token)) {
      alert("Your token is expired, please sign in again");
      this.$router.push('/sign-in');
    }
  }
};
</script>

<template>
  <div class="chart-type-container mx-auto my-8 md:my-5 lg:my-3">
    <div class="flex flex-column lg:flex-row gap-3 justify-content-center my-8 md:my-5 lg:my-3">
      <pv-inputext class="text-sm" v-model="year" size="large"  type="text" :placeholder="yearPlaceHolder"  aria-label="Search reports by year input button" />
      <pv-inputext class="text-sm" v-model="month" size="large"  type="text" :placeholder="monthPlaceHolder"  aria-label="Search reports by month input button" />
      <pv-button @click="searchReportsByYearAndMonth" severity="primary" > {{$t('search_button')}} </pv-button>
    </div>
    <div class="flex justify-content-center" v-if="this.reports">
      <pv-button class="text-sm lg:text-base" @click="exportCurrentReport" size="large" severity="contrast"> {{$t('export_excel_button')}} </pv-button>
    </div>
    <pv-chart type="doughnut" :data="chartData" :options="chartOptions" class="w-full md:w-[30rem]" />
  </div>
</template>

<style scoped>

</style>