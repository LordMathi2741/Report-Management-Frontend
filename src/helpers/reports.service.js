import BaseService from '@/service/http-common.service.js'

class ReportsService {
   getReportByType(type){
      return BaseService.get(`/Reports/${type}`);
   }
   getAllReports(){
      return BaseService.get(`/Reports`);
   }
}

export default  ReportsService