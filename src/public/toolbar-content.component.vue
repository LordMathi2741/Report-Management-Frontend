<script>
import userService from '@/helpers/user.service.js'

export default {
  name: 'toolbar-content',
  data(){
    return {
      currentUserName : JSON.parse(sessionStorage.getItem('user'))?.username,
      items: [
        {
          label: 'Sign in',
          icon: 'pi pi-sign-in',
          command: () => this.navigate('/sign-in')
        },
        {
          label: 'Search',
          icon: 'pi pi-search',
          command: () => this.navigate('/report-options-search')
        },
        {
          label: 'My Profile',
          icon: 'pi pi-user',
          command: () => this.navigate('/profile')
        }
      ],
      languages: [
        {label: 'English', icon: 'pi pi-flag-search_report_details_en', command: () => this.changeLanguage('en')},
        {label: 'Spanish', icon: 'pi pi-flag-search_report_details_es', command: () => this.changeLanguage('es')}
      ],
      currentUserType: " "
    }
  },
  methods: {
    toggle(event) {
      this.$refs.menu.toggle(event);
    },
    languageToggle(event) {
      this.$refs.global.toggle(event);
    },
    navigate(path){
      this.$router.push(path)
    },
    changeLanguage(lang){
      this.$i18n.locale = lang;
    }
  },
  mounted() {
    userService.getCurrentRole(JSON.parse(sessionStorage.getItem('user'))?.username).then((response) => {
      this.currentUserType = response.data;
    })
  }
}
</script>

<template>
   <div class="toolbar-manager flex justify-content-between bg-white p-5" aria-label="Toolbar content">
       <div class="text-white flex flex-column gap-2" aria-label="Company logo">
         <img  src="https://hiperfast.pe/images/logo-hiperfast.png" class="logo-size" alt="Brand logo"/>
         <img src="../assets/schedule-banner.jpeg" class="schedule-img lg:hidden"  alt="Schedule"/>
       </div>
       <img src="../assets/schedule-banner.jpeg" class="hidden lg:block schedule-img"  alt="Schedule"/>
        <div class="hidden xl:block ">
          <ul class="flex flex-column lg:flex-row gap-3 sm:text-base md:text-lg">
            <router-link class="router-style pl-3 pr-3" to="/report-options-search" aria-label="Go to search report pdf section">
              <li class="text-black-alpha-90 hover:text-green-700">{{$t('search_section')}} </li>
            </router-link>
            <router-link class="router-style pl-1 pr-1" to="/profile" aria-label="Go to my profile section">
              <li class="text-black-alpha-90 hover:text-green-700"> {{$t('profile_section')}} </li>
            </router-link>
            <li >
              <pv-button severity="contrast" icon="pi pi-globe" type="button" @click="languageToggle" aria-haspopup="true" aria-controls="overlay_menu" />
              <pv-menu ref="global" id="overlay_menu" :model="languages" :popup="true" />
            </li>
            <li class="flex flex-column gap-1"  v-if="currentUserName" aria-label="Username details">
              <pv-button class="mx-auto" icon="pi pi-user" severity="contrast" rounded aria-label="User" />
              <p class="text-black-alpha-90 text-center">{{currentUserName}}</p>
            </li>
            <li v-else>
              <router-link class="router-style" to="/sign-in" aria-label="Go to sign in section">
                <pv-button severity="contrast" class="text-white" aria-label="Sign in button">{{$t('sign_in_section')}}</pv-button>
              </router-link>
            </li>
            <li v-if="currentUserType === 'Admin'">
              <router-link class="router-style" to="/report-chart" aria-label="Go to admin section">
                <pv-button severity="contrast" class="text-white" aria-label="Admin button"> {{$t('report_list')}} </pv-button>
              </router-link>
            </li>

          </ul>
        </div>
     <div class="block xl:hidden card flex flex-column gap-2 justify-center">
       <div class="mx-auto">
         <pv-button severity="contrast" icon="pi pi-globe" type="button" @click="languageToggle" aria-haspopup="true" aria-controls="overlay_menu" />
         <pv-menu ref="global" id="overlay_menu" :model="languages" :popup="true" />
       </div>
       <div class="mx-auto">
         <pv-button severity="contrast" class="h-2rem" type="button" icon="pi pi-bars" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" />
         <pv-menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
       </div>
       <div v-if="currentUserType === 'Admin'" class="mx-auto">
         <router-link class="router-style" to="/report-chart" aria-label="Go to admin section">
           <pv-button severity="contrast" class="text-white report-section-btn text-sm" aria-label="Lists reports button"> {{$t('report_list')}} </pv-button>
         </router-link>
       </div>
     </div>

   </div>
</template>

<style scoped>

</style>