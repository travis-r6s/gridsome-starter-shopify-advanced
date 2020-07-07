# Extended Shopify starter for Gridsome

This is an extended starter, copied from the [boilerplate starter](https://github.com/thetre97/gridsome-starter-shopify), which includes customer login and account pages as well as a persisted shopping cart. [View Demo](https://gridsome-starter-shopify-account.vercel.app)

> Give it a go, create an account - take this as written confirmation of the fact that I will _not_ harvest any personal data. Or, of course, you can just use a dummy email and password 🤷🏻‍♂️.

This starter uses a source plugin ([`gridsome-source-shopify`](https://gridsome.org/plugins/gridsome-source-shopify)) to pull data from Shopify's Storefront API, and load it into Gridsome's data store - which you can then use to create pages (note that this only runs at build time). Pages created in this starter include product pages, category pages, and CMS pages such as `/about-us`.

It also uses the [Vue Apollo](https://apollo.vuejs.org) plugin client-side, to send queries/mutations (i.e. `createCheckout`, `customerCreate`) to the [Storefront API](https://help.shopify.com/en/api/storefront-api) when running in the browser. This API allows accessing customer account data, as shown in this starter.

## Shopify Setup

You will need to create a private app in Shopify, and **only** give it access to the Storefront API - make sure to select **all** permissions, as this starter requires permissions to create and login customers.

Make sure to note the Storefront API key, and your store name.

## Installation

Install the Gridsome CLI.

```bash
npm install -g @gridsome/cli # or
yarn global add @gridsome/cli
```

## Create Project

You can either directly download this repository, or use Gridsome's CLI to download and install dependencies for you.

```bash
# Clone repository
git clone https://github.com/thetre97/gridsome-starter-shopify-account.git
npm install # or
yarn install

# Download with CLI
gridsome create my-gridsome-site thetre97/gridsome-starter-shopify-account
```

## Developing

You will need to add your Storefront API shop name (`https://<shop-name>.myshopify.com`) & token to an env file before running this starter.
I also recommend you add some collections in Shopify to best show off this starter.

```
# Note env's are prefixed with GRIDSOME_ to make them available to apollo client side
GRIDSOME_SHOPIFY_STOREFRONT=<shop name>
GRIDSOME_SHOPIFY_STOREFRONT_TOKEN=<storefront token>
```

Or you can manually edit the [Shopify Source Plugin's](https://gridsome.org/plugins/gridsome-source-shopify) configurations in `gridsome.config.js`.

Enter the site folder, and run `gridsome develop` to start a local development server.

Happy coding!
