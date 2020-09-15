<template>
  <Layout>
    <div class="container product">
      <div class="product-gallery">
        <SfGallery
          :images="productImages"
          :image-width="500"
          :image-height="500"
          :current="currentImage" />
      </div>
      <div class="product-information">
        <SfHeading
          :level="3"
          :title="product.title"
          class="sf-heading--left" />
        <br>
        <SfPrice
          v-if="currentVariant"
          :regular="currentVariant.price.amount" />
        <br>
        <div
          class="content"
          v-html="product.descriptionHtml" />
        <br>
        <SfComponentSelect
          v-for="option in productOptions"
          :key="option.id"
          v-model="selectedOptions[option.name]"
          :size="productOptions.length"
          :label="option.name">
          <SfComponentSelectOption
            v-for="(value, key) in option.values"
            :key="key"
            :value="value">
            <SfProductOption
              :color="value"
              :label="value" />
          </SfComponentSelectOption>
        </SfComponentSelect>
        <br>
        <SfAddToCart
          v-model="quantity"
          :disabled="!currentVariant"
          @click="addToCart" />
      </div>
    </div>
  </Layout>
</template>

<script>
// Components
import { SfGallery, SfHeading, SfPrice, SfAddToCart, SfComponentSelect, SfProductOption } from '@storefront-ui/vue'

export default {
  metaInfo () {
    return {
      title: this.$page.shopifyProduct.title
    }
  },
  components: { SfGallery, SfHeading, SfPrice, SfAddToCart, SfComponentSelect, SfProductOption },
  data: () => ({
    currentImage: 1,
    quantity: 1,
    selectedOptions: {}
  }),
  computed: {
    product () { return this.$page.shopifyProduct },
    productImages () {
      return this.product.images.map(image => ({
        ...image,
        mobile: { url: image.mobile },
        desktop: { url: image.desktop }
      }))
    },
    productOptions () { return this.product.options.filter(({ name }) => name !== 'Title') },
    currentVariant () {
      const matchedVariant = this.product.variants.find(variant =>
        variant.selectedOptions.every(({ name, value }) => value === this.selectedOptions[ name ])
      )
      return matchedVariant
    }
  },
  watch: {
    $route (to, from) {
      const [firstVariant] = this.product.variants
      this.selectedOptions = firstVariant.selectedOptions.reduce((options, { name, value }) => ({ [ name ]: value, ...options }), {})
    }
  },
  mounted () {
    const [firstVariant] = this.product.variants
    this.selectedOptions = firstVariant.selectedOptions.reduce((options, { name, value }) => ({ [ name ]: value, ...options }), {})
  },
  methods: {
    addToCart () {
      const variant = this.currentVariant
      const payload = {
        path: this.product.path,
        qty: this.quantity,
        productTitle: this.product.title,
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
.product {
  display: flex;

  &-gallery {
    width: 50%;
    padding: var(--spacer-lg);
  }
  &-information {
    width: 50%;
    padding: var(--spacer-xl) var(--spacer-lg);
  }
}
</style>

<page-query>
query Product ($id: ID!) {
  shopifyProduct (id: $id) {
    id
    path
    descriptionHtml
    title
    tags
    images(limit: 5) {
      id
      alt: altText
      desktop: transformedSrc(maxWidth: 500, maxHeight: 500, crop: CENTER)
      mobile: transformedSrc(maxWidth: 250, maxHeight: 250, crop: CENTER)
    }
    options {
      id
      name
      values
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
</page-query>
