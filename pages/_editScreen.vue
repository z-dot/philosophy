<template>
  <div>
    <b-navbar sticky variant="info" type="dark" class="mb-3">
      <NuxtLink tag="b-navbar-brand" to="/" href="#"
        >Philosophy Helper</NuxtLink
      >
      <b-navbar-nav class="mx-auto">
        <b-nav-text>{{ save_state }}</b-nav-text>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto"> </b-navbar-nav>
      <b-button size="sm" class="ml-2 btn-light" v-on:click="toggleAdvice()">{{
        advice ? "Close advice" : "Open advice"
      }}</b-button
      ><b-button
        size="sm"
        class="ml-2 btn-light"
        v-on:click="download_as_docx()"
        >Save as .docx</b-button
      ><b-button size="sm" class="ml-2 btn-info">Give feedback</b-button
      ><b-button size="sm" class="ml-2 btn-primary" v-on:click="saveQuestion()"
        >Save</b-button
      >
    </b-navbar>
    <b-container fluid>
      <b-row>
        <b-col v-if="advice" cols="4">
          <b-card no-body>
            <b-tabs pills card>
              <b-tab title="Question advice"></b-tab>
              <b-tab title="General advice"
                ><div v-html="general_advice"></div
              ></b-tab>
            </b-tabs>
          </b-card>
        </b-col>
        <b-col>
          <b-container>
            <h2 class="text-center">
              {{ current_question.question_data.question }}
            </h2>
            <Editor ref="editor" />
          </b-container>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import { mapMutations, mapActions } from "vuex";
import * as docx from "docx";
import * as he from "he";
import { saveAs } from "file-saver";

