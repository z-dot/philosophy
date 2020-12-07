<template>
  <div class="editorjs mx-auto" id="editorjs"></div>
</template>

<script>
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
export default {
  data() {
    return {
      value: null,
    };
  },
  /* props: {
    config: {
        type: Object,
        required: false,
        default: function() {return {
          holder: "editorjs",
          tools: {
            list: List,
            header: {
              class: Header,
              config: {
                placeholder: "Header",
                levels: [2, 3, 4],
                defaultLevel: 2,
              }
            }
          },
          autofocus: true,
          placeholder: "Write here!"
        }}
      },
    data: {
      type: Object,
      required: false,
      default: function () {
        return {};
      },
    },
  }, */
  methods: {
    startEditor: function (data) {
      this.destroyEditor();
      window.editor = new EditorJS({
        holder: "editorjs",
        tools: {
          list: List,
          header: {
            class: Header,
            config: {
              placeholder: "Header",
              levels: [2, 3, 4],
              defaultLevel: 2,
            },
          },
        },
        autofocus: true,
        placeholder: "Write here!",
        data: data,
      });
    },
    save: function () {
      return window.editor.save();
    },
    destroyEditor() {
      if (window.editor) {
        window.editor.destroy();
        window.editor = null;
      }
    },
  },
};
</script>

<style scoped>
</style>
