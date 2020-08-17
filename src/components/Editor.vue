<template>
  <MonacoEditor
    ref="monaco"
    v-model="text"
    theme="Tomorrow-Night-Eighties"
    language="javascript"
    :options="options" />
</template>

<script>
import MonacoEditor from 'vue-monaco';
import { throttle } from 'lodash';
import TomorrowNightEighties from '@/Tomorrow-Night-Eighties.json';

export default {
  components: {
    MonacoEditor
  },

  props: {
    value: String
  },

  data() {
    return {
      options: {
        automaticLayout: false,
        renderLineHighlight: 'none',
        currentLines: false,
        scrollBeyondLastLine: false,
        lineNumbers: 'off',
        folding: false,
        minimap: {
          enabled: false
        }
      }

    };
  },

  computed: {
    text: {
      get() {
        return this.value;
      },

      set(val) {
        this.$emit('input', val);
      }
    },

    editor() {
      return this.$refs.monaco.getEditor();
    }
  },

  mounted() {
    this.$refs.monaco.monaco.editor.defineTheme('Tomorrow-Night-Eighties', TomorrowNightEighties);
    this.$refs.monaco.monaco.editor.setTheme('Tomorrow-Night-Eighties');
    this.$refs.monaco.editor.getModel().updateOptions({ tabSize: 2 });

    // Fit editor to parent
    let sizeObserver = new ResizeObserver(this.handleResize);
    sizeObserver.observe(this.$refs.monaco.$el.parentElement);
  },

  methods: {
    undo() {
      this.editor.trigger('source', 'undo');
    },

    redo() {
      this.editor.trigger('source', 'redo');
    },

    cut() {
      this.editor.focus();
      document.execCommand('cut');
    },

    copy() {
      this.editor.focus();
      document.execCommand('copy');
    },

    paste() {
      this.editor.focus();
      document.execCommand('paste');
    },

    handleResize: throttle(function(entries) {
      let { contentRect } = entries[entries.length - 1];
      if (this.$refs.monaco) {
        this.$refs.monaco.$el.style.width = `${contentRect.width}px`;
        this.$refs.monaco.$el.style.height = `${contentRect.height}px`;
        this.$refs.monaco.getEditor().layout();
      }
    }, 5)
  }
};
</script>

<style>
.monaco-editor {
  padding-top: 10px;
}

.monaco-editor .decorationsOverviewRuler {
  display: none;
}
</style>
