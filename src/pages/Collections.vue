<template>
  <Layout>
    <div class="container">
      <SfHeading title="Collections" />
      <br>
      <SfBannerGrid
        v-for="(chunk, i) in collections"
        :key="i"
        :banner-grid="i + 1">
        <template
          v-for="collection in chunk"
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
    </div>
  </Layout>
</template>

<script>
// Components
import { SfHeading, SfBannerGrid, SfBanner, SfButton } from '@storefront-ui/vue'

export default {
  name: 'Collections',
  components: { SfHeading, SfBannerGrid, SfBanner, SfButton },
  computed: {
    collections () {
      const collections = this.$page.allShopifyCollection.edges.map(({ node: collection }, i) => {
        const slot = i === 0 ? 'A' : i === 1 ? 'B' : i === 2 ? 'C' : 'D'
        return {
          slot: `banner-${slot}`,
          description: collection.description,
          title: collection.title,
          buttonText: 'Shop now',
          image: collection.image.large
        }
      })
      return Array.from({ length: Math.ceil(collections.length / 4) }, (v, i) =>
        collections.slice(i * 4, i * 4 + 4)
      )
    }
  }
}
</script>

<page-query>
query ShopifyProducts {
  allShopifyCollection (limit: 100) {
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
}
</page-query>

<style lang="scss" scoped>
.card {
  box-shadow: unset !important;
}
</style>
