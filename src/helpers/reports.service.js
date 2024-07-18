import BaseService from '@/service/http-common.service.js'
class ReportsService {
  reportExistsByImgByCertifiedNumberAndCylinderNumberAndEmitDateAndVehicleIdentifier(certifiedNumber,
  cylinderNumber, emitDate, vehicleIdentifier){
     return BaseService.get('/Reports/img/'+certifiedNumber+'/'+cylinderNumber+'/'+emitDate+'/'+vehicleIdentifier)
  }
  static countReportsByBrandAndYear(brand,year){
      return BaseService.get('/Reports/brand/'+brand +'/'+year)
  }
  static countReportsByOperationCenterAndYear(year,month){
      return BaseService.get('/Reports/getTotalReportsByOperationCenterByYearAndMonth/'+year+'/'+month)
  }
  static countReportsTypeByYearAndMonth(year,month){
      return BaseService.get('/Reports/countReportsTypeByYearAndMonth/'+year+'/'+month)
  }
}

export default  ReportsService