import BaseService from '@/service/http-common.service.js'

class ReportImgService{
  getReportImgByFileName(filename){
      return BaseService.get(`/ReportsImg/${filename}`);
  }
}

export default  ReportImgService;