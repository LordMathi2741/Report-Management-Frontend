<script>


import ReportsService from '@/helpers/reports.service.js'
import { isTokenExpired } from '@/helpers/verify-token.service.js'
import * as XLSX from 'xlsx'

export default {
  name: 'report-chart-operation-center',
  data() {
    return {
      chartData: null,
      chartOptions: null,
      reports: null,
      year:null,
      month:null
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
      const documentStyle = getComputedStyle(document.documentElement);

      return {
        labels: Object.keys(this.reports),
        datasets: [
          {
            label: 'Total Reports',
            data: Object.values(this.reports).sort((a, b) => a - b),
            backgroundColor: documentStyle.getPropertyValue('--p-cyan-500'),
            borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
            borderWidth: 1
          }
        ]
      }
    },
    exportCurrentReport() {
      const ws_name = "Report Information";
      const wb = XLSX.utils.book_new();
      const ws_data = [
        ["Operation Center", "Total Reports"],
        ...Object.entries(this.reports).map(([key, value]) => [key, value])
      ];
      const ws = XLSX.utils.aoa_to_sheet(ws_data);
      XLSX.utils.book_append_sheet(wb, ws, ws_name);
      XLSX.writeFile(wb, "total-cilindros-taller.xlsx");

    },
    searchReportsByYearAndMonth(){
      ReportsService.countReportsByOperationCenterAndYear(this.year,this.month).then((response) => {
        this.reports = response.data;
        this.chartData = this.setChartData();
        this.chartOptions = this.setChartOptions();
      }).catch(() => {
        alert('Report not found or month not valid, please remember that the month must be between 1 and 12')
      });
    },
    setChartOptions() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
      const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

      return {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          legend: {
            labels: {
              color: textColor
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder
            }
          },
          y: {
            ticks: {
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder
            }
          }
        }
      };
    }
  },
  mounted() {
    const token = JSON.parse(sessionStorage.getItem('token'));
    if (token && isTokenExpired(token)) {
      sessionStorage.removeItem("token");
      alert("Your token is expired, please sign in again");
      this.$router.push('/sign-in').then(() => {
        window.location.reload();
      })
    }
  }
};
</script>

<template>
  <div class="chart-container-bars ">
    <div class="flex flex-column lg:flex-row gap-3 justify-content-center">
      <pv-inputext class="text-sm" v-model="year" size="large"  type="text" :placeholder="yearPlaceHolder"  aria-label="Search reports by year input button" />
      <pv-inputext class="text-sm" v-model="month" size="large"  type="text" :placeholder="monthPlaceHolder"  aria-label="Search reports by month input button" />
      <pv-button @click="searchReportsByYearAndMonth" severity="primary" > {{$t('search_button')}} </pv-button>
    </div>
    <div class="flex justify-content-center" v-if="this.reports">
    <pv-button class="text-sm lg:text-base" @click="exportCurrentReport" size="large" severity="contrast"> {{$t('export_excel_button')}} </pv-button>
  </div>
    <pv-chart type="bar" :data="chartData" :options="chartOptions" class=" h-30rem" />
  </div>
</template>

<style scoped>

</style>