<script>


import UserService from '@/helpers/user.service.js'
import { UserDTO } from '@/models/userDTO.model.js'
import * as XLSX from 'xlsx'
import { isTokenExpired } from '@/helpers/verify-token.service.js'

export default {
  name: 'users-registered-details',
  data(){
    return{
      users: [],
      role: null
    }
  },
  methods:{
    async getUsers(){
      try{
        const response = await UserService.getAllUsers();
        this.users = response.data.map(user =>
          new UserDTO(user.username, user.email, user.role, user.ruc, user.socialReason)
        );
      } catch (e){
        throw new Error(`An error occurred while fetching users ${e}`);
      }
    },
    exportToExcel(){
      const ws_name = "User Information";
      const wb = XLSX.utils.book_new();
      const ws_data = [
        ["Username", "Email", "Role", "RUC", "Social Reason"],
        ...this.users.map(user => [user.username, user.email, user.role, user.ruc, user.socialReason])
      ];
      const ws = XLSX.utils.aoa_to_sheet(ws_data);
      XLSX.utils.book_append_sheet(wb, ws, ws_name);
      XLSX.writeFile(wb, "users-registered.xlsx");
    },
  },


  mounted() {
    const token = JSON.parse(sessionStorage.getItem('token'));
    if (token && isTokenExpired(token)) {
      sessionStorage.removeItem("token");
      alert("Your token is expired, please sign in again");
      this.$router.push('/sign-in').then(() => {
        window.location.reload();
      })
    }
    else{
      this.getUsers();
    }

  }
}
</script>

<template>
  <div class="user-table-container">
    <div class="mx-2">
      <pv-button label="Exportar a Excel" icon="pi pi-file-excel" class="p-button-success" @click=this.exportToExcel />
    </div>
   <div v-if="users.length" class="mt-5">
     <pv-datatable  :value="users" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
       <pv-column field="username" header="Username"></pv-column>
       <pv-column field="email" header="Email"></pv-column>
       <pv-column field="role" header="Role"></pv-column>
       <pv-column field="ruc" header="RUC"></pv-column>
       <pv-column field="socialReason" header="Social Reason"></pv-column>
     </pv-datatable>
    </div>
    <div v-else>
      No hay usuarios registrados
    </div>
  </div>
</template>

<style scoped>
.user-table-container{
  margin-top: 200px;
  height: 100vh;
}
</style>