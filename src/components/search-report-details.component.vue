<script>

import * as XLSX from 'xlsx';
import ReportsService from '@/helpers/reports.service.js'
import { isTokenExpired } from '@/helpers/verify-token.service.js'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
export default {
  name: 'search-report-details',
  data(){
    return {
      reports: [],
      cylinderNumber: null,
      vehicleIdentifier: null,
      currentReportPdf: null,
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
        alert("Report found");
        this.reports.push(response.data);
      }).catch(() => {
        alert("Report with this vehicle identifier not found ");
      })
    },
    searchReport() {
      this.vehicleIdentifier === null ? this.searchReportByCylinderNumber() : this.searchReportByVehicleIdentifier();
    },
    clearCurrentReports(){
      this.reports = []
    },
    exportCurrentReport() {
      if(this.reports.length === 0){
        alert("No report to export");
        return;
      }
      const report = this.reports[0];
      const ws_name = "Report Information";
      const wb = XLSX.utils.book_new();
      const ws_data = [
        [this.certificateNumberHeader, this.cylinderNumberHeader, this.vehicleIdentifierHeader, this.brandHeader, this.madeDateHeader, this.emitDateHeader, this.typeHeader, this.operationCenterHeader],
        [report.certificationNumber, report.cylinderNumber, report.vehicleIdentifier, report.brand, report.madeDate, report.emitDate, report.type, report.operationCenter]
      ];
      const ws = XLSX.utils.aoa_to_sheet(ws_data);
      XLSX.utils.book_append_sheet(wb, ws, ws_name);
      XLSX.writeFile(wb, "report.xlsx");

    },
    exportData() {
      if (this.reports.length === 0) {
        alert("No report to export");
        return;
      }
      const report = this.reports[0];
      const doc = new jsPDF();

      doc.setFontSize(18);
      doc.text('Detalles del reporte', 20, 20);

      const headers = [
        ['Detalle', 'Información']
      ];
      const data = [
        [this.certificateNumberHeader, report.certificationNumber],
        [this.cylinderNumberHeader, report.cylinderNumber],
        [this.vehicleIdentifierHeader, report.vehicleIdentifier],
        [this.brandHeader, report.brand],
        [this.madeDateHeader, report.madeDate],
        [this.emitDateHeader, report.emitDate],
        [this.typeHeader, report.type],
        [this.operationCenterHeader, report.operationCenter]
      ];

      doc.autoTable({
        startY: 30,
        head: headers,
        body: data,
        styles: { font: 'helvetica', fontSize: 12 },
        headStyles: { fillColor: [22, 160, 133] }
      });

      doc.save('detalle-reporte.pdf');
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
}
</script>

<template>
  <div class="search-report-details-container my-8">
    <h1 class="text-sm md:text-base lg:text-2xl text-center"> {{$t('search_report_details_title')}}:</h1>
    <div class="flex flex-column lg:flex-row  gap-3">
      <pv-inputext class="custom-btn-size text-sm"  v-model="cylinderNumber" :placeholder="cylinderNumberPlaceholder" size="large"/>
      <pv-inputext class="custom-btn-size text-sm"  v-model="vehicleIdentifier" :placeholder="vehicleIdentifierPlaceholder" size="large"/>
      <pv-button @click="searchReport" size="large" severity="primary"> {{$t('search_report_details_button')}}</pv-button>
    </div>
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
    <div class="flex flex-column lg:flex-row gap-3 my-8">
      <pv-button class="text-sm lg:text-base" @click="exportCurrentReport" size="large" severity="contrast"> {{$t('export_excel_button')}} </pv-button>
      <pv-button class="text-sm lg:text-base" @click="exportData" size="large" severity="contrast"> {{$t('export_pdf')}} </pv-button>
    </div>
  </div>
</template>

<style scoped>

</style>