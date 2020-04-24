import { Configuration } from '@nuxt/types'
import i18n from './i18n'

require('dotenv').config()

const appCommon = i18n.messages.en.common.app
const appName = appCommon.name
const appShortName = appCommon.shortName
const appDescription = appCommon.description
const appAuthor = process.env.npm_package_author_name || ''
const appVersion = process.env.npm_package_version || ''
const appKeywords = appCommon.keywords
const appColor = appCommon.color

const baseUrl = process.env.BASE_URL || ''
const baseProtocol = process.env.BASE_PROTOCOL || 'https'
const staticPrefix = process.env.STATIC_PREFIX || ''
const chiffrePublicKey = process.env.CHIFFRE_PUBLIC_KEY || ''
const chiffreProjectId = process.env.CHIFFRE_PROJECT_ID || ''
const sentryDsn = process.env.SENTRY_DSN || ''

const hostname = `${baseProtocol}://${baseUrl}${staticPrefix}`

const sitemapPath = '/sitemap.xml'
const sitemapUrl = `${hostname}${sitemapPath}`

const config: Configuration = {
  mode: 'universal',

  env: {
    APP_VERSION: appVersion,
    STATIC_PREFIX: staticPrefix,
  },

  loading: { color: '#fff' },

  head: {
    meta: [
      { hid: 'keywords', name: 'keywords', content: appKeywords.join(',') },
    ],
  },

  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    '~/assets/scss/main.scss',
  ],

  router: {
    base: `${staticPrefix}/`,
    linkExactActiveClass: 'is-active',
  },

  generate: {
    fallback: '200.html',
  },

  plugins: ['~/plugins/font-awesome.ts'],

  buildModules: [
    '@nuxtjs/dotenv',
    '@nuxt/typescript-build',
    '@nuxtjs/eslint-module',
    ['nuxt-cname-module', { baseUrl, generateCNAME: true }],
  ],

  modules: [
    'nuxt-chiffre',
    'nuxt-i18n',
    'nuxt-buefy',
    'vue-swatches/nuxt',
    '@nuxtjs/sentry',
    '@nuxtjs/pwa',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
  ],

  typescript: {
    typeCheck: {
      eslint: true,
    },
  },

  chiffre: {
    publicKey: chiffrePublicKey,
    projectId: chiffreProjectId,
  },

  i18n: {
    locales: i18n.locales,
    defaultLocale: i18n.defaultLocale,
    seo: false,
    baseUrl: hostname,
    vueI18n: {
      fallbackLocale: i18n.defaultLocale,
      messages: i18n.messages,
      dateTimeFormats: i18n.dateTimeFormats,
    },
  },

  buefy: {
    css: false,
    materialDesignIcons: false,
    defaultIconPack: 'fas',
    defaultIconComponent: 'font-awesome-icon',
  },

  sentry: {
    dsn: sentryDsn,
  },

  pwa: {
    meta: {
      name: appName,
      author: appAuthor,
      description: appDescription,
      theme_color: appColor,
      ogHost: hostname,
    },
    manifest: {
      name: appName,
      short_name: appShortName,
      description: appDescription,
      background_color: '#ffffff',
      theme_color: appColor,
    },
  },

  robots: [
    {
      UserAgent: '*',
      Disallow: '',
      Sitemap: sitemapUrl,
    },
  ],

  sitemap: {
    path: sitemapPath,
    hostname,
    gzip: true,
  },
}

export default config
