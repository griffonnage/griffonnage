import Vue from 'vue'
import { createLocalVue, mount } from '@vue/test-utils'
import Buefy from 'buefy'
import faker from 'faker'
import flushPromises from 'flush-promises'
import Chat from '~/components/Chat.vue'

faker.seed(1234)

function createWrapper(
  component: Vue.VueConstructor<Vue>,
  optionalProps?: object
) {
  const localVue = createLocalVue()
  localVue.use(Buefy)

  const mocks = {
    $t: (msg: string) => msg,
    $d: (msg: Date) => msg,
  }

  const stubs = {}

  return mount(component, {
    localVue,
    mocks,
    stubs,
    propsData: optionalProps,
  })
}

function generateMessage() {
  return {
    socketid: faker.random.alphaNumeric(),
    username: faker.internet.userName(),
    content: faker.lorem.sentence(),
    datetime: faker.date.recent().toISOString(),
  }
}

function generateProps() {
  const messages = []
  for (let i = 0; i < 4; ++i) {
    messages.push(generateMessage())
  }

  return {
    messages,
  }
}

describe('components/chat', () => {
  it('is a Vue instance', () => {
    const props = generateProps()
    const wrapper = createWrapper(Chat, props)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('can display messages in given order', () => {
    const props = generateProps()
    const wrapper = createWrapper(Chat, props)

    props.messages.forEach((m, i) => {
      const msgComp = wrapper.find(`article[data-message=message-${i}]`)

      const username = msgComp.find('.content > p > strong')
      expect(username.text()).toBe(m.username)

      const datetime = msgComp.find('.content > p > small')
      expect(datetime.text()).toBe(new Date(m.datetime).toString())

      const content = msgComp.find('.content > p > br + span')
      expect(content.text()).toBe(m.content)
    })
  })

  it('can send new message', async () => {
    const props = generateProps()
    const wrapper = createWrapper(Chat, props)

    const newMessage = faker.lorem.sentence()
    const nameInput = wrapper.find('input')
    nameInput.setValue(newMessage)

    const button = wrapper.find('button')
    expect(button.attributes('disabled')).toBe('disabled')

    await flushPromises()
    expect(button.attributes('disabled')).toBeUndefined()

    button.trigger('click')
    await flushPromises()
    expect(button.attributes('disabled')).toBe('disabled')

    expect(wrapper.emitted('new-message')?.length).toBe(1)
    expect(wrapper.emitted('new-message')?.[0]).toStrictEqual([newMessage])
  })

  it('cannot send empty message', async () => {
    const props = generateProps()
    const wrapper = createWrapper(Chat, props)

    const newMessage = ''
    const nameInput = wrapper.find('input')
    nameInput.setValue(newMessage)

    const button = wrapper.find('button')
    expect(button.attributes('disabled')).toBe('disabled')

    await flushPromises()
    expect(button.attributes('disabled')).toBe('disabled')

    button.trigger('click')
    await flushPromises()
    expect(button.attributes('disabled')).toBe('disabled')

    expect(wrapper.emitted('new-message')).toBeFalsy()
  })
})
