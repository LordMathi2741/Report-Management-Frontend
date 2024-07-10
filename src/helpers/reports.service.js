import BaseService from '@/service/http-common.service.js'

class ReportsService {
  getReportImgByCertifiedNumberAndCylinderNumberAndEmitDateAndVehicleIdentifier(certifiedNumber,
  cylinderNumber, emitDate, vehicleIdentifier){
     return BaseService.get('/Reports/img/'+certifiedNumber+'/'+cylinderNumber+'/'+emitDate+'/'+vehicleIdentifier)
  }
}

export default  ReportsService