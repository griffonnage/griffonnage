import * as usernames from '~/utils/usernames'

describe('utils/usernames', () => {
  it('can generate a random username', () => {
    const name = usernames.generate()
    expect(name).toBeTruthy()

    const parts = name.split(' ')
    expect(parts.length).toBeGreaterThanOrEqual(2)
  })
})
