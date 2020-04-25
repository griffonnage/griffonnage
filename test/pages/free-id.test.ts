import Vue from 'vue'
import VueRouter from 'vue-router'
import { createLocalVue, mount } from '@vue/test-utils'
import Buefy from 'buefy'
import FreeId from '~/pages/free/_id.vue'

function createWrapper(component: Vue.VueConstructor<Vue>) {
  const localVue = createLocalVue()
  localVue.use(VueRouter)
  localVue.use(Buefy)

  const router = new VueRouter({ mode: 'abstract' })

  const mocks = {
    $t: (msg: string) => msg,
  }

  const stubs = {
    'v-swatches': true,
  }

  return mount(component, {
    localVue,
    router,
    mocks,
    stubs,
  })
}

describe('pages/free-id', () => {
  test('is a Vue instance', () => {
    const wrapper = createWrapper(FreeId)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
