import BaseService from '@/service/http-common.service.js'

class ReportsService {
   getReportImageByType(type){
      return BaseService.get(`/Reports/img/${type}`);
   }
   getAllReports(){
      return BaseService.get(`/Reports`);
   }
}

export default  ReportsService