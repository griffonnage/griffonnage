import { NuxtConfig } from '@nuxt/types'
import { Event as SentryEvent } from '@sentry/types'
import i18n from './i18n'

const appCommon = i18n.messages.en.common.app
const appName = appCommon.name
const appShortName = appCommon.shortName
const appDescription = appCommon.description
const appAuthor = process.env.npm_package_author_name || ''
const appVersion = process.env.npm_package_version || ''
const appKeywords = appCommon.keywords
const appColor = appCommon.color

const appEnvironment = process.env.APP_ENVIRONMENT || process.env.NODE_ENV
const baseUrl = process.env.BASE_URL || ''
const baseProtocol = process.env.BASE_PROTOCOL || 'https'
const staticPrefix = process.env.STATIC_PREFIX || ''
const syncUrl = process.env.SYNC_URL || ''
const chiffrePublicKey = process.env.CHIFFRE_PUBLIC_KEY || ''
const chiffreProjectId = process.env.CHIFFRE_PROJECT_ID || ''
const sentryDsn = process.env.SENTRY_DSN || ''

const hostname = `${baseProtocol}://${baseUrl}${staticPrefix}`

const sitemapPath = '/sitemap.xml'
const sitemapUrl = `${hostname}${sitemapPath}`

const config: NuxtConfig = {
  target: 'static',
  telemetry: false,

  env: {
    APP_VERSION: appVersion,
    HOSTNAME: hostname,
    STATIC_PREFIX: staticPrefix,
    SYNC_URL: syncUrl,
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
    fallback: '404.html',
    exclude: [/free\//],
  },

  plugins: ['~/plugins/clipboard.ts', '~/plugins/font-awesome.ts'],

  buildModules: [
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
      eslint: {
        enabled: true,
        files: './**/*.{ts,js,vue}',
      },
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
    config: {
      environment: appEnvironment,
      release: appVersion,
      beforeSend(event: SentryEvent) {
        // scrub sensitive url fragments from Sentry reports
        if (event.request?.url) {
          event.request.url = event.request.url.split('#')[0]
        }

        return event
      },
    },
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
