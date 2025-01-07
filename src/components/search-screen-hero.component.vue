<script>
export default {
  name: 'search-screen-hero',
  props : {
    title:{
      type: String,
      required: true
    },
    subtitle:{
      type: String,
      required: true
    }
  }
}
</script>

<template>
   <div class="flex flex-column gap-3 justify-content-center my-8">
     <h2 class="mt-5  lg:mt-0 text-white text-justify lg:text-center text-md md:text-base lg:text-xl xl:text-2xl">{{title}} </h2>
     <h2 class="text-white w-20rem lg:w-full text-md md:text-base lg:text-xl xl:text-2xl"> {{subtitle}}</h2>
   </div>
</template>

<style scoped>

</style>