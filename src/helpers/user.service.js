import BaseService from '@/service/http-common.service.js'

class UserService{

   signInUser(email, password){
      return BaseService.get(`/Users/sign-in/${email}/${password}`);
   }
   signUpUser(user){
      return BaseService.post(`/Users/sign-up`, user);
   }
   getUserNameByEmail(email){
      return BaseService.get(`/Users/getUsername/${email}`);
   }
  static getCurrentRole(username){
      return BaseService.get(`/Users/getUserRoleByUsername/${username}`);
   }

   static  getAllUsers(){
     return BaseService.get('/Users')
   }

}

export default UserService;