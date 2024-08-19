<script setup>


import FooterContent from '@/public/footer-content.component.vue'
import ToolbarContent from '@/public/toolbar-content.component.vue'
</script>

<template>
  <toolbar-content/>
 <router-view/>
  <div class="footer-manager">
    <footer-content/>
  </div>
</template>

<style scoped>

</style>
