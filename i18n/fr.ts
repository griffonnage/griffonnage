export default {
  navbar: {
    brand: 'Griffonnage',
    home: 'Accueil',
    language: 'Langue',
  },

  credits: {
    made: 'Développé par {author}',
    powered:
      'Propulsé par {nuxt}, {fabricjs}, {socketio}, {bulma} et {fontawesome}',
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
    tagline: `La seule honte que vous aurez en dessinant la chose la plus osbscène possible
    sera uniquement entre vous et vos amis. 😏`,
  },

  features: {
    drawing: {
      title: 'Dessin',
      text: `Fonctionnalités habituelles de dessin à main levé avec souris et écran tactile,
      incluant la sélection de couleur, l'épaisseur du trait et la manipulation d'objets
      (déplacer, tourner, effacer). Les dessins sont synchronisés en temps-réel. Propulsé par {fabricjs}.`,
    },
    messaging: {
      title: 'Messagerie',
      text: `Parlez à vos camarades de dessin en temps-réel. Propulsé par {socketio}.`,
    },
    p2p: {
      title: 'Pair-à-pair',
      text: `Tous les dessins et messages instantanés sont synchronisés en pair-à-pair.
      Les serveurs de synchronisation ne garderont aucune donnée, ils assurent seulement la transmission.
      En revanche, cela implique que toutes les sessions sont éphémères. Propulsé par {socketio}.`,
    },
    privacy: {
      title: 'Vie privée',
      text: `Tous les dessins et messages instantanés sont envoyés chiffrés bout-en-bout à travers le réseau,
      en utilisant la "cryptographie authentifiée à clé-secrète". En d'autres termes, les serveurs de synchronisation
      ne pourront jamais voir vos données, même lors de leur transmission. Propulsé par {tweetnacljs}.`,
    },
    oss: {
      title: 'Open-Source',
      text: `Nous croyons fortement que la transparence va de pair avec le respect de la vie privée,
      c'est pourquoi cette application est un logiciel libre et ouvert (open-source) sous
      licence {license}, disponible publiquement sur {repository}.`,
    },
    suggestions: {
      title: 'Suggestions',
      text: `Vous avez trouvé un bug ? Une fonctionnalité est manquante ? Ouvrez un ticket et/ou contribuez sur {repository}.`,
    },
  },

  join: {
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

  drawing: {
    cleanup: 'Nettoyer le canvas',
    cut: 'Supprimmer la selection',
    fill: 'Remplire la selection',
    selection: 'Selection',
    drawing: 'Dessin',
    smallBrush: 'Trait fin',
    mediumBrush: 'Trait moyen',
    largeBrush: 'Trait large',
  },
}
