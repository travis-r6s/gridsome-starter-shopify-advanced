<template>
  <Layout>
    <SfSection
      :title-heading="page.title"
      class="container">
      <div
        class="content"
        v-html="page.body" />
    </SfSection>
  </Layout>
</template>

<script>
// Components
import { SfSection } from '@storefront-ui/vue'

export default {
  name: 'Page',
  metaInfo () {
    return {
      title: this.page.title
    }
  },
  components: { SfSection },
  computed: {
    page () { return this.$page.shopifyPage }
  }
}
</script>

<page-query>
query Page ($id: ID!) {
  shopifyPage (id: $id) {
    id
    title
    body
  }
}
</page-query>
