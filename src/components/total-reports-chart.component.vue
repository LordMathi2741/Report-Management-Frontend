<script>
import ReportsService from '@/helpers/reports.service.js'
import { isTokenExpired } from '@/helpers/verify-token.service.js'

export default {
  name: 'total-reports-chart',
  data() {
    return {
      chartData: null,
      chartOptions: null,
      total:null,
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
    yearPlaceHolder() {
      return this.$t('report_chart_year_placeholder');
    },
  },
  methods: {
    setChartData() {
      return {
        labels: Object.keys(this.total),
        datasets: [
          {
            label: 'Sales',
            data: Object.values(this.total),
            backgroundColor: ['rgba(249, 115, 22, 0.2)', 'rgba(6, 182, 212, 0.2)', 'rgb(107, 114, 128, 0.2)', 'rgba(139, 92, 246, 0.2)'],
            borderColor: ['rgb(249, 115, 22)', 'rgb(6, 182, 212)', 'rgb(107, 114, 128)', 'rgb(139, 92, 246)'],
            borderWidth: 1
          }
        ]
      };
    },
    async searchTotalReportsByYear() {
      await ReportsService.countTotalReportsByYear(this.year).then(
        (response) => {
          if(response.status === 200){
            this.total = response.data;
            this.chartData = this.setChartData();
            alert("Total reports found")
          }
        }
      ).catch(() => {
        alert("Error searching total reports by year")
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
  }
};
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
      <pv-inputext class="text-sm" v-model="year" size="large"  type="text" :placeholder="yearPlaceHolder"  aria-label="Search reports by year input button" />
      <pv-button severity="primary" @click="searchTotalReportsByYear"> {{$t('search_button')}} </pv-button>
    </div>
    <div class="chart-manager">
      <pv-chart type="bar" :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<style scoped>

</style>