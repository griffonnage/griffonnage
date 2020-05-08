<template>
  <div>
    <canvas ref="canvas" width="0" height="0" />

    <br />

    <div class="level">
      <div class="level-item">
        <div class="field">
          <b-button
            :title="$t('drawing.cleanup')"
            icon-pack="fas"
            icon-left="broom"
            size="is-large"
            type="is-danger"
            data-control-clear
            @click="clearCanvas"
          />

          <b-button
            :title="$t('drawing.cut')"
            icon-pack="fas"
            icon-left="cut"
            size="is-large"
            type="is-warning"
            :disabled="freeDrawing"
            data-control-cut
            @click="cutSelection"
          />

          <b-button
            :title="$t('drawing.fill')"
            icon-pack="fas"
            icon-left="fill-drip"
            size="is-large"
            type="is-primary"
            :disabled="freeDrawing"
            data-control-fill
            @click="fillSelection"
          />
        </div>
      </div>

      <div class="level-item">
        <div class="field">
          <b-button
            :title="$t('drawing.selection')"
            icon-pack="fas"
            icon-left="vector-square"
            size="is-large"
            type="is-info"
            :disabled="!freeDrawing"
            data-control-selection
            @click="disableFreeDrawing"
          />

          <b-button
            :title="$t('drawing.drawing')"
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
            :title="$t('drawing.smallBrush')"
            icon-pack="fas"
            icon-left="circle-notch"
            size="is-large"
            type="is-dark"
            :disabled="brushSize === 'small'"
            data-brush-small
            @click="brushSizeChanged('small')"
          />

          <b-button
            :title="$t('drawing.mediumBrush')"
            icon-pack="fas"
            icon-left="dot-circle"
            size="is-large"
            type="is-dark"
            :disabled="brushSize === 'medium'"
            data-brush-medium
            @click="brushSizeChanged('medium')"
          />

          <b-button
            :title="$t('drawing.largeBrush')"
            icon-pack="fas"
            icon-left="circle"
            size="is-large"
            type="is-dark"
            :disabled="brushSize === 'large'"
            data-brush-large
            @click="brushSizeChanged('large')"
          />
        </div>
      </div>
    </div>

    <div class="has-text-centered">
      <v-swatches
        v-model="brushColor"
        :swatches="swatches"
        inline
        show-border
        @input="brushColorChanged"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'
import { fabric } from 'fabric'

const brushSizeWidth = {
  small: 5,
  medium: 10,
  large: 20,
}

export default Vue.extend({
  data() {
    return {
      canvas: null as HTMLCanvasElement | null,
      fabric: null as fabric.Canvas | null,
      freeDrawing: true,
      swatches: [
        '#1FBC9C',
        '#2ECC70',
        '#3398DB',
        '#8E43AD',
        '#F2C511',
        '#F39C19',
        '#E84B3C',
        '#FFCCD5',
        '#DDE6E8',
        '#222F3D',
        '#FFFFFF',
        '',
      ],
      brushColor: '#222F3D',
      brushSize: 'medium' as 'small' | 'medium' | 'large',
      loadingCanvasState: false,
    }
  },

  computed: {
    ...mapState('room', {
      jsonCanvas: 'jsonCanvas',
    }),
  },

  watch: {
    jsonCanvas(canvas: string): void {
      this.loadCanvas(canvas)
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
    this.fabric.on('object:added', this.canvasChangedEvent)
    this.fabric.on('object:modified', this.canvasChangedEvent)
    this.fabric.on('object:removed', this.canvasChangedEvent)
    this.fabric.on('canvas:cleared', this.canvasChangedEvent)

    this.loadCanvas(this.jsonCanvas)
  },

  methods: {
    ...mapActions('room', {
      shareCanvas: 'shareCanvas',
    }),

    handleResize(): void {
      if (this.canvas) {
        const scale = window.devicePixelRatio
        const width = this.canvas.parentElement?.clientWidth as number
        const height = 400

        this.canvas.width = width
        this.canvas.height = height
        this.canvas.style.width = `${width}px`
        this.canvas.style.width = `${height}px`

        const canvasCtx = this.canvas.getContext('2d')
        if (canvasCtx) {
          canvasCtx.scale(scale, scale)
        }
      }
    },

    loadCanvas(canvas: string): void {
      if (this.fabric) {
        this.loadingCanvasState = true
        this.fabric.loadFromJSON(canvas, () => {})
        this.loadingCanvasState = false
      }
    },

    clearCanvas(): void {
      if (this.fabric) {
        this.fabric.clear()
      }
    },

    cutSelection(): void {
      if (this.fabric && !this.freeDrawing) {
        const objects = this.fabric.getActiveObjects()
        objects.forEach((o) => {
          if (this.fabric) {
            this.fabric.remove(o)
          }
        })
      }
    },

    fillSelection(): void {
      if (this.fabric && !this.freeDrawing) {
        const objects = this.fabric.getActiveObjects()

        if (objects.length === 0) {
          this.fabric.backgroundColor = this.brushColor
        } else {
          objects.forEach((o) => {
            if (this.fabric) {
              o.set('fill', this.brushColor)
            }
          })
        }

        this.fabric.renderAll()
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
        this.shareCanvas(JSON.stringify(this.fabric))
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
