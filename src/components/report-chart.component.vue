<script>

import ReportsService from '@/helpers/reports.service.js'
import { isTokenExpired } from '@/helpers/verify-token.service.js'
import * as XLSX from 'xlsx'

export default {
  name: 'report-chart',
  data() {
    return {
      chartData: null,
      chartOptions: null,
      brand: null,
      reports: null,
      year : null
    };
  },
  mounted() {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token && isTokenExpired(token)) {
      alert("Your token is expired, please sign in again");
      this.$router.push('/sign-in');
    }
    this.chartOptions = this.setChartOptions();
  },
  computed: {
    brandPlaceHolder() {
      return this.$t('report_chart_brand_placeholder');
    },
    yearPlaceHolder() {
      return this.$t('report_chart_year_placeholder');
    },
  },
  methods: {
    setChartData() {
      return {
        labels: Object.keys(this.reports),
        datasets: [
          {
            label: 'Total Reports',
            data: Object.values(this.reports),
            backgroundColor: ['rgba(249, 115, 22, 0.2)', 'rgba(6, 182, 212, 0.2)', 'rgb(107, 114, 128, 0.2)', 'rgba(139, 92, 246, 0.2)'],
            borderColor: ['rgb(249, 115, 22)', 'rgb(6, 182, 212)', 'rgb(107, 114, 128)', 'rgb(139, 92, 246)'],
            borderWidth: 1
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
      XLSX.writeFile(wb, "total-cilindros-marca.xlsx");
    },
    async searchReportsByBrand() {
      await ReportsService.countReportsByBrandAndYear(this.brand.trim(), this.year).then(
        (response) => {
          if (response.status === 200) {
            this.reports = Object.keys(response.data)
              .sort((a, b) => new Date(`01 ${a} 2000`) - new Date(`01 ${b} 2000`))
              .reduce((acc, key) => {
                acc[key] = response.data[key];
                return acc;
              }, {});
            this.chartData = this.setChartData();
            alert("Reports found");
          }
        }
      ).catch(() => {
        alert("Error searching reports by brand");
      });
    },
    setChartOptions() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
      const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

      return {
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
            beginAtZero: true,
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
}
</script>

<template>
  <div class="chart-container ">
    <div  class="flex  flex-column lg:flex-row gap-4">
     <router-link to="/report-chart-operation-center">
       <pv-button severity="contrast" >{{$t('filter_operation_center')}} </pv-button>
     </router-link>
      <router-link to="/report-chart-type">
        <pv-button severity="contrast" > {{$t('filter_type')}} </pv-button>
      </router-link>
      <router-link to="/report-details">
        <pv-button severity="contrast" > {{$t('search_details')}} </pv-button>
      </router-link>
      <router-link to="/total-reports-chart">
        <pv-button severity="contrast" > {{$t('total_reports_chart')}} </pv-button>
      </router-link>
    </div>
   <div class="flex  flex-column lg:flex-row gap-4">
     <pv-inputext class="text-sm" v-model="brand" size="large"  type="text" :placeholder="brandPlaceHolder"  aria-label="Search reports by brand input button"/>
     <pv-inputext class="text-sm" v-model="year" size="large"  type="text" :placeholder="yearPlaceHolder"  aria-label="Search reports by year input button" />
     <pv-button severity="primary" @click="searchReportsByBrand"> {{$t('search_button')}} </pv-button>
   </div>

    <div class="flex justify-content-center" v-if="this.reports">
      <pv-button class="text-sm lg:text-base" @click="exportCurrentReport" size="large" severity="contrast"> {{$t('export_excel_button')}} </pv-button>
    </div>
    <div class="chart-manager">
      <pv-chart type="bar" :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<style scoped>

</style>