export default {
  navbar: {
    brand: 'Griffonnage',
    home: 'Accueil',
    language: 'Langue',
  },

  credits: {
    made: 'Développé par {author}',
    powered: 'Propulsé par {nuxt}, {socketio}, {bulma} et {fontawesome}',
    e2ee: 'Données protégées par chiffrement bout-en-bout avec {tweetnacljs}',
    analytics: `Analyse d'utilisation respectueuse de la vie-privée grâce à {chiffre}`,
    website: 'Ce site-web est ouvert sous licence {license}',
    copyright: {
      text: 'Tous droits réservés',
      start: '2020',
      end: 'present',
      owner: 'Romain Clement',
    },
    version: 'Version',
  },

  error: {
    pageNotFound: {
      title: 'Page introuvable',
      subtitle: 'Il semblerait que vous soyez perdu !',
    },
    internalServerError: {
      title: 'Une erreur est survenue',
      subtitle: `Nous sommes en train d'enquêter ...`,
    },
    backToHome: `Retour à l'accueil`,
  },

  home: {
    title: 'Griffonnage',
    subtitle: 'Gribouillez des dessins rapidement avec vos amis, en privé',
    drawFreely: 'Dessiner librement',
    bs: `Griffonnage permet de dessiner avec ses amis réellement en privé.
    Tous les dessins et messages instantanés sont envoyés chiffrés bout-en-bout
    en pair-à-pair, ce qui veut dire qu'aucun serveur ne retient d'information ni
    même ne peut voir vos données lors du transport.`,
    moto: `Vous ne nous croyez-pas ? Aucun problème ! Nous croyons fortement que la transparence
    va de pair avec le respect de la vie privée, c'est pourquoi cette application est
    un logiciel libre et ouvert sous license {license}, disponible publiquement sur {repository}.`,
    tagline: `La seule honte que vous aurez en dessin le dessin le plus osbscène
    jamais réalisé sera uniquement entre vous et vos amis. 😏`,
  },

  rooms: {
    secureLink: 'Cette connection est sécurisé par chiffrement bout-en-bout',
    linkCopied: 'Lien copié dans le presse-papier',
  },

  chat: {
    newMessage: 'Message',
    send: 'Envoyer',
  },

  userlist: {
    username: `Nom d'utilisateur`,
    me: 'Moi',
    anonymous: 'Utilisateur Anonyme',
  },
}
