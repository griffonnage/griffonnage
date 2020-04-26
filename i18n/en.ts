export default {
  navbar: {
    brand: 'Griffonnage',
    home: 'Home',
    language: 'Language',
  },

  credits: {
    made: 'Developed by {author}',
    powered: 'Powered by {nuxt}, {socketio}, {bulma} and {fontawesome}',
    e2ee: 'All data are end-to-end encrypted with {tweetnacljs}',
    analytics: 'Privacy-first analytics tracking powered by {chiffre}',
    website: 'This website is open-source software under {license} license',
    copyright: {
      text: 'Copyright',
      start: '2020',
      end: 'present',
      owner: 'Romain Clement',
    },
    version: 'Version',
  },

  error: {
    pageNotFound: {
      title: 'Page not found',
      subtitle: 'It seems you are lost!',
    },
    internalServerError: {
      title: 'Something went wrong',
      subtitle: 'We are investigating...',
    },
    backToHome: 'Back to home',
  },

  home: {
    title: 'Griffonnage',
    subtitle: 'Scribble careless drawings with friends, privately',
    drawFreely: 'Draw freely',
    bs: `Griffonnage allows truly private synchronized drawings with friends.
    All the drawings and chat messages are sent end-to-end encrypted in a
    peer-to-peer fashion, meaning no server whatsoever does not retain nor
    can see your data in transit.`,
    moto: `Don't believe us? No biggy! We strongly believe transparency goes hand-in-hand
    with privacy, that's why this application is free and open-source software under
    {license} license, available publicly on {repository}.`,
    tagline: `The only shame you get from drawing the most obscene stuff ever
    is between you and your friends only. 😏`,
  },

  rooms: {
    secureLink: 'This connection is secured using end-to-end encryption',
    linkCopied: 'Link copied to clipboard',
  },

  chat: {
    newMessage: 'Message',
    send: 'Send',
  },

  userlist: {
    username: 'Username',
    me: 'Me',
    anonymous: 'Anonymous User',
  },
}
