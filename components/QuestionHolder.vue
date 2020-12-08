<template>
  <b-container>
    <b-row cols="4" align-content="center" align-h="center">
      <QuestionCard
        v-for="question of questions"
        :question="question"
        v-bind:key="question.id"
      />
    </b-row>
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
