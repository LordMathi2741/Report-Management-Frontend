<script>
export default {
  name: 'search-screen-footer',
  props: {
    content: {
      type: String,
      required: true
    },
  }
}
</script>

<template>
  <div class="my-8 search-info-container text-justify lg:mx-auto text-white text-md md:text-base lg:text-xl xl:text-2xl " aria-label="Sign up options title">
    <p>{{content}}</p>
  </div>
</template>

<style scoped>

</style>