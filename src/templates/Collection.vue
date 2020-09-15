<template>
  <Layout>
    <SfSection
      class="container"
      :title-heading="collection.title">
      <div class="nav">
        <SfComponentSelect
          v-model="currentSortOption"
          :size="sortOptions.length"
          label="Sort by:"
          placeholder="Choose a sort option...">
          <SfComponentSelectOption
            v-for="(option, i) in sortOptions"
            :key="i"
            :value="option">
            {{ option.name }}
          </SfComponentSelectOption>
        </SfComponentSelect>
        <SfHeading
          :title="`Products found ${products.length}`"
          :level="4" />
      </div>
      <SfDivider />
      <div class="products-grid">
        <SfProductCard
          v-for="product in products"
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
          @click:is-added-to-cart="addToCart(product)" />
      </div>
    </SfSection>
  </Layout>
</template>

<script>
// Components
import { SfSection, SfDivider, SfProductCard, SfHeading, SfComponentSelect } from '@storefront-ui/vue'

// Sorting Functions
const sortHighLow = products => products.sort((a, b) => b.priceRange.minVariantPrice.price - a.priceRange.minVariantPrice.price)
const sortLowHigh = products => products.sort((a, b) => a.priceRange.minVariantPrice.price - b.priceRange.minVariantPrice.price)

export default {
  name: 'Collection',
  metaInfo () {
    return {
      title: this.collection.title
    }
  },
  components: { SfSection, SfDivider, SfProductCard, SfHeading, SfComponentSelect },
  data: () => ({
    currentSortOption: {
      name: 'Latest Products',
      sort: products => products
    },
    sortOptions: [
      {
        name: 'Latest Products',
        sort: products => products
      },
      {
        name: 'Price: High to low',
        sort: sortHighLow
      },
      {
        name: 'Price: Low to high',
        sort: sortLowHigh
      }
    ]
  }),
  computed: {
    collection () { return this.$page.shopifyCollection },
    products () {
      const products = this.collection.products.map(product => {
        const [variant] = product.variants
        return {
          ...product,
          variant,
          isAddedToCart: this.$store.getters.isAddedToCart(variant.id),
          price: product.priceRange.minVariantPrice.amount,
          image: {
            mobile: { url: product.images[ 0 ].mobile },
            desktop: { url: product.images[ 0 ].desktop }
          }
        }
      })
      const sortOption = this.currentSortOption
      return sortOption.sort(products)
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
.nav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  &-filters {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.products-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>

<page-query>
query Collection ($id: ID!) {
  shopifyCollection (id: $id) {
    id
    title
    descriptionHtml
    products {
      id
      title
      path
      descriptionHtml
      priceRange {
        minVariantPrice {
          price: amount
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
</page-query>
