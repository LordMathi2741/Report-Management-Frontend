import BaseService from '@/service/http-common.service.js'
class ReportsService {
  reportExistsByImgByCertifiedNumberAndCylinderNumberAndEmitDateAndVehicleIdentifier(certifiedNumber,
  cylinderNumber, emitDate, vehicleIdentifier){
     return BaseService.get('/Reports/img/'+certifiedNumber+'/'+cylinderNumber+'/'+emitDate+'/'+vehicleIdentifier)
  }
  reportExistsByImgByCertifiedNumberAndCylinderNumberAndEmitDateAndBrand(certifiedNumber,
                                                                                     cylinderNumber, emitDate, brand){
    return BaseService.get('/Reports/img/pec/'+certifiedNumber+'/'+cylinderNumber+'/'+emitDate+'/'+brand)
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
  static getReportByCylinderNumber(cylinderNumber){
    return BaseService.get('Reports/get-by-cylinder-number/'+cylinderNumber)
  }
  static getReportByVehicleIdentifier(vehicleIdentifier){
    return BaseService.get('Reports/get-by-vehicle-identifier/'+vehicleIdentifier)
  }
  static getAllReports(){
    return BaseService.get('Reports')
  }
  static countTotalReportsByYear(year){
    return BaseService.get('Reports/countTotalReportsByYear/'+year)
  }
}

export default  ReportsService