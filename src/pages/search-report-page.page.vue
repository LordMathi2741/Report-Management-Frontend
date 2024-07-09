<script>
import SearchReportOptions from '@/components/search-report-options.component.vue'

export default {
  name: 'search-report-page',
  components: { SearchReportOptions }
}
</script>

<template>
  <div class="modifiable md:text-sm sm:text-xs text-cyan-600">
    <h1> Reports Management Screen </h1>
    <search-report-options/>
  </div>
</template>

<style scoped>

</style>