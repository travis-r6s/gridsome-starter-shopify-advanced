<template>
  <Layout>
    <div
      v-if="collection"
      class="hero is-large">
      <div class="container">
        <div class="columns">
          <div class="column is-two-fifths header">
            <div class="header-content">
              <h1 class="title is-size-1 is-family-secondary">
                Our Core Collection
              </h1>
              <div
                class="content"
                v-html="collection.descriptionHtml" />
              <g-link
                :to="collection.path"
                class="button">
                Shop Now
              </g-link>
            </div>
          </div>
          <div class="column is-three-fifths">
            <figure class="image">
              <v-lazy-image
                :src="collection.image.src"
                :src-placeholder="collection.image.placeholder"
                :alt="collection.image.altText || collection.title" />
            </figure>
          </div>
        </div>
      </div>
    </div>
    <br>
    <br>
    <div class="container has-text-centered">
      <hr>
      <h3 class="title is-size-4 is-family-secondary">
        Featured Products
      </h3>
      <hr>
      <br>
      <div class="columns is-multiline">
        <div
          v-for="({ node: product }) in featuredProducts"
          :key="product.id"
          class="column is-4">
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <v-lazy-image
                  :src="product.images[0].src"
                  :src-placeholder="product.images[0].placeholder"
                  :alt="product.images[0].altText || product.title" />
              </figure>
            </div>
            <div class="card-content has-text-left">
              <div class="media">
                <div class="media-content">
                  <p class="title is-4 is-family-secondary">
                    {{ product.title }}
                  </p>
                  <p class="subtitle is-6">
                    {{ product.priceRange.minVariantPrice.amount }}
                  </p>
                </div>
              </div>

              <div
                class="content"
                v-html="product.descriptionHtml" />
              <div class="field is-grouped is-grouped-right">
                <div class="control">
                  <g-link
                    :to="product.path"
                    class="button is-primary is-outlined">
                    View Product
                  </g-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: 'Come, shop!'
  },
  computed: {
    collection () { return this.$page.allShopifyCollection.edges.length && this.$page.allShopifyCollection.edges[ 0 ].node },
    featuredProducts () { return this.$page.allShopifyProduct.edges }
  }
}
</script>

<page-query>
query ShopifyProducts {
  allShopifyCollection (limit: 1) {
    edges {
      node {
        id
        path
        title
        descriptionHtml
        image {
          altText
          src: transformedSrc(maxWidth: 800, maxHeight: 800, crop: CENTER)
          placeholder: transformedSrc(maxWidth: 200, maxHeight: 200, crop: CENTER)
        }
      }
    }
  }
  allShopifyProduct (limit: 6) {
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
          src: transformedSrc (maxWidth: 400, maxHeight: 300, crop: CENTER)
          placeholder: transformedSrc(maxWidth: 100, maxHeight: 75, crop: CENTER)
        }
      }
    }
  }
}
</page-query>

<style lang="scss" scoped>
.header {
  align-items: center;
  display: flex;
  .header-content {
    text-align: center;
  }
}
</style>
