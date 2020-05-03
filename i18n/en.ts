export default {
  navbar: {
    brand: 'Griffonnage',
    home: 'Home',
    language: 'Language',
  },

  credits: {
    made: 'Developed by {author}',
    powered:
      'Powered by {nuxt}, {fabricjs}, {socketio}, {bulma} and {fontawesome}',
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
    tagline: `The only shame you'll get from drawing the most obscene stuff ever
    will be between you and your friends only. 😏`,
  },

  features: {
    drawing: {
      title: 'Drawing',
      text: `Common hand-drawing features with mices and touchscreens,
      including color selection, brush selection and objects manipulation
      (move, scale, rotate, erase). Drawings are synchronized in real-time. Powered by {fabricjs}.`,
    },
    messaging: {
      title: 'Messaging',
      text: `Talk to your drawing buddies in real-time. Powered by {socketio}.`,
    },
    p2p: {
      title: 'Peer-to-peer',
      text: `All drawings and chat messages are synchronized in a peer-to-peer fashion.
      This means synchronization servers will never keep any data, only transmitting it.
      However, this also means all sessions are ephemeral. Powered by {socketio}.`,
    },
    privacy: {
      title: 'Privacy',
      text: `All drawings and chat messages are sent end-to-end encrypted over the wire,
      using "secret-key authenticated encryption". This means synchronization servers
      will never be able to see your data, even when transmitting it. Powered by {tweetnacljs}.`,
    },
    oss: {
      title: 'Open-Source',
      text: `We strongly believe transparency goes hand-in-hand with privacy,
      that's why this application is free and open-source software under
      {license} license, available publicly on {repository}.`,
    },
    suggestions: {
      title: 'Suggestions',
      text: `Found a bug? Missing a feature? Open an issue and/or contribute on {repository}.`,
    },
  },

  join: {
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
