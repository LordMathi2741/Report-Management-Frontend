<script>

import ReportsService from '@/helpers/reports.service.js'

export default {
  name: 'report-chart',
  data() {
    return {
      chartData: null,
      chartOptions: null,
      brand: ' ',
      reports: null,
      year : null
    };
  },
  mounted() {
    this.chartOptions = this.setChartOptions();
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
    async searchReportsByBrand(){
      this.reports = await ReportsService.countReportsByBrandAndYear(this.brand.trim(),this.year).then(
        (response) => {
          if(response.status === 200){
            this.reports = response.data;
            this.chartData = this.setChartData();
            alert("Reports found")
          }
        }
      ).catch(() => {
        alert("Error searching reports by brand")
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
}
</script>

<template>
  <div class="chart-container ">
   <div class="flex flex-column lg:flex-row gap-4">
     <pv-inputext v-model="brand" size="large"  type="text" placeholder="Please enter a brand"  aria-label="Search reports by brand input button"  />
     <pv-inputext v-model="year" size="large"  type="text" placeholder="Please enter a year"  aria-label="Search reports by year input button"  />
     <pv-button severity="success" label="Search" @click="searchReportsByBrand" />
   </div>
    <div class="chart-manager">
      <pv-chart type="bar" :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<style scoped>

</style>