<template>
  <vue-draggable-resizable
    ref="vdr"
    :x="roundedInitialX"
    :y="roundedInitialY"
    :w="initialWidth"
    :h="initialHeight"
    :min-width="420"
    :min-height="300"
    :parent="true"
    drag-handle=".window-header">
    <div class="window">
      <div class="window-header" />
      <div style="height: calc(100% - 32px)">
        <ev-layout
          ref="layout"
          :key="value"
          class="preview-layout"
          :layout="parsedValue(value)"
          @drag.native.prevent>
          <div v-for="slot in slotNames" :key="slot" :slot="slot">
            {{ capitalize(slot) }}
          </div>
        </ev-layout>
      </div>
    </div>
  </vue-draggable-resizable>
</template>

<script>
import EvLayout from 'evwt.evlayout';
import { capitalize } from 'lodash';

export default {
  components: {
    EvLayout
  },

  props: {
    value: String,
    initialX: Number,
    initialY: Number,
    initialWidth: Number,
    initialHeight: Number
  },

  computed: {
    roundedInitialX() {
      return (2 * Math.round(this.initialX / 2));
    },

    roundedInitialY() {
      return (2 * Math.round(this.initialY / 2));
    },

    slotNames() {
      try {
        return this.findPanes(JSON.parse(this.value));
      } catch (error) {
        return [];
      }
    },

    layoutSlots() {
      if (!this.$refs.layout) return [];
      return Object.keys(this.$refs.layout.$scopedSlots);
    }
  },

  watch: {
    value: {
      initial: true,
      async handler() {
        this.applyBackgrounds();
      }
    }
  },

  mounted() {
    this.applyBackgrounds();
  },

  methods: {
    findPanes(definition, found = []) {
      if (definition.panes) {
        for (const pane of definition.panes) {
          if (pane.name) {
            found.push(pane.name);
          }

          if (pane.panes) {
            this.findPanes(pane, found);
          }
        }
      }

      return found;
    },

    parsedValue() {
      try {
        return JSON.parse(this.value);
      } catch (error) {
        return {};
      }
    },

    async applyBackgrounds() {
      await this.$nextTick();

      try {
        let pieceSize = 10 / this.slotNames.length;

        for (let idx = 0; idx < this.slotNames.length; idx++) {
          const slotName = this.slotNames[idx];
          let el = document.querySelector(`.ev-pane-${slotName}`);
          if (!el) continue;
          el.style.backgroundColor = `hsl(155, 0%, ${85 + (pieceSize * idx)}%)`;
        }
      } catch (error) {

      }
    },

    capitalize
  }
};
</script>

<style lang="scss">
body .vdr {
  border: 0;
}

.preview-layout .ev-layout-pane {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 300;
}

.window {
  position: relative;
  height: 100%;
  width: 100%;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 20px 1em #999;
  overflow: hidden;
}

.window-header {
  background: #fafafa;
  height: 32px;
  width: 100%;
  cursor: move;
}

.window:before {
  content: '';
  position: absolute;
  height: 14px;
  width: 14px;
  margin: 10px;
  border-radius: 100%;
  background: #c4c4c4;
  box-shadow: 1.4em 0em #c4c4c4, 2.8em 0em #c4c4c4;
}
</style>
