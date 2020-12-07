<template>
  <b-card no-body>
    <b-card-body>
      <div class="distribute">
        <NuxtLink :to="question.id.toString()" tag="a">
          <b-card-text>{{ question.question_data.question }}</b-card-text>
        </NuxtLink>
      </div>
    </b-card-body>
    <div style="padding: 5px">
      <hr />
      <a
        href="#"
        v-for="tag in question.question_data.tags"
        v-bind:key="tag.key"
        class="mx-1"
        v-on:click="$nuxt.$emit('change-search', '#' + tag.text)"
        ><b-badge variant="secondary">{{ tag.text }}</b-badge>
      </a>
    </div>
    <template #footer>
      <small class="text-muted">{{ question.user_data.datetime }}</small>
    </template>
  </b-card>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  props: {
    question: {
      type: Object,
      required: true,
    },
  },
  methods: {
    change_current_question() {
      /* console.log("HEREEEEEE"); */
      this.$store.modify_current_question(this.question);
      /* console.log("THERREEEE"); */
      /* console.log("WHEREVER YOU AREEEEEE"); */
    },
  },
};
</script>

<style scoped>
.distribute {
  height: 100%;
  width: 100%;
  flex: 1;
  align-content: space-between;
}

.box {
  display: flex;
  min-height: min-content;
}

.boxbox {
  flex: 1;
  display: flex;
  overflow: auto;
  width: 100%;
}

/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>