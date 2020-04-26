import Vue from 'vue'
import { createLocalVue, mount } from '@vue/test-utils'
import Buefy from 'buefy'
import flushPromises from 'flush-promises'
import Drawing from '~/components/Drawing.vue'

function createWrapper(
  component: Vue.VueConstructor<Vue>,
  optionalProps?: object,
  optionalData?: () => object
) {
  const localVue = createLocalVue()
  localVue.use(Buefy)

  const mocks = {}

  const stubs = {
    'v-swatches': true,
  }

  return mount(component, {
    localVue,
    mocks,
    stubs,
    propsData: optionalProps,
    data: optionalData,
  })
}

function generateProps() {
  return {
    value: '',
  }
}

describe('components/drawing', () => {
  it('is a Vue instance', () => {
    const props = generateProps()
    const wrapper = createWrapper(Drawing, props)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('can clear canvas', async () => {
    const props = generateProps()
    const wrapper = createWrapper(Drawing, props)

    const clear = wrapper.find('button[data-control-clear]')
    expect(clear.attributes('disabled')).toBeUndefined()

    clear.trigger('click')
    await flushPromises()

    setTimeout(() => {
      expect(wrapper.emitted('input')?.length).toBe(1)
      const canvasState = JSON.parse(wrapper.emitted('input')?.[0][0])
      expect(canvasState.version).toBeTruthy()
      expect(canvasState.objects).toStrictEqual([])
    }, 100)
  })

  it('can switch to selection mode', async () => {
    const props = generateProps()
    const wrapper = createWrapper(Drawing, props)

    const cut = wrapper.find('button[data-control-cut]')
    const selection = wrapper.find('button[data-control-selection]')
    const drawing = wrapper.find('button[data-control-drawing]')

    expect(cut.attributes('disabled')).toBe('disabled')
    expect(selection.attributes('disabled')).toBeUndefined()
    expect(drawing.attributes('disabled')).toBe('disabled')

    selection.trigger('click')
    await flushPromises()

    expect(cut.attributes('disabled')).toBeUndefined()
    expect(selection.attributes('disabled')).toBe('disabled')
    expect(drawing.attributes('disabled')).toBeUndefined()
  })

  it('can switch to drawing mode', async () => {
    const props = generateProps()
    const data = () => ({ freeDrawing: false })
    const wrapper = createWrapper(Drawing, props, data)

    const selection = wrapper.find('button[data-control-selection]')
    const drawing = wrapper.find('button[data-control-drawing]')

    expect(selection.attributes('disabled')).toBe('disabled')
    expect(drawing.attributes('disabled')).toBeUndefined()

    drawing.trigger('click')
    await flushPromises()

    expect(selection.attributes('disabled')).toBeUndefined()
    expect(drawing.attributes('disabled')).toBe('disabled')
  })

  it('can switch to small brush', async () => {
    const props = generateProps()
    const data = () => ({ brushSize: 'medium' })
    const wrapper = createWrapper(Drawing, props, data)

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
    const props = generateProps()
    const data = () => ({ brushSize: 'small' })
    const wrapper = createWrapper(Drawing, props, data)

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
    const props = generateProps()
    const data = () => ({ brushSize: 'medium' })
    const wrapper = createWrapper(Drawing, props, data)

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

  it('can update canvas with input value', async () => {
    const props = generateProps()
    const wrapper = createWrapper(Drawing, props)

    props.value = '{"aaa": "bbb"}'
    wrapper.setProps(props)
    await flushPromises()

    expect(wrapper.emitted('input')).toBeFalsy()
  })

  it('can update canvas on mouse click', async () => {
    const props = generateProps()
    const wrapper = createWrapper(Drawing, props)

    const canvas = wrapper.find('canvas')

    canvas.trigger('click', {
      button: 0,
      clientX: 1,
      clientY: 1,
    })
    await flushPromises()

    setTimeout(() => {
      expect(wrapper.emitted('input')?.length).toBe(1)
      const canvasState = JSON.parse(wrapper.emitted('input')?.[0][0])
      expect(canvasState.version).toBeTruthy()
      expect(canvasState.objects).toStrictEqual([])
    }, 100)
  })
})
