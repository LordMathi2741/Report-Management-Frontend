import BaseService from '@/service/http-common.service.js'

class UserService{
   getUserByEmailAndPassword(email, password){
      return BaseService.get(`/Users/${email}/${password}`);
   }
}

export default UserService;