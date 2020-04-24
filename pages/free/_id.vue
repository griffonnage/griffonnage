<template>
  <div>
    <section class="hero is-fullheight-with-navbar">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column is-half is-offset-one-quarter">
              <drawing-section :room="room" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import DrawingSection from '~/components/DrawingSection.vue'

export default Vue.extend({
  components: {
    DrawingSection,
  },

  asyncData({ route }) {
    const room = route.params.id
    return {
      room,
    }
  },
})
</script>
