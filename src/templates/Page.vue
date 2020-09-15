<template>
  <Layout>
    <div class="container">
      <SfHeading :title="page.title" />
      <hr>
      <br>
      <div
        class="content"
        v-html="page.body" />
    </div>
  </Layout>
</template>

<script>
// Components
import { SfHeading } from '@storefront-ui/vue'

export default {
  name: 'Page',
  metaInfo () {
    return {
      title: this.page.title
    }
  },
  components: { SfHeading },
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
