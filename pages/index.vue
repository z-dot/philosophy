<template>
  <div>
    <b-navbar sticky variant="info" type="dark" class="mb-3">
      <b-navbar-brand>Philosophy Helper</b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <b-nav-form v-on:submit="updateSearchTerms" ref="searchForm">
          <b-form-input
            placeholder="Enter search term"
            size="sm"
            id="search"
            name="search"
            v-model="search_input"
          ></b-form-input>
          <b-button
            size="sm"
            type="submit"
            class="ml-2 btn-light"
            name="search-submit"
            id="search-submit"
            >Search</b-button
          >
        </b-nav-form>
      </b-navbar-nav>
    </b-navbar>
    <QuestionHolder
      v-on:change-search="/* console.log('HELLO WORLDDD') */"
      :questions="filtered_questions"
    />
  </div>
</template>
<script>
import { mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      search_term: "",
      search_input: "",
    };
  },
  computed: {
    user_questions() {
      return this.$store.state.user_questions;
    },
    filtered_questions() {
      if (this.search_term === "") {
        return this.$store.state.user_questions;
      }
      let search_terms_list = this.search_term.split(" ");
      let temp_questions = [];
      let valid = true;
      let question;
      let term;
      for (question of this.$store.state.user_questions) {
        valid = true;
        for (term of search_terms_list) {
          if (term.startsWith("#")) {
            /* console.log(question.question_data.tags, term, term.slice(1) ); */
            if (
              !question.question_data.tags
                .map((x) => x.text)
                .includes(term.slice(1))
            ) {
              valid = false;
              break;
            }
          } else {
            if (!question.question_data.question.includes(term)) {
              valid = false;
              break;
            }
          }
          if (valid) {
            temp_questions.push(question);
          }
        }
      }
      return temp_questions;
    },
  },
  methods: {
    updateSearchTerms(e) {
      /* console.log(e); */
      this.search_term = this.search_input;
      e.preventDefault();
    },
    changeSearch(term) {
      /* console.log("KLDFFJDJSDLJL"); */
      this.search_input = term;
      this.search_term = term;
    },
  },
  created() {
    if (this.$store.state.editor) {
      this.$store.commit("modify_editor", undefined);
    }
    this.$nuxt.$on("change-search", (term) => {
      this.changeSearch(term);
    });
  },
  mounted: function () {
    /* console.log("THIS RUNS"); */
    this.$store.dispatch("get_user_questions");
  },
};
</script>