export default {
  data() {
    return {
      advice: true,
      save_state: "Unsaved",
      check_saved_interval: undefined,
      saving_interval: undefined,
    };
  },
  methods: {
    toggleAdvice() {
      this.advice = !this.advice;
    },
    saveQuestion() {
      this.$store.state.editor.save().then((data) => {
        this.$store.commit("change_richtext_and_datetime", {
          id: this.current_question.id,
          rich_text: data.blocks,
          new_date: new Date(data.time).toDateString(),
          raw: data,
        });
        localStorage.setItem(this.current_question.id, JSON.stringify(data));
      });
      this.save_state = "Saved";
    },
    async is_saved(obj) {
      let editor_blocks = await obj.$store.state.editor.save();
      if (
        JSON.stringify(
          obj.$store.state.current_question.user_data.rich_text
        ) === JSON.stringify(editor_blocks.blocks)
      ) {
        obj.save_state = "Saved";
      } else {
        obj.save_state = "Unsaved";
      }
    },
    check_is_saved() {
      var self = this;
      this.$store.commit(
        "set_checking_interval",
        setInterval(() => {
          if (this.$store.state.editor) {
            self.is_saved(self);
          }
        }, 5000)
      );
    },
    save_periodically() {
      var self = this;
      this.$store.commit(
        "set_saving_interval",
        setInterval(() => {
          if (this.$store.state.editor) {
            self.saveQuestion();
          }
        }, 30000)
      );
    },
    download_as_docx() {
      this.$store.state.editor.save().then((data) => {
        function to_section_children(ejs_object, header) {
          var output = [];
          const numbering = new docx.Numbering({
            config: [
              {
                reference: "my-numbering",
                levels: [
                  {
                    level: 0,
                    format: "decimal",
                    text: "%1)",
                    alignment: docx.AlignmentType.START,
                    style: {
                      paragraph: {
                        indent: { left: 720, hanging: 260 },
                      },
                    },
                  },
                ],
              },
            ],
          });

          output.push(
            new docx.Paragraph({
              text: header,
              heading: docx.HeadingLevel.HEADING_2,
            })
          );
          let block;
          for (block of ejs_object.blocks) {
            /* console.log(block); */
            switch (block.type) {
              case "header":
                output.push(
                  new docx.Paragraph({
                    children: item_to_text_runs(block.data.text),
                    heading: level_to_header(block.data.level),
                  })
                );
                break;
              case "list":
                /* console.log("hello", block); */
                if (block.data.style === "unordered") {
                  /* console.log(block.data); */
                  for (item of block.data.items) {
                    output.push(
                      new docx.Paragraph({
                        children: item_to_text_runs(item),
                        bullet: {
                          level: 0,
                        },
                      })
                    );
                  }
                } else {
                  temp = undefined;
                  /* console.log(block.data); */
                  for (item of block.data.items) {
                    temp = new docx.Paragraph({
                      children: item_to_text_runs(item),
                      numbering: {
                        reference: "my-numbering",
                        level: 0,
                      },
                    });
                    output.push(temp);
                  }
                }
                break;
              default:
                output.push(
                  new docx.Paragraph({
                    children: item_to_text_runs(block.data.text),
                  })
                );
                break;
            }
          }
          return output;
        }

        function level_to_header(level) {
          switch (level) {
            case 2:
              return docx.HeadingLevel.HEADING_3;
            case 3:
              return docx.HeadingLevel.HEADING_4;
            case 4:
              return docx.HeadingLevel.HEADING_5;
          }
        }

        function item_to_text_runs(text) {
          text = he.decode(text);
          var output = [];
          let current = "";
          let stack = [];
          let i;
          for (i = 0; i < text.length; i++) {
            current += text[i];
            if (current.slice(-3) === "<i>") {
              if (current.slice(0, -3).length > 0) {
                output.push(
                  new docx.TextRun({
                    text: current.slice(0, -3),
                    bold: stack.includes("b"),
                    italics: stack.includes("i"),
                  })
                );
              }
              stack.push("i");
              current = "";
            } else if (current.slice(-3) === "<b>") {
              if (current.slice(0, -3).length > 0) {
                output.push(
                  new docx.TextRun({
                    text: current.slice(0, -3),
                    bold: stack.includes("b"),
                    italics: stack.includes("i"),
                  })
                );
              }
              stack.push("b");
              current = "";
            } else if (
              current.slice(-4) === "</b>" ||
              current.slice(-4) === "</i>"
            ) {
              if (current.slice(0, -4).length > 0) {
                output.push(
                  new docx.TextRun({
                    text: current.slice(0, -4),
                    bold: stack.includes("b"),
                    italics: stack.includes("i"),
                  })
                );
              }
              stack.pop();
              current = "";
            } else if (current.slice(-4) === "<br>") {
              current = current.slice(0, -4);
            }
          }
          if (current.length > 0) {
            output.push(
              new docx.TextRun({
                text: current,
                bold: stack.includes("b"),
                italics: stack.includes("i"),
              })
            );
          }
          /* console.log(output); */
          return output;
        }

        var doc = new docx.Document({
          numbering: {
            config: [
              {
                reference: "my-numbering",
                levels: [
                  {
                    level: 0,
                    format: "decimal",
                    text: "%1)",
                    alignment: docx.AlignmentType.START,
                    style: {
                      paragraph: {
                        indent: { left: 720, hanging: 260 },
                      },
                    },
                  },
                ],
              },
            ],
          },
        });
        doc.addSection({
          properties: {},
          children: to_section_children(
            data,
            this.$store.state.current_question.question_data.question
          ),
        });
        docx.Packer.toBlob(doc).then((blob) =>
          saveAs(
            blob,
            this.$store.state.current_question.question_data.question + ".docx"
          )
        );
      });
    },
  },
  computed: {
    current_question() {
      /* console.log("EHFJDAK"); */
      /* console.log(this.$store.state.current_question); */
      return this.$store.state.current_question;
    },
    general_advice() {
      return this.$store.state.general_advice;
    },
  },
  mounted() {
    /* console.log("THIS RUNS"); */
    this.$store.dispatch("get_user_questions");
    let question;
    for (question of this.$store.state.user_questions) {
      if (question.id.toString() === this.$route.path.slice(1)) {
        /* console.log(question.id.toString()); */
        this.$store.commit("modify_current_question", question);
        this.$refs.editor.startEditor(
          this.$store.state.current_question.raw_user_data
        );
        break;
      }
    }
    this.check_is_saved();
    this.save_periodically();
  },
};
</script>