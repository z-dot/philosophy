<template>
  <b-container>
    <b-card-group deck>
      <QuestionCard
        v-for="question of questions"
        :question="question"
        v-bind:key="question.id"
      />
    </b-card-group>
  </b-container>
</template>
<script>
export default {
  props: {
    questions: {
      type: Array,
      required: true,
    },
  },
};
</script>
