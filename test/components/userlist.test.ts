import Vue from 'vue'
import { createLocalVue, mount } from '@vue/test-utils'
import Buefy from 'buefy'
import faker from 'faker'
import flushPromises from 'flush-promises'
import UserList from '~/components/UserList.vue'

faker.seed(1234)

function createWrapper(
  component: Vue.VueConstructor<Vue>,
  optionalProps?: object
) {
  const localVue = createLocalVue()
  localVue.use(Buefy)

  const mocks = {
    $t: (msg: string) => msg,
  }

  const stubs = {}

  return mount(component, {
    localVue,
    mocks,
    stubs,
    propsData: optionalProps,
  })
}

function generateUser() {
  return {
    socketid: faker.random.alphaNumeric(),
    username: faker.internet.userName(),
    me: false,
  }
}

function generateProps() {
  const users = []
  for (let i = 0; i < 4; ++i) {
    users.push(generateUser())
  }
  users[0].me = true
  users[1].username = ''

  return {
    users,
  }
}

describe('components/join-link', () => {
  it('is a Vue instance', () => {
    const props = generateProps()
    const wrapper = createWrapper(UserList, props)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('can display users in given order', () => {
    const props = generateProps()
    const wrapper = createWrapper(UserList, props)

    props.users.forEach((u, i) => {
      const msgComp = wrapper.find(`article[data-user=user-${i}]`)

      if (u.me) {
        const me = msgComp.find('.content > p > span > span')
        expect(me.text()).toBe('userlist.me')

        const username = msgComp.find('.content > p > span > span + span')
        expect(username.text()).toBe(`(${u.username})`)
      } else if (u.username === '') {
        const username = msgComp.find('.content > p > span')
        expect(username.text()).toBe(`userlist.anonymous ${i + 1}`)
      } else {
        const username = msgComp.find('.content > p > span')
        expect(username.text()).toBe(u.username)
      }
    })
  })

  it('can send username at startup', () => {
    const props = generateProps()
    const wrapper = createWrapper(UserList, props)

    expect(wrapper.emitted('username-changed')?.length).toBe(1)
    expect(wrapper.emitted('username-changed')?.[0][0].length).toBeGreaterThan(
      1
    )
  })

  it('can input a new username', async () => {
    const props = generateProps()
    const wrapper = createWrapper(UserList, props)

    const username = faker.internet.userName()
    const input = wrapper.find('input')
    input.setValue(username)

    await flushPromises()
    expect(wrapper.emitted('username-changed')?.length).toBe(2)
    expect(wrapper.emitted('username-changed')?.[1][0]).toBe(username)
  })

  it('can generate a new username', async () => {
    const props = generateProps()
    const wrapper = createWrapper(UserList, props)

    const button = wrapper.find('button')
    button.trigger('click')
    await flushPromises()

    expect(wrapper.emitted('username-changed')?.length).toBe(2)
    expect(wrapper.emitted('username-changed')?.[1][0].length).toBeGreaterThan(
      1
    )
  })

  it('can generate a new username when input is empty', async () => {
    const props = generateProps()
    const wrapper = createWrapper(UserList, props)

    const username = ''
    const input = wrapper.find('input')
    input.setValue(username)

    await flushPromises()
    expect(wrapper.emitted('username-changed')?.length).toBe(2)
    expect(wrapper.emitted('username-changed')?.[1][0].length).toBeGreaterThan(
      1
    )
  })
})
