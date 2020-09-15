<template>
  <Layout>
    <div class="container">
      <SfHero>
        <SfHeroItem
          v-for="product in heroProducts"
          :key="product.id"
          :title="product.title"
          :subtitle="product.collections[0] && product.collections[0].title"
          :image="product.images[0]">
          <template #call-to-action>
            <SfButton
              :link="product.path"
              class="bg-black">
              View Product
            </SfButton>
          </template>
        </SfHeroItem>
      </SfHero>
      <br>
      <SfBannerGrid :banner-grid="2">
        <template
          v-for="collection in collections"
          v-slot:[collection.slot]>
          <SfBanner
            :key="collection.slot"
            :title="collection.title"
            :subtitle="collection.subtitle"
            :description="collection.description"
            :image="collection.image"
            :class="collection.class">
            <template #call-to-action>
              <SfButton
                :link="collection.path"
                class="bg-black">
                Shop Now
              </SfButton>
            </template>
          </SfBanner>
        </template>
      </SfBannerGrid>
      <br>
      <SfCallToAction
        title="Subscribe to Newsletters"
        description="Be aware of upcoming sales and events. Receive gifts and special offers!"
        button-text="Subscribe"
        background="black" />
      <br>
      <SfSection
        title-heading="New in this month"
        :level-heading="3">
        <div class="products-grid">
          <SfProductCard
            v-for="product in featuredProducts"
            :key="product.id"
            :image="product.image"
            :image-width="200"
            :image-height="300"
            :title="product.title"
            :link="product.path"
            link-tag="g-link"
            :regular-price="product.price"
            show-add-to-cart-button
            :is-added-to-cart="product.isAddedToCart"
            @click:is-added-to-cart="addItemToCart(product)" />
        </div>
      </SfSection>
    </div>
  </Layout>
</template>

<script>
// Components
import { SfBannerGrid, SfBanner, SfHero, SfButton, SfCallToAction, SfSection, SfProductCard } from '@storefront-ui/vue'

export default {
  metaInfo: {
    title: 'Come, shop!'
  },
  components: { SfBannerGrid, SfBanner, SfHero, SfButton, SfCallToAction, SfSection, SfProductCard },
  computed: {
    collections () {
      const collections = this.$page.allShopifyCollection.edges.map(({ node }) => node)
      return collections.map((collection, i) => {
        const slot = i === 0 ? 'A' : i === 1 ? 'B' : i === 2 ? 'C' : 'D'
        return {
          slot: `banner-${slot}`,
          description: collection.description,
          title: collection.title,
          buttonText: 'Shop now',
          path: collection.path,
          image: collection.image.large
        }
      })
    },
    heroProducts () { return this.$page.heroProducts.edges.map(({ node }) => node) },
    featuredProducts () {
      return this.$page.featuredProducts.edges.map(({ node }) => {
        const [variant] = node.variants
        return {
          ...node,
          variant,
          isAddedToCart: this.$store.getters.isAddedToCart(variant.id),
          price: node.priceRange.minVariantPrice.amount,
          image: {
            mobile: { url: node.images[ 0 ].mobile },
            desktop: { url: node.images[ 0 ].desktop }
          }
        }
      })
    }
  },
  methods: {
    addToCart ({ variant, ...product }) {
      const payload = {
        path: product.path,
        qty: 1,
        productTitle: product.title,
        variantTitle: variant.title,
        variantId: variant.id,
        price: variant.price.amount,
        image: variant.image,
        options: variant.selectedOptions
      }
      this.$store.dispatch('addToCart', payload)
      this.$notify({
        title: `Added ${payload.productTitle} to Cart`,
        type: 'primary'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.products-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>

<page-query>
query ShopifyProducts {
  allShopifyCollection (limit: 5) {
    edges {
      node {
        id
        path
        title
        description
        image {
          large: transformedSrc(maxWidth: 500, maxHeight: 700, crop: CENTER)
          small: transformedSrc(maxWidth: 300, maxHeight: 300, crop: CENTER)
        }
      }
    }
  }
  heroProducts: allShopifyProduct (limit: 2) {
    edges {
      node {
        id
        title
        path
        description
        collections {
          title
        }
        images (limit: 1) {
          desktop: transformedSrc (maxWidth: 1400, maxHeight: 600, crop: CENTER)
          mobile: transformedSrc (maxWidth: 500, maxHeight: 400)
        }
      }
    }
  }
  featuredProducts: allShopifyProduct (limit: 8) {
    edges {
      node {
        id
        title
        path
        descriptionHtml
        priceRange {
          minVariantPrice {
            amount(format: true)
          }
        }
        images (limit: 1) {
          id
          altText
          desktop: transformedSrc (maxWidth: 200, maxHeight: 300, crop: CENTER)
          mobile: transformedSrc(maxWidth: 100, maxHeight: 150, crop: CENTER)
        }
        variants {
          id
          title
          price {
            amount(format: true)
          }
          selectedOptions {
            name
            value
          }
          image {
            id
            altText
            thumbnail: transformedSrc(maxWidth: 150, maxHeight: 150, crop: CENTER)
          }
        }
      }
    }
  }
}
</page-query>
