import Vue from 'vue'
import Vuex from 'vuex'
import VueSwatches from 'vue-swatches'
import { createLocalVue, mount } from '@vue/test-utils'
import Buefy from 'buefy'
import flushPromises from 'flush-promises'
import Drawing from '~/components/Drawing.vue'

function createStoreModule() {
  return {
    room: {
      namespaced: true,
      state: {
        jsonCanvas: '',
      },
      actions: {
        shareCanvas: jest.fn(),
      },
    },
  }
}

function createStore(modules = {}) {
  return new Vuex.Store({
    modules: {
      ...modules,
    },
  })
}

function createWrapper(
  component: Vue.VueConstructor<Vue>,
  storeModules = {},
  optionalData?: () => object
) {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  localVue.use(Buefy)
  localVue.component('v-swatches', VueSwatches)

  const store = createStore(storeModules)

  const mocks = {
    $t: (msg: string) => msg,
  }

  const stubs = {}

  return mount(component, {
    localVue,
    store,
    mocks,
    stubs,
    data: optionalData,
  })
}

describe('components/drawing', () => {
  it('is a Vue instance', () => {
    const storeModule = createStoreModule()
    const wrapper = createWrapper(Drawing, storeModule)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('can clear canvas', async () => {
    const storeModule = createStoreModule()
    const wrapper = createWrapper(Drawing, storeModule)

    const clear = wrapper.find('button[data-control-clear]')
    expect(clear.attributes('disabled')).toBeUndefined()

    clear.trigger('click')
    await flushPromises()

    expect(storeModule.room.actions.shareCanvas).toHaveBeenCalled()
    const canvasState = JSON.parse(
      storeModule.room.actions.shareCanvas.mock.calls[0][1]
    )
    expect(canvasState.version).toBeTruthy()
    expect(canvasState.objects).toStrictEqual([])
  })

  it('can switch to selection mode', async () => {
    const storeModule = createStoreModule()
    const wrapper = createWrapper(Drawing, storeModule)

    const cut = wrapper.find('button[data-control-cut]')
    const fill = wrapper.find('button[data-control-fill]')
    const selection = wrapper.find('button[data-control-selection]')
    const drawing = wrapper.find('button[data-control-drawing]')

    expect(cut.attributes('disabled')).toBe('disabled')
    expect(fill.attributes('disabled')).toBe('disabled')
    expect(selection.attributes('disabled')).toBeUndefined()
    expect(drawing.attributes('disabled')).toBe('disabled')

    selection.trigger('click')
    await flushPromises()

    expect(cut.attributes('disabled')).toBeUndefined()
    expect(fill.attributes('disabled')).toBeUndefined()
    expect(selection.attributes('disabled')).toBe('disabled')
    expect(drawing.attributes('disabled')).toBeUndefined()
  })

  it('can switch to drawing mode', async () => {
    const storeModule = createStoreModule()
    const data = () => ({ freeDrawing: false })
    const wrapper = createWrapper(Drawing, storeModule, data)

    const cut = wrapper.find('button[data-control-cut]')
    const fill = wrapper.find('button[data-control-fill]')
    const selection = wrapper.find('button[data-control-selection]')
    const drawing = wrapper.find('button[data-control-drawing]')

    expect(cut.attributes('disabled')).toBeUndefined()
    expect(fill.attributes('disabled')).toBeUndefined()
    expect(selection.attributes('disabled')).toBe('disabled')
    expect(drawing.attributes('disabled')).toBeUndefined()

    drawing.trigger('click')
    await flushPromises()

    expect(cut.attributes('disabled')).toBe('disabled')
    expect(fill.attributes('disabled')).toBe('disabled')
    expect(selection.attributes('disabled')).toBeUndefined()
    expect(drawing.attributes('disabled')).toBe('disabled')
  })

  it('can switch to small brush', async () => {
    const storeModule = createStoreModule()
    const data = () => ({ brushSize: 'medium' })
    const wrapper = createWrapper(Drawing, storeModule, data)

    const smallBrush = wrapper.find('button[data-brush-small]')
    const mediumBrush = wrapper.find('button[data-brush-medium]')
    const largeBrush = wrapper.find('button[data-brush-large]')

    expect(smallBrush.attributes('disabled')).toBeUndefined()
    expect(mediumBrush.attributes('disabled')).toBe('disabled')
    expect(largeBrush.attributes('disabled')).toBeUndefined()

    smallBrush.trigger('click')
    await flushPromises()

    expect(smallBrush.attributes('disabled')).toBe('disabled')
    expect(mediumBrush.attributes('disabled')).toBeUndefined()
    expect(largeBrush.attributes('disabled')).toBeUndefined()
  })

  it('can switch to medium brush', async () => {
    const storeModule = createStoreModule()
    const data = () => ({ brushSize: 'small' })
    const wrapper = createWrapper(Drawing, storeModule, data)

    const smallBrush = wrapper.find('button[data-brush-small]')
    const mediumBrush = wrapper.find('button[data-brush-medium]')
    const largeBrush = wrapper.find('button[data-brush-large]')

    expect(smallBrush.attributes('disabled')).toBe('disabled')
    expect(mediumBrush.attributes('disabled')).toBeUndefined()
    expect(largeBrush.attributes('disabled')).toBeUndefined()

    mediumBrush.trigger('click')
    await flushPromises()

    expect(smallBrush.attributes('disabled')).toBeUndefined()
    expect(mediumBrush.attributes('disabled')).toBe('disabled')
    expect(largeBrush.attributes('disabled')).toBeUndefined()
  })

  it('can switch to large brush', async () => {
    const storeModule = createStoreModule()
    const data = () => ({ brushSize: 'medium' })
    const wrapper = createWrapper(Drawing, storeModule, data)

    const smallBrush = wrapper.find('button[data-brush-small]')
    const mediumBrush = wrapper.find('button[data-brush-medium]')
    const largeBrush = wrapper.find('button[data-brush-large]')

    expect(smallBrush.attributes('disabled')).toBeUndefined()
    expect(mediumBrush.attributes('disabled')).toBe('disabled')
    expect(largeBrush.attributes('disabled')).toBeUndefined()

    largeBrush.trigger('click')
    await flushPromises()

    expect(smallBrush.attributes('disabled')).toBeUndefined()
    expect(mediumBrush.attributes('disabled')).toBeUndefined()
    expect(largeBrush.attributes('disabled')).toBe('disabled')
  })

  it('can fill background with current color', async () => {
    const storeModule = createStoreModule()
    const wrapper = createWrapper(Drawing, storeModule)

    const fill = wrapper.find('button[data-control-fill]')
    const selection = wrapper.find('button[data-control-selection]')

    selection.trigger('click')
    await flushPromises()

    fill.trigger('click')
    await flushPromises()

    setTimeout(() => {
      expect(storeModule.room.actions.shareCanvas).toHaveBeenCalled()
      const canvasState = JSON.parse(
        storeModule.room.actions.shareCanvas.mock.calls[0][1]
      )
      expect(canvasState.version).toBeTruthy()
      expect(canvasState.objects).toStrictEqual([])
    }, 100)
  })

  it('can change color swatches', async () => {
    const storeModule = createStoreModule()
    const wrapper = createWrapper(Drawing, storeModule)

    const swatches = wrapper.findAll('.vue-swatches__swatch')
    expect(swatches.length).toBe(12)

    const defaultSwatch = wrapper.find(
      'div.vue-swatches__swatch[aria-label="#222F3D"]'
    )
    const defaultSwatchCheck = defaultSwatch.find(
      '.vue-swatches__check__wrapper'
    )

    const targetSwatch = wrapper.find(
      'div.vue-swatches__swatch[aria-label="#1FBC9C"]'
    )
    const targetSwatchCheck = targetSwatch.find('.vue-swatches__check__wrapper')

    expect(defaultSwatchCheck.isVisible()).toBeTruthy()
    expect(targetSwatchCheck.isVisible()).toBeFalsy()

    targetSwatch.trigger('click')
    await flushPromises()

    expect(defaultSwatchCheck.isVisible()).toBeFalsy()
    expect(targetSwatchCheck.isVisible()).toBeTruthy()
  })

  it('can update canvas with input value', async () => {
    const storeModule = createStoreModule()
    const wrapper = createWrapper(Drawing, storeModule)
    expect(wrapper).toBeTruthy()

    storeModule.room.state.jsonCanvas = '{"aaa": "bbb"}'
    await flushPromises()

    expect(storeModule.room.actions.shareCanvas).not.toHaveBeenCalled()
  })

  it('can update canvas on mouse click', async () => {
    const storeModule = createStoreModule()
    const wrapper = createWrapper(Drawing, storeModule)

    const canvas = wrapper.find('canvas')

    canvas.trigger('click', {
      button: 0,
      clientX: 1,
      clientY: 1,
    })
    await flushPromises()

    setTimeout(() => {
      expect(storeModule.room.actions.shareCanvas).toHaveBeenCalled()
      const canvasState = JSON.parse(
        storeModule.room.actions.shareCanvas.mock.calls[0][1]
      )
      expect(canvasState.version).toBeTruthy()
      expect(canvasState.objects).toStrictEqual([])
    }, 100)
  })
})
