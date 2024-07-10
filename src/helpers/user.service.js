import BaseService from '@/service/http-common.service.js'

class UserService{
   getUserByEmailAndPassword(email, password){
      return BaseService.get(`/Users/${email}/${password}`);
   }
   signUpUser(user){
      return BaseService.post(`/Users`, user);
   }
}

export default UserService;