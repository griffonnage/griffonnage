import * as usernames from '~/utils/usernames'

describe('utils/usernames', () => {
  it('can generate a random username', () => {
    const name = usernames.generate()
    expect(name).toBeTruthy()

    const parts = name.split(' ')
    expect(parts.length).toBe(2)
    expect(usernames.adjectives.includes(parts[0])).toBeTruthy()
    expect(usernames.names.includes(parts[1])).toBeTruthy()
  })
})
