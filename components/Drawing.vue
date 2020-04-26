<template>
  <div>
    <canvas ref="canvas" width="0" height="0" />

    <br />

    <div class="level">
      <div class="level-item">
        <div class="field">
          <b-button
            icon-pack="fas"
            icon-left="broom"
            size="is-large"
            type="is-danger"
            data-control-clear
            @click="clearCanvas"
          />

          <b-button
            icon-pack="fas"
            icon-left="vector-square"
            size="is-large"
            type="is-info"
            :disabled="!freeDrawing"
            data-control-selection
            @click="disableFreeDrawing"
          />

          <b-button
            icon-pack="fas"
            icon-left="pencil-alt"
            size="is-large"
            type="is-info"
            :disabled="freeDrawing"
            data-control-drawing
            @click="enableFreeDrawing"
          />
        </div>
      </div>

      <div class="level-item">
        <div class="field">
          <b-button
            icon-pack="fas"
            icon-left="circle-notch"
            size="is-large"
            type="is-warning"
            :disabled="brushSize === 'small'"
            data-brush-small
            @click="brushSizeChanged('small')"
          />

          <b-button
            icon-pack="fas"
            icon-left="dot-circle"
            size="is-large"
            type="is-warning"
            :disabled="brushSize === 'medium'"
            data-brush-medium
            @click="brushSizeChanged('medium')"
          />

          <b-button
            icon-pack="fas"
            icon-left="circle"
            size="is-large"
            type="is-warning"
            :disabled="brushSize === 'large'"
            data-brush-large
            @click="brushSizeChanged('large')"
          />
        </div>
      </div>
    </div>

    <div class="has-text-centered">
      <v-swatches v-model="brushColor" inline @input="brushColorChanged" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { fabric } from 'fabric'

const brushSizeWidth = {
  small: 5,
  medium: 10,
  large: 20,
}

export default Vue.extend({
  props: {
    value: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      canvas: null as HTMLCanvasElement | null,
      fabric: null as fabric.Canvas | null,
      freeDrawing: true,
      brushColor: '#3398DB',
      brushSize: 'medium' as 'small' | 'medium' | 'large',
      loadingCanvasState: false,
    }
  },

  watch: {
    value(canvas: string): void {
      if (this.fabric) {
        this.loadingCanvasState = true
        this.fabric.loadFromJSON(canvas, () => {})
        this.loadingCanvasState = false
      }
    },
  },

  mounted() {
    // window.addEventListener('resize', this.handleResize)
    this.canvas = this.$refs.canvas as HTMLCanvasElement
    this.handleResize()

    this.fabric = new fabric.Canvas(this.canvas)
    this.fabric.isDrawingMode = true
    this.fabric.freeDrawingBrush.color = this.brushColor
    this.fabric.freeDrawingBrush.width = brushSizeWidth[this.brushSize]
    this.fabric.on('after:render', this.canvasChangedEvent)
  },

  methods: {
    handleResize(): void {
      if (this.canvas) {
        const scale = window.devicePixelRatio
        const width = this.canvas.parentElement?.clientWidth as number
        const height = 200 * scale

        this.canvas.width = width
        this.canvas.height = height
        this.canvas.style.width = `${width / scale}`
        this.canvas.style.width = `${height / scale}`

        const canvasCtx = this.canvas.getContext('2d')
        if (canvasCtx) {
          canvasCtx.scale(scale, scale)
        }
      }
    },

    clearCanvas(): void {
      if (this.fabric) {
        this.fabric.clear()
      }
    },

    disableFreeDrawing(): void {
      this.freeDrawing = false
      if (this.fabric) {
        this.fabric.isDrawingMode = this.freeDrawing
      }
    },

    enableFreeDrawing(): void {
      this.freeDrawing = true
      if (this.fabric) {
        this.fabric.isDrawingMode = this.freeDrawing
      }
    },

    brushColorChanged(): void {
      if (this.fabric) {
        this.fabric.freeDrawingBrush.color = this.brushColor
      }
    },

    brushSizeChanged(size: 'small' | 'medium' | 'large'): void {
      this.brushSize = size

      if (this.fabric) {
        this.fabric.freeDrawingBrush.width = brushSizeWidth[this.brushSize]
      }
    },

    canvasChangedEvent(): void {
      if (this.fabric && !this.loadingCanvasState) {
        this.$emit('input', JSON.stringify(this.fabric))
      }
    },
  },
})
</script>

<style scoped>
canvas {
  border: 1px solid darkslategray;
}
</style>
