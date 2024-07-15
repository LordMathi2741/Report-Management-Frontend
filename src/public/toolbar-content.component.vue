<script>
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
          command: () => this.navigate('/search')
        },
        {
          label: 'My Profile',
          icon: 'pi pi-user',
          command: () => this.navigate('/profile')
        }
      ],
      languages: [
        {label: 'English', icon: 'pi pi-flag-en', command: () => this.changeLanguage('en')},
        {label: 'Spanish', icon: 'pi pi-flag-es', command: () => this.changeLanguage('es')}
      ]
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
  }
}
</script>

<template>
   <div class="toolbar-manager flex justify-content-between bg-white p-5" aria-label="Toolbar content">
       <div class="text-white flex flex-column gap-2" aria-label="Company logo">
         <img  src="https://hiperfast.pe/images/logo-hiperfast.png" class="logo-size" alt="Brand logo"/>
         <img src="https://hiperfast.pe/images/encabezado_pagina_555.jpg" class="schedule-img lg:hidden"  alt="Schedule"/>
       </div>
       <img src="https://hiperfast.pe/images/encabezado_pagina_555.jpg" class="hidden lg:block schedule-img"  alt="Schedule"/>
        <div class="hidden t lg:block">
          <ul class=" flex  flex-column md:flex-row gap-3 sm:text-base md:text-lg">
            <router-link class="router-style" to="/sign-in" aria-label="Go to sign in section">
              <li class="text-black-alpha-90"> {{$t('sign_in_section')}}</li>
            </router-link>
            <router-link class="router-style" to="/search" aria-label="Go to search report pdf section">
              <li class="text-black-alpha-90">{{$t('search_section')}} </li>
            </router-link>
            <router-link class="router-style" to="/profile" aria-label="Go to my profile section">
              <li class="text-black-alpha-90"> {{$t('profile_section')}} </li>
            </router-link>
            <li >
              <pv-button severity="contrast" icon="pi pi-globe" type="button" @click="languageToggle" aria-haspopup="true" aria-controls="overlay_menu" />
              <pv-menu ref="global" id="overlay_menu" :model="languages" :popup="true" />
            </li>
            <li v-if="currentUserName" aria-label="Username details">
              <pv-button icon="pi pi-user" severity="contrast" rounded aria-label="User" />
              <p class="text-black-alpha-90">{{currentUserName}}</p>
            </li>
            <li v-else>
              <router-link class="router-style" to="/sign-in" aria-label="Go to sign in section">
                <pv-button severity="contrast" class="text-white" aria-label="Sign in button">{{$t('sign_in_section')}}</pv-button>
              </router-link>
            </li>

          </ul>
        </div>
     <div class="block lg:hidden card flex flex-column gap-2 justify-center">
       <div>
         <pv-button severity="contrast" icon="pi pi-globe" type="button" @click="languageToggle" aria-haspopup="true" aria-controls="overlay_menu" />
         <pv-menu ref="global" id="overlay_menu" :model="languages" :popup="true" />
       </div>
       <pv-button severity="contrast" class="h-2rem" type="button" icon="pi pi-bars" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" />
       <pv-menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
     </div>

   </div>
</template>

<style scoped>

</style>