module.exports = {
  siteName: 'Gridsome + Shopify 😍',
  siteDescription: 'A full-featured Shopify starter kit for Gridsome, including an account page.',
  siteUrl: 'https://gridsome-starter-shopify-account.vercel.app',
  templates: {
    ShopifyProduct: [
      {
        path: '/product/:handle',
        component: './src/templates/Product.vue'
      }
    ],
    ShopifyCollection: [
      {
        path: '/collection/:handle',
        component: './src/templates/Collection.vue'
      }
    ],
    ShopifyPage: [
      {
        path: '/:handle',
        component: './src/templates/Page.vue'
      }
    ]
  },
  plugins: [
    {
      use: 'gridsome-source-shopify',
      options: {
        storeName: process.env.GRIDSOME_SHOPIFY_STOREFRONT,
        storefrontToken: process.env.GRIDSOME_SHOPIFY_STOREFRONT_TOKEN
      }
    },
    {
      use: 'gridsome-plugin-flexsearch',
      options: {
        flexsearch: {
          profile: 'match'
        },
        collections: [
          {
            typeName: 'ShopifyProduct',
            indexName: 'Product',
            fields: ['title', 'handle', 'description']
          },
          {
            typeName: 'ShopifyCollection',
            indexName: 'Collection',
            fields: ['title', 'handle', 'description']
          }
        ],
        searchFields: ['title', 'handle', 'tags']
      }
    },
    'gridsome-plugin-purgecss',
    {
      use: '@gridsome/plugin-critical',
      options: {
        paths: ['/', '/collections', '/collection/*'],
        width: 1300,
        height: 900
      }
    },
    {
      use: '@gridsome/plugin-sitemap',
      options: {
        exclude: ['/account'],
        config: {
          '/product/*': {
            changefreq: 'daily',
            priority: 0.5
          },
          '/collection/*': {
            changefreq: 'weekly',
            priority: 0.5
          },
          '/collections': {
            changefreq: 'monthly',
            priority: 0.7
          }
        }
      }
    },
    {
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: process.env.GRIDSOME_ANALYTICS_ID
      }
    },
    {
      use: 'gridsome-plugin-manifest',
      options: {
        background_color: '#000000',
        icon_path: './src/favicon.png',
        name: 'Gridsome + Shopify 😍',
        short_name: 'Shopify Starter + 🔐',
        theme_color: '#000000',
        lang: 'en'
      }
    },
    {
      use: 'gridsome-plugin-service-worker',
      options: {
        staleWhileRevalidate: {
          cacheName: 'static-resources',
          routes: [/\.(?:css)$/]
        }
      }
    }
  ]
}
