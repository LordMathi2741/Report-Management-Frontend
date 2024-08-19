<script>
export default {
  name: 'option-search-card'
}
</script>

<template>
   <div class="option-search-container bg-white border-round-lg flex flex-column  lg:flex-row gap-5">
     <div class="flex flex-column justify-content-center align-items-center gap-4 xl:mx-7">
       <h2 class="text-xs md:text-base lg:text-2xl "> {{$t('operation_center_option')}} </h2>
       <router-link to="/search">
         <img src="../assets/operation-center-banner.png" alt="Search by Name" class="w-5rem md:w-10rem"/>
       </router-link>
     </div>
     <div class=" flex flex-column gap-4 justify-content-center align-items-center">
       <h2 class="text-xs md:text-base lg:text-2xl "> {{$t('pec_option')}} </h2>
       <router-link to="/search-pec">
         <img src="../assets/pec-banner.png" alt="Search by Name" class="w-5rem md:w-10rem"/>
       </router-link>
     </div>
     <div class="flex flex-column gap-4 justify-content-center align-items-center">
       <h2 class=" text-xs md:text-base lg:text-2xl"> {{$t('modules_option')}} </h2>
       <router-link to="/search-pec">
         <img src="../assets/roadstreet-banner.png" alt="Search by Name" class="w-5rem md:w-10rem "/>
       </router-link>
     </div>
   </div>
</template>

<style scoped>
  img:hover {
    transform: scale(1.1);
    border: #181818 solid 5px;
    transition: transform 2s;
  }
  .option-search-container{
    display: grid;
    justify-content: center;
    place-items: center;
    padding: 40px;
    width: 60%;
  }

  @media (width<=1525){
    .option-search-container{
      width: 70%;
    }
  }

  @media (width<=786){
    .option-search-container{
      width: 80%;
    }
  }
  @media (width<=687){
    .option-search-container{
      width: 90%;
    }
  }
  @media (width<=576){
    .option-search-container{
      width: 100%;
    }
  }

  @media (width<=320){
    .option-search-container{
      width: 120%;
    }
  }

</style>