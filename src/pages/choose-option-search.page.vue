<script>
import OptionSearchCard from '@/components/option-search-card.component.vue'

export default {
  name: 'choose-option-search',
  components: { OptionSearchCard }
}
</script>

<template>
  <div class="choose-option-container" aria-label=" Choose option to Search section content">
    <div class="choose-options-manager flex  justify-content-center align-items-center lg:ml-8 gap-8 flex-column">
      <h2 class="text-xs md:text-base lg:text-2xl text-center text-white  "> {{$t('choose_option_title')}} </h2>
      <option-search-card/>
    </div>
  </div>
</template>

<style scoped>
.choose-options-manager {
  margin-top:  300px;
}
</style>