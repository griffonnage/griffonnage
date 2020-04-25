<template>
  <div>
    <b-field>
      <b-input
        v-model="newMessage"
        :placeholder="$t('chat.newMessage')"
        type="text"
        icon-pack="fas"
        icon="paper-plane"
        expanded
        @keyup.native.enter="send"
      />
      <p class="control">
        <button
          class="button is-primary"
          :disabled="newMessage.length === 0"
          @click="send"
        >
          {{ $t('chat.send') }}
        </button>
      </p>
    </b-field>

    <article
      v-for="(m, i) in messages"
      :key="i"
      :data-message="`message-${i}`"
      class="media"
    >
      <div class="media-content">
        <div class="content">
          <p>
            <strong>{{ m.username }}</strong>
            <small>{{ $d(new Date(m.datetime), 'long') }}</small>
            <br />
            <span>{{ m.content }}</span>
          </p>
        </div>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    messages: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      newMessage: '',
    }
  },

  methods: {
    send(): void {
      if (this.newMessage !== '') {
        this.$emit('new-message', this.newMessage)
        this.newMessage = ''
      }
    },
  },
})
</script>
