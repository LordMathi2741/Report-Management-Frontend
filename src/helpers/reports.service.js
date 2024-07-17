import BaseService from '@/service/http-common.service.js'

class ReportsService {
  reportExistsByImgByCertifiedNumberAndCylinderNumberAndEmitDateAndVehicleIdentifier(certifiedNumber,
  cylinderNumber, emitDate, vehicleIdentifier){
     return BaseService.get('/Reports/img/'+certifiedNumber+'/'+cylinderNumber+'/'+emitDate+'/'+vehicleIdentifier)
  }
  static countReportsByBrandAndYear(brand,year){
      return BaseService.get('/Reports/brand/'+brand +'/'+year)
  }
}

export default  ReportsService