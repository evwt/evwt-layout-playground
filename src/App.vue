<template>
  <ev-layout :layout="pane">
    <template v-slot:playground-header>
      <div class="flex-space d-flex flex-grow flex-center flex-middle">
        <div class="editor-header m-w-xxs">
          <select v-model="selected" class="w-100 p-xxs m-s-xs m-n-xs">
            <option value="TwoPaneSidebarMain">
              2-pane – Sidebar/Main
            </option>
            <option value="TwoPaneToolbarMain">
              2-pane – Toolbar/Main
            </option>
            <option value="ThreePaneToolbarSidebarMain">
              3-pane – Toolbar/Sidebar/Main
            </option>
            <option value="ThreePaneThreeColumn">
              3-pane – Activities/Sidebar/Main
            </option>
            <option value="FourPane1">
              4-pane – Toolbar/Sidebar/Main/Detail
            </option>
            <option value="FourPane2">
              4-pane – Activities/Sidebar/Editor/Detail
            </option>
            <option value="FivePaneCreative">
              5-pane – Tools/Mains/Panels
            </option>
            <option value="custom">
              Custom
            </option>
          </select>
        </div>

        <div>
          <a href="/">
            EVWT Layout Playground
          </a>
        </div>

        <div class="p-e-xs">
          <a href="https://evwt.net/#/EvLayout" target="_blank">
            Documentation
          </a>
          •
          <a href="https://github.com/evwt/evwt" target="_blank">
            Github
          </a>
        </div>
      </div>
    </template>
    <template v-slot:playground-editor>
      <Editor ref="editor" v-model="text" @keyup.native="handleKeyup" />
    </template>
    <template v-slot:playground-preview>
      <Preview
        v-if="showPreview"
        v-model="text"
        :initial-x="initialX"
        :initial-y="initialY"
        :initial-width="initialWidth"
        :initial-height="initialHeight" />
    </template>
  </ev-layout>
</template>

<script>
import { jsonQueryStringifyObjectBare, jsonQueryParseObjectBare } from 'json-query-string';
import EvLayout from 'evwt.evlayout';
import Editor from '@/components/Editor';
import Preview from '@/components/Preview';
import TwoPaneSidebarMain from '@/presets/TwoPaneSidebarMain.json';
import TwoPaneToolbarMain from '@/presets/TwoPaneToolbarMain.json';
import ThreePaneToolbarSidebarMain from '@/presets/ThreePaneToolbarSidebarMain.json';
import ThreePaneThreeColumn from '@/presets/ThreePaneThreeColumn.json';
import FourPane1 from '@/presets/FourPane1.json';
import FourPane2 from '@/presets/FourPane2.json';
import FivePaneCreative from '@/presets/FivePaneCreative.json';

export default {
  name: 'App',

  components: {
    EvLayout,
    Editor,
    Preview
  },

  data() {
    return {
      examples: {
        TwoPaneSidebarMain,
        TwoPaneToolbarMain,
        ThreePaneToolbarSidebarMain,
        ThreePaneThreeColumn,
        FourPane1,
        FourPane2,
        FivePaneCreative
      },
      selected: 'TwoPaneSidebarMain',
      showPreview: false,
      initialX: 0,
      initialY: 0,
      initialWidth: 720,
      initialHeight: 480,
      text: '',
      pane: {
        direction: 'row',
        sizes: ['auto', '1fr'],
        panes: [
          {
            name: 'playground-header',
            resizable: false
          },
          {
            direction: 'column',
            sizes: ['350px', '2fr'],
            panes: [
              {
                name: 'playground-editor',
                minSize: 250
              },
              {
                name: 'playground-preview',
                minSize: 250
              }
            ]
          }
        ]
      }
    };
  },

  watch: {
    selected: {
      initial: true,
      handler() {
        if (this.selected === 'custom') return;

        this.text = JSON.stringify(this.examples[this.selected], null, 2);
      }
    },

    text: {
      initial: true,
      handler() {
        try {
          let params = jsonQueryStringifyObjectBare(JSON.parse(this.text));
          window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
        } catch (error) {}
      }
    }
  },

  mounted() {
    try {
      let parsedFromUrl = jsonQueryParseObjectBare(window.location.search.substr(1));
      let start = jsonQueryStringifyObjectBare(TwoPaneSidebarMain);
      if (Object.keys(parsedFromUrl).length && window.location.search.substr(1) !== start) {
        this.text = JSON.stringify(parsedFromUrl, null, 2);
        this.selected = 'custom';
      }
    } catch (error) {
    }

    if (!this.text) {
      this.text = JSON.stringify(TwoPaneSidebarMain, null, 2);
    }

    let previewEl = document.querySelector('.ev-pane-playground-preview');
    this.initialX = previewEl.offsetWidth / 2 - (this.initialWidth / 2);
    this.initialY = previewEl.offsetHeight / 2 - (this.initialHeight / 2) - 20;
    this.showPreview = true;
  },

  methods: {
    handleKeyup(e) {
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      if (e.key === 'Alt' || e.key === 'Control' || e.key === 'Meta' || e.key === 'Shift') return;
      this.selected = 'custom';
    }
  }
};
</script>

<style lang="scss">
body,
html {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  color: #2f2f2f;
}

body,
input,
textarea {
  font-family: system-ui;
}

textarea {
  width: 100%;
  height: 100%;
  border: 0;
  border-radius: 0;
}

a {
  text-decoration: none;
  color: inherit;
}

.ev-pane-playground-header {
  background: #000;
  color: #fff;
  letter-spacing: 0.6px;
  font-weight: 400;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;

  .ev-layout-pane {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
  }
}

.ev-pane-playground-preview {
  background-size: 20px 20px;
  background-image: radial-gradient(circle, #aaa 1px, transparent 1px);
  background-color: #bbb;
  box-shadow: inset 0 0 44px -25px #000000;
}

.ev-pane-playground-preview > .ev-layout-pane {
  overflow: visible;
}

.ev-pane-playground-editor {
  background: #3f3f3f;
}

.editor-header {
  text-align: center;
}

.ev-pane-playground-editor > .ev-layout-pane > div {
  width: 100%;
  height: 100%;
}
</style>
